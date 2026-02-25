import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as cartAPI from "../../../api/cartAPI.js";

export function useCreateCart() {
  const qc = useQueryClient();
  return useMutation((userId) => cartAPI.createCart(userId), {
    onMutate: async (newCart) => {
      await qc.cancelQueries(["carts"]);
      const previous = qc.getQueryData(["carts"]);
      qc.setQueryData(["carts"], (old = []) => [...old, newCart]);
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["carts"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["carts"]),
  });
}
