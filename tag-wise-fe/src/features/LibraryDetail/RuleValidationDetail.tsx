import ValidationResults, { ValidationData } from "./ValidationResults";

interface RuleValidationDetailProps {
  ruleValidationResult: ValidationData;
}

function RuleValidationDetail({
  ruleValidationResult,
}: RuleValidationDetailProps) {
  if (typeof ruleValidationResult == "string")
    return <p>Click Validate to audit rule</p>;

  return (
    <>
      <ValidationResults ruleValidationResult={ruleValidationResult} />
    </>
  );
}

export default RuleValidationDetail;
