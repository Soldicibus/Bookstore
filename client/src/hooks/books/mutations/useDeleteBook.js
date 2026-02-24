import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useDeleteBook() {
  const qc = useQueryClient();
  return useMutation((id) => bookAPI.deleteBook(id), {
    onMutate: async (id) => {
      await qc.cancelQueries(["books"]);
      const previous = qc.getQueryData(["books"]);
      qc.setQueryData(["books"], (old = []) => old.filter((b) => b.id !== id));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["books"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["books"]),
  });
}
