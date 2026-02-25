import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as orderAPI from "../../../api/orderAPI.js";

export function useUpdateOrder() {
  const qc = useQueryClient();
  return useMutation(({ id, payload }) => orderAPI.updateOrder(id, payload), {
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries(["orders"]);
      const previous = qc.getQueryData(["orders"]);
      qc.setQueryData(["orders"], (old = []) => old.map((o) => (o.id === id ? { ...o, ...payload } : o)));
      qc.setQueryData(["order", id], (old) => ({ ...old, ...payload }));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["orders"], context.previous);
    },
    onSettled: (data, error, variables) => {
      qc.invalidateQueries(["orders"]);
      qc.invalidateQueries(["order", variables.id]);
    },
  });
}
