import { useQuery } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useAuthorsByBook(bookId) {
  return useQuery({
    queryKey: ["book", bookId, "authors"],
    queryFn: () => bookAPI.getAuthorsByBook(bookId),
    enabled: !!bookId,
  });
}
