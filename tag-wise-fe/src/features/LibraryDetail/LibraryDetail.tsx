import { Col, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { useGeneralInformation } from "../../context/GeneralInformationProvider";
import { apiRuleInProduction } from "../../utils/axios";
import ExtensionAndDataElements from "./ExtensionAndDataElements";
import GeneralInfo from "./GeneralInfo";
import Options from "./Options";
import RulesList from "./RulesList";
import useLibrary from "./hooks/useLibrary";
import useRule from "./hooks/useRule";
import { ApiDataState, RuleApiData } from "./type";

interface Rule {
  name: string;
}
function getRuleNames(rules: Rule[] = []): string[] {
  return rules.map((rule) => rule.name);
}

export default function LibraryDetail() {
  const { options, setOptions, setRulesListName } = useGeneralInformation();
  const { isLibraryLoading: isLibraryLoading } = useLibrary();
  const { rulesList, isLoadingRules: isLoadingRules } = useRule();
  const [apiData, setApiData] = useState<ApiDataState>({});

  const isLoading = isLibraryLoading || isLoadingRules;

  useEffect(() => {
    if (rulesList) {
      const ruleNames = getRuleNames(rulesList);
      setRulesListName(ruleNames);
    }
  }, [rulesList, setRulesListName]);

  useEffect(() => {
    const fetchAllRuleData = async () => {
      if (!rulesList?.length) return;

      try {
        const dataPromises = rulesList.map(async (rule) => {
          try {
            const response = await apiRuleInProduction(rule.id);
            const data: RuleApiData = response[0];
            return { id: rule.id, data };
          } catch (error) {
            console.error(`Failed to fetch rule ${rule.id}:`, error);
            return { id: rule.id, data: null };
          }
        });

        const results = await Promise.all(dataPromises);
        const newApiData = results.reduce<ApiDataState>((acc, { id, data }) => {
          if (data) {
            acc[id] = data;
          }
          return acc;
        }, {});

        setApiData(newApiData);
      } catch (error) {
        console.error("Failed to fetch rule data:", error);
      }
    };

    fetchAllRuleData();
  }, [rulesList]);

  if (isLoading) {
    return <Loading />;
  }

  console.log(apiData);

  return (
    <div className="px-3">
      <Row
        gutter={[32, 32]}
        className="border-b border-blue-200"
        align="middle"
      >
        <GeneralInfo />
      </Row>

      <Row>
        <Typography.Text className="text-sm pt-2 underline">
          Local Rules Validation
        </Typography.Text>
      </Row>

      {/* Options and ExtensionAndDataElements */}
      <Row
        gutter={[24, 16]}
        style={{ width: "100%", margin: 0, paddingBottom: 10 }}
      >
        <Col xs={24} md={12}>
          <Options onOptionsChange={setOptions} options={options} />
        </Col>

        <Col xs={24} md={10}>
          <ExtensionAndDataElements />
        </Col>
      </Row>

      {rulesList && (
        <Row>
          <Col span={24}>
            <RulesList
              rules={rulesList}
              options={options}
              rulesInProduction={apiData}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}
