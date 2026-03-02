import { useQuery } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useBooksByThematic(thematicId) {
  return useQuery({
    queryKey: ["books", "thematic", thematicId],
    queryFn: () => bookAPI.getBooksByThematic(thematicId),
    enabled: !!thematicId,
  });
}
