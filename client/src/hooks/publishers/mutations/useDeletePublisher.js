import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as publisherAPI from "../../../api/publisherAPI.js";

export function useDeletePublisher() {
  const qc = useQueryClient();
  return useMutation((id) => publisherAPI.deletePublisher(id), {
    onMutate: async (id) => {
      await qc.cancelQueries(["publishers"]);
      const previous = qc.getQueryData(["publishers"]);
      qc.setQueryData(["publishers"], (old = []) => old.filter((p) => p.id !== id));
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["publishers"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["publishers"]),
  });
}
