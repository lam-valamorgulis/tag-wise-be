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
          {renderStatus(
            checkActions?.checkActions?.settings?.containPII.length <= 0
          )}
        </div>
        {checkActions?.checkActions?.settings?.containPII?.length > 0 && (
          <div style={testItemStyle}>
            <span className="ml-2">Found PII types:</span>
            {checkActions?.checkActions?.settings?.containPII?.map(
              (piiType) => (
                <div key={piiType} className="text-red-500">
                  • {piiType}
                </div>
              )
            )}
          </div>
        )}
        <div style={testItemStyle}>
          <span>• Don't Contain Single Char Var s</span>
          {renderStatus(
            !checkActions?.checkActions?.settings?.singleVariable?.length
          )}
        </div>
        {checkActions?.checkActions?.settings?.singleVariable?.length > 0 && (
          <div style={testItemStyle}>
            <span className="ml-2">Founded </span>
            {checkActions?.checkActions?.settings?.singleVariable?.map(
              (item) => (
                <div key={item.match} className="text-red-500">
                  • {item.match}
                </div>
              )
            )}
          </div>
        )}

        <div style={testItemStyle}>
          <span>• Keyword is not included</span>
          {renderStatus(
            checkActions?.checkActions?.settings?.inValidQuery.length <= 0
          )}
        </div>
        <div style={testItemStyle}>
          <span>• InValid Keyword</span>
          {checkActions?.checkActions?.settings?.inValidQuery.length > 0 &&
            renderList(
              checkActions?.checkActions?.settings?.inValidQuery,
              "#900"
            )}
        </div>
      </div>

      <h4 style={subHeaderStyle}>c. Check Other Actions</h4>
      <div style={testItemStyle}>
        <span>• Not included Extension</span>
        {renderStatus(
          !checkActions?.checkOtherActions?.isContainedOtherActions
        )}
      </div>
      <div style={testItemStyle}>
        <span>• Extensions</span>
        {checkActions?.checkOtherActions?.isContainedOtherActions &&
          renderList(checkActions?.checkOtherActions?.extensions, "#900")}
      </div>
    </div>
  );
};

export default CheckActions;
