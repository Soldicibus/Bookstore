import { useQuery } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI.js";

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      // Demo: fetch from localStorage
      const favorites = localStorage.getItem("favorites");
      return favorites ? JSON.parse(favorites) : [];
    },
    staleTime: 0, // Always fresh from storage
  });
}

export function useIsFavorite(bookId) {
  const { data: favorites = [] } = useFavorites();
  return favorites.some(fav => fav.id === bookId || fav.book_id === bookId);
}

export function useFavoriteBooks(userId) {
    return useQuery({
        queryKey: ["favorites", userId],
        queryFn: () => bookAPI.getFavoriteBooks(userId),
        enabled: !!userId
    });
};

export function useIsFavorites(bookId, userId) {
    const { data: favorites = [] } = useFavoriteBooks(userId);
    if (!favorites || favorites.length === 0 || favorites.books === null) {
        return false;
    }
    const isFav = Object.values(favorites).some(fav => fav.id === bookId || fav.book_id === bookId);
    return isFav;
};