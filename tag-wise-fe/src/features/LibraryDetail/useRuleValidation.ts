/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { apiValidateRule } from "../../utils/axios";

export function useRuleValidation() {
  const {
    mutate: ruleValidation,
    isPending: isValidating,
    data: ruleValidationResult,
  } = useMutation<any, Error, { ruleId: string; data: any }>({
    mutationFn: ({ ruleId, data }) => apiValidateRule(ruleId, data),
    onSuccess(data) {
      // toast.success("Validate Success");
      return data;
    },
    onError: () => toast.error("Couldn't validate. Please try again later."),
  });

  return { isValidating, ruleValidation, ruleValidationResult };
}
