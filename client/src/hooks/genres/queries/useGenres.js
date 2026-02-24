import { useQuery } from "@tanstack/react-query";
import * as genreAPI from "../../../api/genreAPI.js";

export function useGenres() {
  return useQuery({ queryKey: ["genres"], queryFn: genreAPI.getAllGenres });
}
