import { Collapse } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { apiRuleInProduction } from "../../utils/axios";
import { useRuleValidation } from "./hooks/useRuleValidation";
import type Options from "./Options";
import RuleLabel from "./RuleLabel";
import RuleValidationDetail from "./RuleValidationDetail";
import { ApiDataState, RuleApiData, RuleList, ValidationResult } from "./type";

function RulesList({ rules, options }: { rules: RuleList; options: Options }) {
  const { ruleValidation, ruleValidationResult, isValidating } =
    useRuleValidation();
  const { propertyId } = useParams<{ propertyId: string }>();
  const [activePanels, setActivePanels] = useState<string[]>([]);
  const [validationResults, setValidationResults] = useState<ValidationResult>(
    {}
  );
  const [validatingRuleId, setValidatingRuleId] = useState<string | null>(null);
  const [apiData, setApiData] = useState<ApiDataState>({});

  // Fetch data for all rules when component mounts or rules change
  useEffect(() => {
    const fetchAllRuleData = async () => {
      const dataPromises = rules.map(async (rule) => {
        const response = await apiRuleInProduction(rule.id);
        const data: RuleApiData = response[0];
        return { id: rule.id, data };
      });

      const results = await Promise.all(dataPromises);
      const newApiData = results.reduce<ApiDataState>((acc, { id, data }) => {
        acc[id] = data;
        return acc;
      }, {});

      setApiData(newApiData);
    };

    fetchAllRuleData();
  }, [rules]);

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

  if (isValidating) {
    return <Loading />;
  }

  const handleCollapseChange = (keys: string | string[]) => {
    setActivePanels(Array.isArray(keys) ? keys : [keys]);
  };

  const collapseItems = rules.map((rule) => {
    const ruleApiData = apiData[rule.id] || {};

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
      children: (
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
