import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useRemoveAuthorFromBook() {
  const qc = useQueryClient();
  return useMutation(({ bookId, authorId }) => bookAPI.removeAuthorFromBook(bookId, authorId), {
    onMutate: async ({ bookId, authorId }) => {
      await qc.cancelQueries(["book", bookId]);
      const previous = qc.getQueryData(["book", bookId]);
      qc.setQueryData(["book", bookId], (old) => {
        if (!old) return old;
        const authors = old.authors ? old.authors.filter((a) => a.id !== authorId) : [];
        return { ...old, authors };
      });
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["book", variables.bookId], context.previous);
    },
    onSettled: (_data, _err, variables) => {
      qc.invalidateQueries(["book", variables.bookId]);
      qc.invalidateQueries(["books"]);
    },
  });
}
