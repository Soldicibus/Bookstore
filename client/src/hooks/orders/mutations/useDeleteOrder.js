import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as orderAPI from "../../../api/orderAPI.js";

export function useDeleteOrder() {
  const qc = useQueryClient();
  return useMutation((id) => orderAPI.deleteOrder(id), {
    onMutate: async (id) => {
      await qc.cancelQueries(["orders"]);
      const previous = qc.getQueryData(["orders"]);
      qc.setQueryData(["orders"], (old = []) => old.filter((o) => o.id !== id));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["orders"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["orders"]),
  });
}
