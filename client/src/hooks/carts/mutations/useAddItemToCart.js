import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as cartAPI from "../../../api/cartAPI.js";

export function useAddItemToCart() {
  const qc = useQueryClient();
  return useMutation(({ cartId, bookId, quantity }) => cartAPI.addItemToCart(cartId, bookId, quantity), {
    onMutate: async ({ cartId, bookId, quantity }) => {
      await qc.cancelQueries(["carts"]);
      await qc.cancelQueries(["cart", cartId]);
      const previousCarts = qc.getQueryData(["carts"]);
      const previousCart = qc.getQueryData(["cart", cartId]);

      // optimistic update for single cart
      qc.setQueryData(["cart", cartId], (old = { items: [] }) => {
        const items = old.items ? [...old.items] : [];
        const existing = items.find((i) => i.bookId === bookId || i.book?.id === bookId);
        if (existing) {
          existing.quantity = (existing.quantity || 0) + quantity;
        } else {
          items.push({ bookId, quantity });
        }
        return { ...old, items };
      });

      // also update list of carts if present
      qc.setQueryData(["carts"], (old = []) =>
        old.map((c) => (c.id === cartId ? { ...c, items: (c.items || []).concat([{ bookId, quantity }]) } : c))
      );

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
