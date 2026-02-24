import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authorAPI from "../../../api/authorAPI.js";

export function useDeleteAuthor() {
  const qc = useQueryClient();
  return useMutation((id) => authorAPI.deleteAuthor(id), {
    onMutate: async (id) => {
      await qc.cancelQueries(["authors"]);
      const previous = qc.getQueryData(["authors"]);
      qc.setQueryData(["authors"], (old = []) => old.filter((a) => a.id !== id));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["authors"], context.previous);
    },
    onSettled: () => {
      qc.invalidateQueries(["authors"]);
    },
  });
}
