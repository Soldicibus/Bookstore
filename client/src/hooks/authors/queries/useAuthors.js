import { useQuery } from "@tanstack/react-query";
import * as authorAPI from "../../../api/authorAPI.js";

export function useAuthors() {
  return useQuery({ queryKey: ["authors"], queryFn: authorAPI.getAllAuthors });
}
