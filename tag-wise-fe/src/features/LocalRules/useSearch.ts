import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { apiSearchLibrary } from "../../utils/axios";
import { SearchResult } from "./LibraryResult";

export function useSearch() {
  const {
    mutate: searchLibrary,
    isPending: isSearching,
    data: searchLibraryResult,
  } = useMutation<
    SearchResult,
    Error,
    { libraryName: string; propertyName: string }
  >({
    mutationFn: (data) => apiSearchLibrary(data),
    onSuccess(data) {
      toast.success("Library found!");
      return data;
    },
    onError: () =>
      toast.error("Couldn't find the library. Please try again later."),
  });

  return { isSearching, searchLibrary, searchLibraryResult };
}
