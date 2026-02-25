import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as publisherAPI from "../../../api/publisherAPI.js";

export function useUpdatePublisher() {
  const qc = useQueryClient();
  return useMutation(({ id, payload }) => publisherAPI.updatePublisher(id, payload), {
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries(["publishers"]);
      const previous = qc.getQueryData(["publishers"]);
      qc.setQueryData(["publishers"], (old = []) => old.map((p) => (p.id === id ? { ...p, ...payload } : p)));
      qc.setQueryData(["publisher", id], (old) => ({ ...old, ...payload }));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["publishers"], context.previous);
    },
    onSettled: (data, error, variables) => {
      qc.invalidateQueries(["publishers"]);
      qc.invalidateQueries(["publisher", variables.id]);
    },
  });
}
