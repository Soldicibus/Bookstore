import { useQuery } from "@tanstack/react-query";
import * as orderAPI from "../../../api/orderAPI.js";

export function useOrder(id) {
  return useQuery({ queryKey: ["order", id], queryFn: () => orderAPI.getOrderById(id), enabled: !!id });
}
