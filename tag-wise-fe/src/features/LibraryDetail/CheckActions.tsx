// CheckActions.tsx
import React from "react";
import {
  renderList,
  renderMatchString,
  renderStatus,
} from "./helper/RenderHelpers";
import {
  sectionStyle,
  sectionTitleStyle,
  subHeaderStyle,
  testCaseStyle,
  testItemStyle,
} from "./styles/ValidationResult";
import { RuleValidationResult } from "./type";

interface CheckActionsProps {
  checkActions: RuleValidationResult["checkActions"];
}

const CheckActions: React.FC<CheckActionsProps> = ({ checkActions }) => {
  console.log(checkActions?.checkActions?.settings?.method);
  return (
    <div style={sectionStyle}>
      <h3 style={sectionTitleStyle}>IV. Check Actions</h3>
      <div style={testCaseStyle}>
        <h4 style={subHeaderStyle}>a. Check Custom code</h4>
        <div style={testItemStyle}>
          <span>• Is Actions implemented by Custom code</span>
          {renderStatus(checkActions?.checkActions?.isContainedActions)}
        </div>
        <div style={testItemStyle}>
          <span>• Extensions</span>
          {checkActions?.checkActions?.isContainedActions &&
            renderList(checkActions?.checkActions?.extensions)}
        </div>
        <div style={testItemStyle}>
          <span>• Types</span>
          {checkActions?.checkActions?.isContainedActions &&
            renderList(checkActions?.checkActions?.type)}
        </div>
        <div style={testItemStyle}>
          <span>• Language</span>
          {checkActions?.checkActions?.isContainedActions &&
            renderMatchString(checkActions?.checkActions?.settings?.method, [
              "html",
            ])}
        </div>

        <h4 style={subHeaderStyle}>b. Check Code Inside</h4>
        <div style={testItemStyle}>
          <span>• Don't Contain PII</span>
          {renderStatus(!checkActions?.checkActions?.settings?.containPII)}
        </div>
        <div style={testItemStyle}>
          <span>• Don't Contain Single Character Variable</span>
          {renderStatus(!checkActions?.checkActions?.settings?.singleVariable)}
        </div>
        <div style={testItemStyle}>
          <span>• Keyword is not included</span>
          {renderStatus(
            checkActions?.checkActions?.settings?.inValidQuery.length <= 0
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckActions;
