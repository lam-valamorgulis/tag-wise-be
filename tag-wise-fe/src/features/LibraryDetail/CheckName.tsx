// CheckName.tsx
import React from "react";
import { renderList, renderStatus } from "./helper/RenderHelpers";
import {
  sectionStyle,
  sectionTitleStyle,
  testCaseStyle,
  testItemStyle,
} from "./styles/ValidationResult";
import { RuleValidationResult } from "./type";

interface CheckNameProps {
  checkName: RuleValidationResult["checkName"];
}

const CheckName: React.FC<CheckNameProps> = ({ checkName }) => {
  return (
    <div style={sectionStyle}>
      <h3 style={sectionTitleStyle}>I. Check Name</h3>
      <div style={testCaseStyle}>
        <div style={testItemStyle}>
          <span>• Rule Name start with (LC):</span>
          {renderStatus(checkName?.valideName?.userType === "pass")}
        </div>
        <div style={testItemStyle}>
          <span>
            • Site Section contains{" "}
            {checkName?.components?.siteSection ?? "N/A"}:
          </span>
          {renderStatus(checkName?.valideName?.siteSection === "pass")}
        </div>
        <div style={testItemStyle}>
          <span>• Purpose</span>
          {renderList([checkName?.components?.purpose ?? ""])}
        </div>
        <div style={testItemStyle}>
          <span>• Tracking Page</span>
          {renderList([checkName?.components?.trackingPage ?? ""])}
        </div>
        <div style={testItemStyle}>
          <span>• Tracking Feature</span>
          {renderList([checkName?.components?.trackingFeature ?? ""])}
        </div>
      </div>
    </div>
  );
};

export default CheckName;
