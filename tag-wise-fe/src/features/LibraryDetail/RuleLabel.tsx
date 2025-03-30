import { Button, Col, Row } from "antd";
import { RuleApiData } from "./type";

interface RuleLabelProps {
  rule: {
    id: string;
    name: string;
    revision_number: number;
    enable: boolean;
  };
  ruleApiData: RuleApiData;
  propertyId: string;
  handleValidateRule: (ruleId: string, ruleName: string) => void;
}

const RuleLabel = ({
  rule,
  ruleApiData,
  propertyId,
  handleValidateRule,
}: RuleLabelProps) => {
  // Common button style to match "Validate" button
  const commonButtonStyle = {
    fontSize: "12px",
    padding: "0 8px",
    margin: "0 8px",
    height: "auto",
    borderColor: "blue",
    color: "#333",
  };

  // Common text style for consistency
  const commonTextStyle = {
    fontSize: "12px",
    margin: "0 8px",
    color: "#333", // Default color for labels
  };

  // Style for the revision numbers
  const productionNumberStyle = {
    color: "#52c41a", // Green for production revision number
  };

  const currentNumberStyle = {
    color: "#fa8c16", // Orange for current revision number
  };

  return (
    <Row
      align="middle"
      style={{
        width: "100%",
        padding: "4px 0",
        fontSize: "10px",
        borderRadius: "3px",
        margin: "2px 0",
      }}
    >
      <Col span={8} style={{ textAlign: "left" }}>
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
        <a
          href={`https://experience.adobe.com/#/@samsung/data-collection/tags/companies/COae164dc89349443cb5092e1fdc571f55/properties/${propertyId}/rules/${
            ruleApiData.id ?? rule.id
          }/ruleCompare/...${rule.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "10px" }}
        >
          <Button type="dashed" style={commonButtonStyle}>
            Compare
          </Button>
        </a>

        <a
          href={`https://experience.adobe.com/#/@samsung/data-collection/tags/companies/COae164dc89349443cb5092e1fdc571f55/properties/${propertyId}/rules/${rule.id}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "4px" }}
        >
          <Button type="dashed" style={commonButtonStyle}>
            Detail
          </Button>
        </a>
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
      <Col span={8} style={{ textAlign: "center" }}>
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
      <Col span={8} style={{ textAlign: "right" }}>
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
