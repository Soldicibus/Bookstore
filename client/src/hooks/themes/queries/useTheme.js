import { useQuery } from "@tanstack/react-query";
import * as themeAPI from "../../../api/themeAPI.js";

export function useTheme(id) {
  return useQuery({ queryKey: ["theme", id], queryFn: () => themeAPI.getThemeById(id), enabled: !!id });
}
