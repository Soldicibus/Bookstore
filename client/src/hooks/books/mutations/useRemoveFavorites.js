import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI";

/**
 * Hook to remove a book from user's favorites
 * @returns {Object} { mutate, isPending, error, data }
 */
export function useRemoveFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, userId }) => bookAPI.removeFromFavorites(bookId, userId),
    onMutate: ({ bookId, userId }) => {
      console.log(`[bookAPI] Attempting to remove book ${bookId} from favorites for user ${userId}`);
    },
    onSuccess: (data, { bookId }) => {
      // Invalidate favorites query to refetch
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      // Invalidate the specific book query
      queryClient.invalidateQueries({ queryKey: ["book", bookId] });
    },
    onError: (error) => {
      console.error("Error removing from favorites:", error);
    },
  });
}
