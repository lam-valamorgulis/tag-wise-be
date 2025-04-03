// ValidationResults.tsx
import React from "react";
import { useGeneralInformation } from "../../context/GeneralInformationProvider";
import CheckActions from "./CheckActions";
import CheckConditions from "./CheckConditions";
import CheckEvents from "./CheckEvents";
import CheckName from "./CheckName";
import { containerStyle } from "./styles/ValidationResult";
import { RuleValidationResult } from "./type";

interface ValidationResultsProps {
  ruleValidationResult: RuleValidationResult;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({
  ruleValidationResult,
}) => {
  const { checkName, checkEvents, checkCondition, checkActions } =
    ruleValidationResult;
  const { options } = useGeneralInformation();

  return (
    <div style={containerStyle}>
      <CheckName checkName={checkName} />
      <CheckEvents
        checkEvents={checkEvents}
        isShopSection={options.isShopSection}
      />
      <CheckConditions checkCondition={checkCondition} />
      <CheckActions checkActions={checkActions} />
    </div>
  );
};

export default ValidationResults;
