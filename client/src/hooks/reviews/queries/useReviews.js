import { useQuery } from "@tanstack/react-query";
import * as reviewAPI from "../../../api/reviewAPI.js";

export function useReviews() {
  return useQuery({ queryKey: ["reviews"], queryFn: reviewAPI.getAllReviews });
}
