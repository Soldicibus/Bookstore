import { useQuery } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useBooks() {
  return useQuery({ queryKey: ["books"], queryFn: bookAPI.getAllBooks });
}
