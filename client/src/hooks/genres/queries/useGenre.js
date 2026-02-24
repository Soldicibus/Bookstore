import { useQuery } from "@tanstack/react-query";
import * as genreAPI from "../../../api/genreAPI.js";

export function useGenre(id) {
  return useQuery({ queryKey: ["genre", id], queryFn: () => genreAPI.getGenreById(id), enabled: !!id });
}
