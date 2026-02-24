import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useCreateBook() {
  const qc = useQueryClient();
  return useMutation((payload) => bookAPI.createBook(payload), {
    onMutate: async (newBook) => {
      await qc.cancelQueries(["books"]);
      const previous = qc.getQueryData(["books"]);
      qc.setQueryData(["books"], (old = []) => [...old, newBook]);
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["books"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["books"]),
  });
}
