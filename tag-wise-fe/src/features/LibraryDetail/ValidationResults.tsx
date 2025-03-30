/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useGeneralInformation } from "../../context/GeneralInformationProvider";
import { RuleValidationResult } from "./type";

interface ValidationResultsProps {
  ruleValidationResult: RuleValidationResult;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({
  ruleValidationResult,
}) => {
  const { checkName, checkEvents, checkCondition, checkActions } =
    ruleValidationResult;
  const { options } = useGeneralInformation();

  // Common styles
  const containerStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "5px",
    padding: "5px",
    fontFamily: "monospace",
    fontSize: "10px",
    backgroundColor: "#f0f0f0",
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    borderRadius: "3px",
    padding: "5px",
    margin: "2px",
    border: "1px solid #ddd",
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: "bold",
    color: "#333",
    margin: "0 0 5px 0",
    padding: "3px",
    fontFamily: "monospace",
  };

  const testCaseStyle: React.CSSProperties = {
    fontSize: "10px",
    color: "#333",
    margin: "3px 0",
    padding: "3px",
    fontFamily: "monospace",
    wordBreak: "break-word",
  };

  // Styles (update testItemStyle)
  const testItemStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Changed from "flex-start" to "center" for vertical centering
    gap: "8px",
    width: "100%",
    margin: "6px 0",
  };

  const subHeaderStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: "bold",
    color: "#444",
    margin: "5px 0 3px 0",
    fontFamily: "monospace",
  };

  const listItemStyle: React.CSSProperties = {
    color: "#090", // Always green for strings
    marginLeft: "10px",
    listStyleType: "none",
  };

  const renderStatus = (isValid?: boolean) => (
    <span
      style={{
        color: isValid ? "#090" : "#900",
        marginLeft: "4px",
        fontSize: "10px",
        fontFamily: "monospace",
        whiteSpace: "nowrap",
      }}
    >
      {isValid ? "✓ YES" : "✗ NO"}
    </span>
  );
  const renderMatchString = (strings?: string[], inValidValues?: string[]) => {
    if (!strings || !Array.isArray(strings)) return <span>N/A</span>;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {strings.map((str, index) => (
          <span
            key={index}
            style={{
              color: !inValidValues?.includes(str) ? "#090" : "#900",
              marginLeft: "4px",
              fontSize: "10px",
              fontFamily: "monospace",
              whiteSpace: "nowrap",
            }}
          >
            {str}
          </span>
        ))}
      </div>
    );
  };

  // Function to render a number with conditional color
  const renderNumber = (items: number | undefined | string) => {
    if (items === undefined) return "";
    if (typeof items !== "number") return "";

    // Determine the color based on the value
    const color = items < 50 ? "#900" : "#090";

    return (
      <li
        style={{
          ...listItemStyle,
          color, // Apply conditional color for numbers
        }}
      >
        {items.toString()}
      </li>
    );
  };

  const renderList = (items: string[] | undefined) => {
    if (!items) return "";
    if (!Array.isArray(items) || items.length === 0) return "";

    return (
      <ul style={{ paddingLeft: "10px", margin: "0" }}>
        {items.map((item, index) => (
          <li key={index} style={listItemStyle}>
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={containerStyle}>
      {/* Column 1: Check Name */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>I. Check Name</h3>
        <div style={testCaseStyle}>
          <div style={testItemStyle}>
            <span className="ml-2">• Rule Name start with (LC):</span>
            {renderStatus(checkName?.valideName?.userType === "pass")}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">
              • Site Section contains{" "}
              {checkName?.components?.siteSection ?? "N/A"}:
            </span>
            {renderStatus(checkName?.valideName?.siteSection === "pass")}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Purpose</span>
            {renderList([checkName?.components?.purpose ?? ""])}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Tracking Page</span>
            {renderList([checkName?.components?.trackingPage ?? ""])}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Tracking Feature</span>
            {renderList([checkName?.components?.trackingFeature ?? ""])}
          </div>
        </div>
      </div>

      {/* Column 2: Check Events */}
      {/* WL */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>II.Check Events</h3>
        <div style={testCaseStyle}>
          <div style={testItemStyle}>
            <h4 style={subHeaderStyle}>a. Rules contain Window Load :</h4>
            {renderStatus(checkEvents?.checkWindowLoad?.isContainedWL)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Extensions</span>
            {renderList(checkEvents?.checkWindowLoad?.extensions)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Types</span>
            {renderList(checkEvents?.checkWindowLoad?.type)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Rules Order</span>
            {renderNumber(checkEvents?.checkWindowLoad?.order)}
          </div>

          <div style={testItemStyle}>
            <span className="ml-2">• Data Elements Change Included</span>
            {options.isShopSection
              ? renderStatus(
                  checkEvents?.checkWindowLoad?.isDataElementIncluded.isInclude
                )
              : ""}
          </div>
        </div>

        {/* click */}
        <div style={testCaseStyle}>
          <div style={testItemStyle}>
            <h4 style={subHeaderStyle}>a. Rules contain Click :</h4>
            {renderStatus(checkEvents?.checkClicks?.isContainedClick)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Extensions</span>
            {checkEvents?.checkClicks?.isContainedClick &&
              renderList(checkEvents?.checkClicks?.extensions)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Types</span>
            {checkEvents?.checkClicks?.isContainedClick &&
              renderList(checkEvents?.checkClicks?.type)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Rules Order</span>
            {checkEvents?.checkClicks?.isContainedClick &&
              renderNumber(checkEvents?.checkClicks?.order)}
          </div>

          <div style={testItemStyle}>
            <span className="ml-2">• Data Elements Change Included</span>
            {checkEvents?.checkClicks?.isContainedClick &&
              renderStatus(checkEvents?.checkClicks?.delayNavigation)}
          </div>
        </div>

        {/* other */}
        <div style={testCaseStyle}>
          <div style={testItemStyle}>
            <h4 style={subHeaderStyle}>c. Others </h4>
            {renderStatus(checkEvents?.checkOtherEvents?.isContainedOther)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Extensions</span>
            {checkEvents?.checkOtherEvents?.isContainedOther &&
              renderList(checkEvents?.checkOtherEvents?.extensions)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Types</span>
            {checkEvents?.checkOtherEvents?.isContainedOther &&
              renderMatchString(checkEvents?.checkOtherEvents?.type, [
                "dom-ready",
                "page-bottom",
                "library-loaded",
              ])}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Rules Order</span>
            {checkEvents?.checkOtherEvents?.isContainedOther &&
              renderNumber(checkEvents?.checkOtherEvents?.order)}
          </div>
        </div>
      </div>

      {/* Column 3: Check Conditions */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>II. Check Conditions </h3>
        <div style={testCaseStyle}>
          <div style={testItemStyle}>
            <h4 style={subHeaderStyle}>a. Rules contain Date Range </h4>
            {renderStatus(
              checkCondition?.checkDateRange?.isContainedDateRangeComponent
            )}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Implemented by Core Extension</span>
            {checkCondition?.checkDateRange?.isContainedDateRangeComponent &&
              renderList(checkCondition?.checkDateRange?.extensions)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Types</span>
            {checkCondition?.checkDateRange?.isContainedDateRangeComponent &&
              renderList(checkCondition?.checkDateRange?.type)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-6" style={sectionTitleStyle}>
              End date is within the allowed range :
            </span>
            {checkCondition?.checkDateRange?.isContainedDateRangeComponent &&
              renderStatus(checkCondition?.checkDateRange?.settings.isValid)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Current End Date</span>
            {checkCondition?.checkDateRange?.isContainedDateRangeComponent &&
              renderList(
                checkCondition?.checkDateRuleInProduction
                  ?.currentEndDateInProduction
              )}
          </div>

          <div style={testItemStyle}>
            <span className="ml-2">• Max date range allowed</span>
            {checkCondition?.checkDateRange?.isContainedDateRangeComponent &&
              renderList(
                checkCondition?.checkDateRange?.settings.maxAllowedDate
              )}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Expected End Date</span>
            {checkCondition?.checkDateRange?.isContainedDateRangeComponent &&
              renderList(
                checkCondition?.checkDateRange?.settings.expectedEndDate
              )}
          </div>
        </div>

        {/* check trustArc */}
        <div style={testCaseStyle}>
          <div style={testItemStyle}>
            <h4 style={subHeaderStyle}>b. EU consent </h4>
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• TrustArc is included</span>
            {!checkCondition?.checkTrustArcCondition?.byPass &&
              renderStatus(
                checkCondition?.checkTrustArcCondition?.isContainedTrustArc
              )}
          </div>
        </div>
        {/* check path */}
        <div style={testCaseStyle}>
          <div style={testItemStyle}>
            <h4 style={subHeaderStyle}>c. Check Path & Query String </h4>
            {renderStatus(checkCondition?.checkPathString?.isContainPathQuery)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Keyword is not included</span>
            {checkCondition?.checkPathString?.isContainPathQuery &&
              renderStatus(
                checkCondition?.checkPathString?.settings?.inValidQuery.length >
                  0
              )}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• InValid Keyword</span>
            {checkCondition?.checkPathString?.isContainPathQuery &&
              renderList(
                checkCondition?.checkPathString?.settings?.inValidQuery
              )}
          </div>
        </div>
      </div>

      {/* Column 4: Check Actions */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>IV. Check Actions</h3>
        <div style={testCaseStyle}>
          <h4 style={subHeaderStyle}>a. Check Custom code</h4>
          <div style={testItemStyle}>
            <span>• Is Actions implemented by Custom code</span>
            {renderStatus(checkActions?.checkActions?.isContainedActions)}
          </div>

          <div style={testItemStyle}>
            <span className="ml-2">• Extensions</span>
            {checkActions?.checkActions?.isContainedActions &&
              renderList(checkActions?.checkActions?.extensions)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Types</span>
            {checkActions?.checkActions?.isContainedActions &&
              renderList(checkActions?.checkActions?.type)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Language</span>
            {!checkActions?.checkActions?.isContainedActions &&
              renderMatchString(checkActions?.checkActions?.settings?.method, [
                "html",
              ])}
          </div>

          <h4 style={subHeaderStyle}>b. Check Code Inside</h4>
          <div style={testItemStyle}>
            <span className="ml-2">• Don't Contain PII</span>
            {renderStatus(!checkActions?.checkActions?.settings?.containPII)}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">
              • Don't Contain Single Character Variable
            </span>
            {renderStatus(
              !checkActions?.checkActions?.settings?.singleVariable
            )}
          </div>
          <div style={testItemStyle}>
            <span className="ml-2">• Keyword is not included</span>
            {renderStatus(
              checkActions?.checkActions?.settings?.inValidQuery.length <= 0
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationResults;
