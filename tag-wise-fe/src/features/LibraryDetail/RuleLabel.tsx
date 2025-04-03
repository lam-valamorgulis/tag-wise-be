import { Button, Col, Row } from "antd";
import {
  commonButtonStyle,
  commonTextStyle,
  currentNumberStyle,
  productionNumberStyle,
  revisionContainerStyle,
  revisionInfoStyle,
} from "./styles/RuleLabel.ts";
import { RuleLabelProps } from "./type";

const SPECIAL_VENDORS = ["sprinklr", "medallia", "beusable"];

// Add this helper function
const containsVendorName = (ruleName: string): boolean => {
  const normalizedName = ruleName.toLowerCase();
  return SPECIAL_VENDORS.some((vendor) => normalizedName.includes(vendor));
};

const RuleLabel = ({
  rule,
  ruleApiData,
  propertyId,
  handleValidateRule,
}: RuleLabelProps) => {
  return (
    <Row
      align="middle"
      style={{
        width: "100%",
        fontSize: "10px",
        borderRadius: "3px",
        margin: "2px 0",
      }}
    >
      <Col span={10} style={{ textAlign: "left" }}>
        <div style={revisionContainerStyle}>
          <div style={revisionInfoStyle}>
            <span style={commonTextStyle}>
              Prod Rev:
              <span style={productionNumberStyle}>
                {ruleApiData.attributes?.revision_number ?? " -"}
              </span>
            </span>
            <span style={commonTextStyle}>
              | Current Rev:{" "}
              <span style={currentNumberStyle}>{rule.revision_number}</span>
            </span>
          </div>

          <a
            href={`https://experience.adobe.com/#/@samsung/data-collection/tags/companies/COae164dc89349443cb5092e1fdc571f55/properties/${propertyId}/rules/${
              ruleApiData.id ?? rule.id
            }/ruleCompare/...${rule.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="dashed" style={commonButtonStyle}>
              Compare
            </Button>
          </a>
          <a
            href={`https://experience.adobe.com/#/@samsung/data-collection/tags/companies/COae164dc89349443cb5092e1fdc571f55/properties/${propertyId}/rules/${rule.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="dashed" style={commonButtonStyle}>
              Detail
            </Button>
          </a>
          {containsVendorName(rule.name) && (
            <Button type="dashed" style={commonButtonStyle}>
              Non-Media Tag
            </Button>
          )}
        </div>

        {!rule.enable && (
          <Button
            type="dashed"
            style={{
              ...commonButtonStyle,
              color: "#fa8c16",
            }}
          >
            Disable
          </Button>
        )}
      </Col>
      <Col span={8} style={{ textAlign: "left" }}>
        <span
          style={{
            color: "#333",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "left",
            marginLeft: "100px",
            whiteSpace: "normal",
            wordBreak: "break-word",
            fontSize: "12px",
          }}
        >
          {rule.name}
        </span>
      </Col>
      <Col span={6} style={{ textAlign: "right" }}>
        <Button
          type="dashed"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleValidateRule(rule.id, rule.name);
          }}
          style={commonButtonStyle}
        >
          Validate
        </Button>
      </Col>
    </Row>
  );
};

export default RuleLabel;
