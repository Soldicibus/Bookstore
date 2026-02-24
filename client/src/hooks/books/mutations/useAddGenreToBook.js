import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useAddGenreToBook() {
  const qc = useQueryClient();
  return useMutation(({ bookId, genreId }) => bookAPI.addGenreToBook(bookId, genreId), {
    onMutate: async ({ bookId, genreId }) => {
      await qc.cancelQueries(["book", bookId]);
      const previous = qc.getQueryData(["book", bookId]);
      qc.setQueryData(["book", bookId], (old) => {
        if (!old) return old;
        const genres = old.genres ? [...old.genres, { id: genreId }] : [{ id: genreId }];
        return { ...old, genres };
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
