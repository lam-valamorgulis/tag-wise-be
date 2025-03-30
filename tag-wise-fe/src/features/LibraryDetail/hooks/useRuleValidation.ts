import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { apiValidateRule } from "../../../utils/axios";
import { RuleValidationResult } from "../type";

interface ValidationRequestData {
  ruleId: string;
  data: {
    isShopSection: boolean;
    isRequiredConsent: boolean;
    keyword: string[];
    ruleName: string;
  };
}

// Common toast styles to avoid duplication
const toastStyles = {
  success: {
    background: "linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 100%)",
    border: "1px solid #6ee7b7",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    padding: "12px",
    color: "#000",
    fontSize: "14px",
  },
  error: {
    background: "#fff1f0",
    border: "1px solid #ffa39e",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    padding: "12px",
    color: "#000",
    fontSize: "14px",
  },
};

export function useRuleValidation() {
  const {
    mutate: ruleValidation,
    isPending: isValidating,
    data: ruleValidationResult,
  } = useMutation<RuleValidationResult, Error, ValidationRequestData>({
    mutationFn: async ({ ruleId, data }) => {
      const response = await apiValidateRule(ruleId, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      toast.success(
        `Validation successful for rule: ${variables.data.ruleName}`,
        {
          position: "top-center",
          duration: 4000,
          style: toastStyles.success,
        }
      );
      return data;
    },
    onError: (error) => {
      toast.error(
        error.message || "Couldn't validate. Please try again later.",
        {
          position: "top-center",
          duration: 4000,
          style: toastStyles.error,
        }
      );
    },
  });

  return {
    isValidating,
    ruleValidation,
    ruleValidationResult,
  };
}
