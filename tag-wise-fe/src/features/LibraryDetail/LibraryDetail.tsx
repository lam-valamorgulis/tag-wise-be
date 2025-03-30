import { Col, Row, Spin, Typography } from "antd";
import { useEffect } from "react";
import { useGeneralInformation } from "../../context/GeneralInformationProvider";
import ExtensionAndDataElements from "./ExtensionAndDataElements";
import GeneralInfo from "./GeneralInfo";
import Options from "./Options";
import RulesList from "./RulesList";
import useLibrary from "./hooks/useLibrary";
import useRule from "./hooks/useRule";

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

  const isLoading = isLibraryLoading || isLoadingRules;

  useEffect(() => {
    if (rulesList) {
      const ruleNames = getRuleNames(rulesList);
      setRulesListName(ruleNames);
    }
  }, [rulesList, setRulesListName]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

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
            <RulesList rules={rulesList} options={options} />
          </Col>
        </Row>
      )}
    </div>
  );
}
