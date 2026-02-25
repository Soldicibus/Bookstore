import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as orderAPI from "../../../api/orderAPI.js";

export function useAddBookToOrder() {
  const qc = useQueryClient();
  return useMutation(({ orderId, bookId, quantity }) => orderAPI.addBookToOrder(orderId, bookId, quantity), {
    onMutate: async ({ orderId, bookId, quantity }) => {
      await qc.cancelQueries(["orders"]);
      await qc.cancelQueries(["order", orderId]);
      const previousOrders = qc.getQueryData(["orders"]);
      const previousOrder = qc.getQueryData(["order", orderId]);

      qc.setQueryData(["order", orderId], (old = { items: [] }) => {
        const items = old.items ? [...old.items] : [];
        const existing = items.find((i) => i.bookId === bookId || i.book?.id === bookId);
        if (existing) {
          existing.quantity = (existing.quantity || 0) + quantity;
        } else {
          items.push({ bookId, quantity });
        }
        return { ...old, items };
      });

      qc.setQueryData(["orders"], (old = []) => old.map((o) => (o.id === orderId ? { ...o, items: (o.items || []).concat([{ bookId, quantity }]) } : o)));

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
