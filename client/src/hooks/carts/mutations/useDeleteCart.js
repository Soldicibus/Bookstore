import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as cartAPI from "../../../api/cartAPI.js";

export function useDeleteCart() {
  const qc = useQueryClient();
  return useMutation((id) => cartAPI.deleteCart(id), {
    onMutate: async (id) => {
      await qc.cancelQueries(["carts"]);
      const previous = qc.getQueryData(["carts"]);
      qc.setQueryData(["carts"], (old = []) => old.filter((c) => c.id !== id));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["carts"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["carts"]),
  });
}
