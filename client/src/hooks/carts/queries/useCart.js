import { useQuery } from "@tanstack/react-query";
import * as cartAPI from "../../../api/cartAPI.js";

export function useCart(id) {
  return useQuery({ queryKey: ["cart", id], queryFn: () => cartAPI.getCartById(id), enabled: !!id });
}
