import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as authorAPI from "../../../api/authorAPI.js";

export function useCreateAuthor() {
  const qc = useQueryClient();
  return useMutation(authorAPI.createAuthor, {
    onMutate: async (newAuthor) => {
      await qc.cancelQueries(["authors"]);
      const previous = qc.getQueryData(["authors"]);
      qc.setQueryData(["authors"], (old = []) => [...old, newAuthor]);
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
