import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as orderAPI from "../../../api/orderAPI.js";

export function useCreateOrder() {
  const qc = useQueryClient();
  return useMutation((payload) => orderAPI.createOrder(payload), {
    onMutate: async (newOrder) => {
      await qc.cancelQueries(["orders"]);
      const previous = qc.getQueryData(["orders"]);
      qc.setQueryData(["orders"], (old = []) => [...old, newOrder]);
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["orders"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["orders"]),
  });
}
