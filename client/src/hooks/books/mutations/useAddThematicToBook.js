import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useAddThematicToBook() {
  const qc = useQueryClient();
  return useMutation(({ bookId, thematicId }) => bookAPI.addThematicToBook(bookId, thematicId), {
    onMutate: async ({ bookId, thematicId }) => {
      await qc.cancelQueries(["book", bookId]);
      const previous = qc.getQueryData(["book", bookId]);
      qc.setQueryData(["book", bookId], (old) => {
        if (!old) return old;
        const thematics = old.thematics ? [...old.thematics, { id: thematicId }] : [{ id: thematicId }];
        return { ...old, thematics };
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
