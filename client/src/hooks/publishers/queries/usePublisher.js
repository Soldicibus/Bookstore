import { useQuery } from "@tanstack/react-query";
import * as publisherAPI from "../../../api/publisherAPI.js";

export function usePublisher(id) {
  return useQuery({ queryKey: ["publisher", id], queryFn: () => publisherAPI.getPublisherById(id), enabled: !!id });
}
