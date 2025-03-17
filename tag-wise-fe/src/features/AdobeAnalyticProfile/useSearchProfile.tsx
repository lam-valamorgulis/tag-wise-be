import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { apiSearchProfile } from "../../utils/axios";
import { ProfileResultProps } from "./ProfileResult";

export function useSearchProfile() {
  const {
    mutate: searchProfile,
    isPending: isSearchingProfile,
    data: searchProfileResult,
  } = useMutation<
    ProfileResultProps,
    Error,
    { siteCode: string; subsidinary: string }
  >({
    mutationFn: (data) => apiSearchProfile(data),
    onSuccess(data) {
      toast.success("Profile found!");
      return data;
    },
    onError: () =>
      toast.error("Couldn't find the Profile. Please try again later."),
  });

  return { isSearchingProfile, searchProfile, searchProfileResult };
}
