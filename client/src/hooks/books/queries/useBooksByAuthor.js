import { useQuery } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useBooksByAuthor(authorId) {
  return useQuery({
    queryKey: ["books", "author", authorId],
    queryFn: () => bookAPI.getBooksByAuthor(authorId),
    enabled: !!authorId,
  });
}
