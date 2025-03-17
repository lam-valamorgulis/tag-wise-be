/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface ValidationData {
  checkName?: {
    isValid?: boolean;
    components?: {
      userType?: string;
      siteSection?: string;
      purpose?: string;
      trackingPage?: string;
      trackingFeature?: string;
    };
    valideName?: {
      userType?: string;
      siteSection?: string;
      purpose?: string;
      trackingPage?: string;
      trackingFeature?: string;
    };
  };
  checkEvents?: {
    checkWindowLoad?: {
      isRuleContainWL?: boolean;
      eventComponents?: string[];
      invalidComponents?: {
        isValid?: boolean;
        reason?: string;
      }[];
      validComponents?: {
        isValid?: boolean;
        reason?: string;
      }[];
      totalChecked?: number;
    };
    checkRuleOrder?: {
      checkComponents?: {
        isValid?: boolean;
        reason?: string;
      }[];
      totalChecked?: number;
    };
    checkCookiesEvent?: {
      eventComponents?: string[];
      validatedComponents?: {
        isValid?: boolean;
        reason?: string;
      }[];
      totalChecked?: number;
    };
  };
  checkCondition?: {
    checkDateRange?: {
      isContainDateRange?: boolean;
      validComponents?: {
        id?: string;
        isContainDateRange?: boolean;
        name?: string;
        endDate?: string;
        isValid?: boolean;
        maxAllowedDate?: string;
        reason?: string;
      }[];
      invalidComponents?: any[];
      totalChecked?: number;
    };
    checkPathString?: {
      isContainQueryPath?: boolean;
      conditionElement?: string[];
      validComponents?: any[];
      invalidComponents?: any[];
      totalChecked?: number;
      bypassedComponents?: {
        isValid?: boolean;
        reason?: string;
      }[];
    };
    checkCookiesCondition?: {
      validComponents?: any[];
      invalidComponents?: {
        isValid?: boolean;
        reason?: string;
      }[];
      bypassedComponents?: any[];
      totalChecked?: number;
    };
  };
  checkActions?: {
    checkActions?: {
      isImplementedByCustomCode?: boolean;
      validComponents?: {
        id?: string;
        isValid?: boolean;
        reason?: string;
      }[];
      totalChecked?: number;
    };
  };
}

interface ValidationResultsProps {
  ruleValidationResult?: ValidationData;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({
  ruleValidationResult,
}) => {
  const { checkName, checkEvents, checkCondition, checkActions } =
    ruleValidationResult ?? {};

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

  const testItemStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "8px",
    width: "100%",
    margin: "3px 0",
  };

  const subHeaderStyle: React.CSSProperties = {
    fontSize: "10px",
    fontWeight: "bold",
    color: "#444",
    margin: "5px 0 3px 0",
    fontFamily: "monospace",
  };

  const listItemStyle: React.CSSProperties = {
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
      {isValid ? "✓ PASS" : "✗ FAIL"}
    </span>
  );

