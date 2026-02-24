import { useQuery } from "@tanstack/react-query";
import * as cartAPI from "../../../api/cartAPI.js";

export function useCarts() {
  return useQuery({ queryKey: ["carts"], queryFn: cartAPI.getAllCarts });
}
