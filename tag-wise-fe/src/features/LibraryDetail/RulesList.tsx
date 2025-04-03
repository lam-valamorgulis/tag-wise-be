import { Collapse } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { useRuleValidation } from "./hooks/useRuleValidation";
import type Options from "./Options";
import RuleLabel from "./RuleLabel";
import RuleValidationDetail from "./RuleValidationDetail";
import { ApiDataState, RuleList, ValidationResult } from "./type";

function RulesList({
  rules,
  options,
  rulesInProduction,
}: {
  rules: RuleList;
  options: Options;
  rulesInProduction: ApiDataState;
}) {
  const { ruleValidation, ruleValidationResult, isValidating } =
    useRuleValidation();
  const { propertyId } = useParams<{ propertyId: string }>();
  const [activePanels, setActivePanels] = useState<string[]>([]);
  const [validationResults, setValidationResults] = useState<ValidationResult>(
    {}
  );
  const [validatingRuleId, setValidatingRuleId] = useState<string | null>(null);

  const handleValidateRule = async (ruleId: string, ruleName: string) => {
    try {
      setValidatingRuleId(ruleId);
      await ruleValidation({ ruleId, data: { ...options, ruleName } });
      if (!activePanels.includes(ruleId)) {
        setActivePanels((prev) => [...prev, ruleId]);
      }
    } catch (error) {
      console.error("Validation Error:", error);
    }
  };

  useEffect(() => {
    if (validatingRuleId && ruleValidationResult) {
      setValidationResults((prevResults) => ({
        ...prevResults,
        [validatingRuleId]: ruleValidationResult,
      }));
      setValidatingRuleId(null);
    }
  }, [ruleValidationResult, validatingRuleId]);

  const handleCollapseChange = (keys: string | string[]) => {
    setActivePanels(Array.isArray(keys) ? keys : [keys]);
  };

  const collapseItems = rules.map((rule) => {
    const ruleApiData = rulesInProduction[rule.id] || {};

    return {
      key: rule.id,
      label: (
        <RuleLabel
          rule={rule}
          ruleApiData={ruleApiData}
          propertyId={propertyId!}
          handleValidateRule={handleValidateRule}
        />
      ),
      children:
        isValidating && validatingRuleId === rule.id ? (
          <div className="h-40">
            <Loading />
          </div>
        ) : (
          <RuleValidationDetail
            ruleValidationResult={
              validationResults[rule.id] ?? "Click 'Validate' to check rule"
            }
          />
        ),
    };
  });

  return (
    <Collapse
      activeKey={activePanels}
      onChange={handleCollapseChange}
      items={collapseItems}
    />
  );
}

export default RulesList;
