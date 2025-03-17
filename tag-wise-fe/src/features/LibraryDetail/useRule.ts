import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiRuleList } from "../../utils/axios";

type RuleItem = {
  id: string;
  name: string;
};

export type RuleList = RuleItem[];

export default function useRule() {
  const { libraryId } = useParams<{
    libraryId: string;
  }>();

  const {
    data: ruleList,
    isLoading: isRuleListLoading,
    error: ruleListError,
  } = useQuery<RuleList, Error>({
    queryKey: ["ruleList", libraryId],
    queryFn: () => apiRuleList(libraryId ?? ""),
    enabled: !!libraryId,
  });

  return {
    ruleList,
    isRuleListLoading,
    ruleListError,
  };
}
