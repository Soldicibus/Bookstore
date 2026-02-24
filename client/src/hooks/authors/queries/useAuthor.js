import { useQuery } from "@tanstack/react-query";
import * as authorAPI from "../../../api/authorAPI.js";

export function useAuthor(id) {
  return useQuery({ queryKey: ["author", id], queryFn: () => authorAPI.getAuthorById(id), enabled: !!id });
}
