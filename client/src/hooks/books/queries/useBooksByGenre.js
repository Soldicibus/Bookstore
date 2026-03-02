import { useQuery } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useBooksByGenre(genreId) {
  return useQuery({
    queryKey: ["books", "genre", genreId],
    queryFn: () => bookAPI.getBooksByGenre(genreId),
    enabled: !!genreId,
  });
}
