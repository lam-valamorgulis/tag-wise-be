// CheckConditions.tsx
import React from "react";
import { renderList, renderStatus } from "./helper/RenderHelpers";
import {
  sectionStyle,
  sectionTitleStyle,
  subHeaderStyle,
  testCaseStyle,
  testItemStyle,
} from "./styles/ValidationResult";
import { RuleValidationResult } from "./type";

interface CheckConditionsProps {
  checkCondition: RuleValidationResult["checkCondition"];
}

const CheckConditions: React.FC<CheckConditionsProps> = ({
  checkCondition,
}) => {
  const isUrgentRule = checkCondition.checkDateRuleInProduction?.isUrgentRules;
  const colorString = isUrgentRule ? "#900" : "#090";

  return (
    <div style={sectionStyle}>
      <h3 style={sectionTitleStyle}>III. Check Conditions </h3>
      <div style={testCaseStyle}>
        <div style={testItemStyle}>
          <h4 style={subHeaderStyle}>a. Rules contain Date Range </h4>
          {renderStatus(
            checkCondition?.checkDateRange?.isContainedDateRangeComponent
          )}
        </div>
        <div style={testItemStyle}>
          <span>• Implemented by Core Extension</span>
          {checkCondition?.checkDateRange?.isContainedDateRangeComponent &&
            renderList(checkCondition?.checkDateRange?.extensions)}
        </div>
        <div style={testItemStyle}>
          <span>• Types</span>
          {checkCondition?.checkDateRange?.isContainedDateRangeComponent &&
            renderList(checkCondition?.checkDateRange?.type)}
        </div>
        <div style={testItemStyle}>
          <span style={sectionTitleStyle}>
            End date is within the allowed range :
          </span>
          {checkCondition?.checkDateRange?.isContainedDateRangeComponent &&
            renderStatus(checkCondition?.checkDateRange?.settings.isValid)}
        </div>
        <div style={testItemStyle}>
          <span>• Current End Date</span>
          <div>
            {checkCondition?.checkDateRange?.isContainedDateRangeComponent &&
              renderList(
                checkCondition.checkDateRuleInProduction
                  ?.currentEndDateInProduction,
                colorString
              )}
          </div>
        </div>

        <div style={testItemStyle}>
          <span>• Expected End Date</span>
          {checkCondition?.checkDateRange?.isContainedDateRangeComponent &&
            renderList(
              checkCondition?.checkDateRange?.settings.expectedEndDate
            )}
        </div>
        <div style={testItemStyle}>
          <span>• Max date range allowed</span>
          {checkCondition?.checkDateRange?.isContainedDateRangeComponent &&
            renderList(checkCondition?.checkDateRange?.settings.maxAllowedDate)}
        </div>
      </div>

      <div style={testCaseStyle}>
        <div style={testItemStyle}>
          <h4 style={subHeaderStyle}>b. EU consent </h4>
        </div>
        <div style={testItemStyle}>
          <span>• TrustArc is included</span>
          {!checkCondition?.checkTrustArcCondition?.byPass &&
            renderStatus(
              checkCondition?.checkTrustArcCondition?.isContainedTrustArc
            )}
        </div>
      </div>

      <div style={testCaseStyle}>
        <div style={testItemStyle}>
          <h4 style={subHeaderStyle}>c. Check Path & Query String </h4>
          {renderStatus(checkCondition?.checkPathString?.isContainPathQuery)}
        </div>

        {checkCondition?.checkPathString?.isContainPathQuery &&
          checkCondition?.checkPathString?.settings?.configurable?.map(
            (config, index: number) => {
              const [type, paths] = Object.entries(config)[0];
              return (
                <div key={`${type}-${index}`} style={testItemStyle}>
                  <span>{type}</span>
                  <div style={{ marginLeft: "8px" }}>
                    {paths.map((path, pathIndex) => (
                      <span
                        key={`${path}-${pathIndex}`}
                        style={{
                          color: path.trim() === "NOT" ? "#900" : "#090",
                        }}
                      >
                        {pathIndex > 0 ? " - " : ""}
                        {path}
                      </span>
                    ))}
                  </div>
                </div>
              );
            }
          )}

        <div style={testItemStyle}>
          <span>• InValid Keyword in URL</span>
          {checkCondition?.checkPathString?.isContainPathQuery &&
            renderStatus(
              checkCondition?.checkPathString?.settings?.inValidQuery.length < 0
            )}
        </div>
        <div style={testItemStyle}>
          <span>• InValid Keyword</span>
          {checkCondition?.checkPathString?.isContainPathQuery &&
            renderList(
              checkCondition?.checkPathString?.settings?.inValidQuery,
              "#900"
            )}
        </div>
      </div>
    </div>
  );
};

export default CheckConditions;
