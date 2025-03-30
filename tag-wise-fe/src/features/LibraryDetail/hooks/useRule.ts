import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiRuleList } from "../../../utils/axios";
import { RuleList } from "../type";

export default function useRule() {
  const { libraryId } = useParams<{
    libraryId: string;
  }>();

  const {
    data: rulesList,
    isLoading: isLoadingRules,
    error: ruleListError,
  } = useQuery<RuleList, Error>({
    queryKey: ["ruleList", libraryId],
    queryFn: () => apiRuleList(libraryId ?? ""),
    enabled: !!libraryId,
  });

  return {
    rulesList,
    isLoadingRules,
    ruleListError,
  };
}
