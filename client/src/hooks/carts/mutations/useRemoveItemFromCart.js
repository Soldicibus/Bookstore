import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as cartAPI from "../../../api/cartAPI.js";

export function useRemoveItemFromCart() {
  const qc = useQueryClient();
  return useMutation(({ cartId, bookId }) => cartAPI.removeItemFromCart(cartId, bookId), {
    onMutate: async ({ cartId, bookId }) => {
      await qc.cancelQueries(["carts"]);
      await qc.cancelQueries(["cart", cartId]);
      const previousCarts = qc.getQueryData(["carts"]);
      const previousCart = qc.getQueryData(["cart", cartId]);

      qc.setQueryData(["cart", cartId], (old = { items: [] }) => {
        const items = (old.items || []).filter((i) => (i.bookId || i.book?.id) !== bookId);
        return { ...old, items };
      });

      qc.setQueryData(["carts"], (old = []) => old.map((c) => (c.id === cartId ? { ...c, items: (c.items || []).filter((i) => (i.bookId || i.book?.id) !== bookId) } : c)));

      return { previousCarts, previousCart };
    },
    onError: (err, variables, context) => {
      if (context?.previousCart) qc.setQueryData(["cart", variables.cartId], context.previousCart);
      if (context?.previousCarts) qc.setQueryData(["carts"], context.previousCarts);
    },
    onSettled: (data, error, vars) => {
      qc.invalidateQueries(["carts"]);
      qc.invalidateQueries(["cart", vars.cartId]);
    },
  });
}
