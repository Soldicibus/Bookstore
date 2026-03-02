import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as bookAPI from "../../../api/bookAPI";

/**
 * Hook to add a book to user's favorites
 * @returns {Object} { mutate, isPending, error, data }
 */
export function useAddFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, userId }) => bookAPI.addToFavorites(bookId, userId),
    onMutate: ({ bookId, userId }) => {
      console.log(`[bookAPI] Attempting to add book ${bookId} to favorites for user ${userId}`);
    },
    onSuccess: (data, { bookId }) => {
      // Invalidate favorites query to refetch
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      // Invalidate the specific book query
      queryClient.invalidateQueries({ queryKey: ["book", bookId] });
    },
    onError: (error) => {
      console.error("Error adding to favorites:", error);
    },
  });
}
