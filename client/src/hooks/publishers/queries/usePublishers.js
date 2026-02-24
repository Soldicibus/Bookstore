import { useQuery } from "@tanstack/react-query";
import * as publisherAPI from "../../../api/publisherAPI.js";

export function usePublishers() {
  return useQuery({ queryKey: ["publishers"], queryFn: publisherAPI.getAllPublishers });
}