  const renderList = (items: string[] | undefined) => {
    if (!items || items.length === 0) return "N/A";
    return (
      <ul style={{ paddingLeft: "10px", margin: "0" }}>
        {items.map((item, index) => (
          <li key={index} style={listItemStyle}>
            . {item}
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
          <div>• Purpose: {checkName?.components?.purpose ?? "N/A"}</div>
          <div>
            • Tracking Page: {checkName?.components?.trackingPage ?? "N/A"}
          </div>
          <div>
            • Tracking Feature:{" "}
            {checkName?.components?.trackingFeature ?? "N/A"}
          </div>
        </div>
      </div>

      {/* Column 2: Check Events */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>II. Check Events</h3>
        <div style={testCaseStyle}>
          <h4 style={subHeaderStyle}>a. Check Window Load</h4>
          <div style={testItemStyle}>
            <span>• Rules contains WL:</span>
            {renderStatus(checkEvents?.checkWindowLoad?.isRuleContainWL)}
          </div>
          <div>
            • Events:
            {renderList(checkEvents?.checkWindowLoad?.eventComponents)}
          </div>

          <h4 style={subHeaderStyle}>b. Check Data Element Change</h4>
          {checkEvents?.checkWindowLoad?.invalidComponents?.map((comp, i) => (
            <div style={testItemStyle} key={i}>
              <span>• {comp?.reason ?? "No reason provided"}</span>
              {renderStatus(comp?.isValid)}
            </div>
          ))}

          {checkEvents?.checkWindowLoad?.validComponents?.map((comp, i) => (
            <div style={testItemStyle} key={i}>
              <span>• {comp?.reason ?? "No reason provided"}</span>
              {renderStatus(comp?.isValid)}
            </div>
          ))}

          <h4 style={subHeaderStyle}>c. Check Rule Order</h4>
          <div style={testItemStyle}>
            <span>• All is greater than 50:</span>
            {renderStatus(
              checkEvents?.checkRuleOrder?.checkComponents?.[0]?.isValid
            )}
          </div>

          <h4 style={subHeaderStyle}>d. Check Consent Mode</h4>
          <div style={testItemStyle}>
            <span>
              •{" "}
              {checkEvents?.checkCookiesEvent?.validatedComponents?.[0]
                ?.reason ?? "No reason provided"}
            </span>
            {renderStatus(
              checkEvents?.checkCookiesEvent?.validatedComponents?.[0]?.isValid
            )}
          </div>
          <div>
            • Events:
            {renderList(checkEvents?.checkCookiesEvent?.eventComponents)}
          </div>
        </div>
      </div>

      {/* Column 3: Check Conditions */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>III. Check Conditions</h3>
        <div style={testCaseStyle}>
          <h4 style={subHeaderStyle}>a. Check Date Range</h4>
          <div style={testItemStyle}>
            <span>• Is Rule contains a date range</span>
            {renderStatus(checkCondition?.checkDateRange?.isContainDateRange)}
          </div>
          {checkCondition?.checkDateRange?.validComponents?.map((comp, i) => (
            <div key={i}>
              <div style={testItemStyle}>
                <span>• {comp?.reason ?? "No reason provided"}</span>
                {renderStatus(comp?.isValid)}
              </div>
              <div style={testItemStyle}>
                <span>• Rule will end before: </span>
                {comp?.endDate
                  ? new Date(comp.endDate).toLocaleDateString()
                  : "N/A"}
              </div>
              <div style={testItemStyle}>
                <span>• Max date range allowed: </span>
                {comp?.maxAllowedDate
                  ? new Date(comp.maxAllowedDate).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          ))}

          {checkCondition?.checkDateRange?.invalidComponents?.map((comp, i) => (
            <div style={testItemStyle} key={i}>
              <span style={{ color: "#900" }}>
                • {comp?.reason ?? "No reason provided"}
              </span>
              {renderStatus(comp?.isValid)}
            </div>
          ))}

          <h4 style={subHeaderStyle}>b. Check Path & Query String</h4>
          <div style={testItemStyle}>
            <span>• Is Rule contains Condition a path and query string:</span>
            {renderStatus(checkCondition?.checkPathString?.isContainQueryPath)}
          </div>
          <div>
            • Condition:
            {renderList(checkCondition?.checkPathString?.conditionElement)}
          </div>

          {checkCondition?.checkPathString?.validComponents?.map((comp, i) => (
            <div style={testItemStyle} key={i}>
              <span>• {comp?.reason ?? "No reason provided"}</span>
              {renderStatus(comp?.isValid)}
            </div>
          ))}

          {checkCondition?.checkPathString?.bypassedComponents?.map(
            (comp, i) => (
              <div style={testItemStyle} key={i}>
                <span>• {comp?.reason ?? "No reason provided"}</span>
                {renderStatus(comp?.isValid)}
              </div>
            )
          )}

          {checkCondition?.checkPathString?.invalidComponents?.map(
            (comp, i) => (
              <div style={{ ...testItemStyle, color: "#900" }} key={i}>
                <span>• {comp?.reason ?? "No reason provided"}</span>
                {renderStatus(comp?.isValid)}
              </div>
            )
          )}
        </div>
      </div>

      {/* Column 4: Check Actions */}
      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>IV. Check Actions</h3>
        <div style={testCaseStyle}>
          <h4 style={subHeaderStyle}>a. Check Custom code</h4>
          <div style={testItemStyle}>
            <span>• Is Actions implemented by Custom code:</span>
            {renderStatus(
              checkActions?.checkActions?.isImplementedByCustomCode
            )}
          </div>

          <h4 style={subHeaderStyle}>b. Check PII</h4>
          {checkActions?.checkActions?.validComponents?.map((comp, i) => (
            <div style={testItemStyle} key={i}>
              <span>• {comp?.reason ?? "No reason provided"}</span>
              {renderStatus(comp?.isValid)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValidationResults;
