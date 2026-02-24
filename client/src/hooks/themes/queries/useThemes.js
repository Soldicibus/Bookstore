import { useQuery } from "@tanstack/react-query";
import * as themeAPI from "../../../api/themeAPI.js";

export function useThemes() {
  return useQuery({ queryKey: ["themes"], queryFn: themeAPI.getThemes });
}
