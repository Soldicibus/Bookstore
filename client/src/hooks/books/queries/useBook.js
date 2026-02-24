import { useQuery } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useBook(id) {
  return useQuery({ queryKey: ["book", id], queryFn: () => bookAPI.getBookById(id), enabled: !!id });
}
