import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as publisherAPI from "../../../api/publisherAPI.js";

export function useCreatePublisher() {
  const qc = useQueryClient();
  return useMutation((payload) => publisherAPI.createPublisher(payload), {
    onMutate: async (newPub) => {
      await qc.cancelQueries(["publishers"]);
      const previous = qc.getQueryData(["publishers"]);
      qc.setQueryData(["publishers"], (old = []) => [...old, newPub]);
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) qc.setQueryData(["publishers"], context.previous);
    },
    onSettled: () => qc.invalidateQueries(["publishers"]),
  });
}
