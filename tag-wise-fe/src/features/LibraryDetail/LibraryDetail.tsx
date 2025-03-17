import { Col, Row, Typography } from "antd";
import { useState } from "react";
import LibrarySummary from "./LibrarySummary";
import Options from "./Options";
import PropertyDetail from "./PropertyDetail";
import RulesList from "./RulesList";
import useLibrary from "./useLibrary";
import useProperty from "./useProperty";
import useRule from "./useRule";

export default function LibraryDetail() {
  const { propertyDetail: property } = useProperty();
  const { librarySummary } = useLibrary();
  const { ruleList } = useRule();

  const [options, setOptions] = useState<Options>({
    isHqRules: false,
    isShopSection: false,
    isRequiredConsent: false,
    keyword: [],
  });

  return (
    <div className="px-3">
      <Row
        gutter={[32, 32]}
        className="border-b border-blue-200"
        align={"middle"}
      >
        <Col xs={24} md={13}>
          {property && <PropertyDetail property={property} />}
        </Col>

        <Col xs={24} md={11}>
          {librarySummary && <LibrarySummary librarySummary={librarySummary} />}
        </Col>
      </Row>

      <Row className="pt-1">
        <Typography.Text type="warning" className="text-sm">
          Local Rules Validation
        </Typography.Text>
      </Row>

      <Row gutter={[0, 0]}>
        <Col span={24}>
          <Options onOptionsChange={setOptions} options={options} />
        </Col>
        <Col span={24}>
          {ruleList && librarySummary && property && (
            <RulesList
              rules={ruleList}
              options={options}
              librarySummary={librarySummary}
              property={property}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
