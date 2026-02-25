import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as orderAPI from "../../../api/orderAPI.js";

export function useRemoveBookFromOrder() {
  const qc = useQueryClient();
  return useMutation(({ orderId, bookId }) => orderAPI.removeBookFromOrder(orderId, bookId), {
    onMutate: async ({ orderId, bookId }) => {
      await qc.cancelQueries(["orders"]);
      await qc.cancelQueries(["order", orderId]);
      const previousOrders = qc.getQueryData(["orders"]);
      const previousOrder = qc.getQueryData(["order", orderId]);

      qc.setQueryData(["order", orderId], (old = { items: [] }) => {
        const items = (old.items || []).filter((i) => (i.bookId || i.book?.id) !== bookId);
        return { ...old, items };
      });

      qc.setQueryData(["orders"], (old = []) => old.map((o) => (o.id === orderId ? { ...o, items: (o.items || []).filter((i) => (i.bookId || i.book?.id) !== bookId) } : o)));

      return { previousOrders, previousOrder };
    },
    onError: (err, variables, context) => {
      if (context?.previousOrder) qc.setQueryData(["order", variables.orderId], context.previousOrder);
      if (context?.previousOrders) qc.setQueryData(["orders"], context.previousOrders);
    },
    onSettled: (data, error, vars) => {
      qc.invalidateQueries(["orders"]);
      qc.invalidateQueries(["order", vars.orderId]);
    },
  });
}
