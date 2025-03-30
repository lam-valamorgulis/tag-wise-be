import { RuleValidationResult } from "./type";
import ValidationResults from "./ValidationResults";

interface RuleValidationDetailProps {
  ruleValidationResult: RuleValidationResult | string;
}

function RuleValidationDetail({
  ruleValidationResult,
}: RuleValidationDetailProps) {
  if (typeof ruleValidationResult === "string") {
    return <p>Click Validate to audit rule</p>;
  }

  return (
    <>
      <ValidationResults ruleValidationResult={ruleValidationResult} />
    </>
  );
}

export default RuleValidationDetail;
