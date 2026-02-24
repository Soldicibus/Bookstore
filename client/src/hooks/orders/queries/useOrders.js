import { useQuery } from "@tanstack/react-query";
import * as orderAPI from "../../../api/orderAPI.js";

export function useOrders() {
  return useQuery({ queryKey: ["orders"], queryFn: orderAPI.getAllOrders });
}
