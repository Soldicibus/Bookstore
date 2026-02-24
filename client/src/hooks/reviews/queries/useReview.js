import { useQuery } from "@tanstack/react-query";
import * as reviewAPI from "../../../api/reviewAPI.js";

export function useReview(id) {
  return useQuery({ queryKey: ["review", id], queryFn: () => reviewAPI.getReviewById(id), enabled: !!id });
}
