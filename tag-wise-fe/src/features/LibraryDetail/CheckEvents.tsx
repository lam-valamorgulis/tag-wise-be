// CheckEvents.tsx
import React from "react";
import {
  renderList,
  renderMatchString,
  renderNumber,
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

interface CheckEventsProps {
  checkEvents: RuleValidationResult["checkEvents"];
  isShopSection: boolean;
}

const CheckEvents: React.FC<CheckEventsProps> = ({
  checkEvents,
  isShopSection,
}) => {
  return (
    <div style={sectionStyle}>
      <h3 style={sectionTitleStyle}>II. Check Events</h3>
      <div style={testCaseStyle}>
        <div style={testItemStyle}>
          <h4 style={subHeaderStyle}>a. Rules contain Window Load :</h4>
          {renderStatus(checkEvents?.checkWindowLoad?.isContainedWL)}
        </div>
        <div style={testItemStyle}>
          <span>• Extensions</span>
          {renderList(checkEvents?.checkWindowLoad?.extensions)}
        </div>
        <div style={testItemStyle}>
          <span>• Types</span>
          {renderList(checkEvents?.checkWindowLoad?.type)}
        </div>
        <div style={testItemStyle}>
          <span>• Rules Order</span>
          {renderNumber(checkEvents?.checkWindowLoad?.order)}
        </div>
        <div style={testItemStyle}>
          <span>• Data Elements Change Included</span>
          {isShopSection &&
            renderStatus(
              checkEvents?.checkWindowLoad?.isDataElementIncluded.isInclude
            )}
        </div>
      </div>

      <div style={testCaseStyle}>
        <div style={testItemStyle}>
          <h4 style={subHeaderStyle}>a. Rules contain Click :</h4>
          {renderStatus(checkEvents?.checkClicks?.isContainedClick)}
        </div>
        <div style={testItemStyle}>
          <span>• Extensions</span>
          {checkEvents?.checkClicks?.isContainedClick &&
            renderList(checkEvents?.checkClicks?.extensions)}
        </div>
        <div style={testItemStyle}>
          <span>• Types</span>
          {checkEvents?.checkClicks?.isContainedClick &&
            renderList(checkEvents?.checkClicks?.type)}
        </div>
        <div style={testItemStyle}>
          <span>• Rules Order</span>
          {checkEvents?.checkClicks?.isContainedClick &&
            renderNumber(checkEvents?.checkClicks?.order)}
        </div>
        <div style={testItemStyle}>
          <span>• Delay Navigation</span>
          {checkEvents?.checkClicks?.isContainedClick &&
            renderStatus(checkEvents?.checkClicks?.delayNavigation)}
        </div>
      </div>

      <div style={testCaseStyle}>
        <div style={testItemStyle}>
          <h4 style={subHeaderStyle}>c. Others </h4>
          {renderStatus(checkEvents?.checkOtherEvents?.isContainedOther)}
        </div>
        <div style={testItemStyle}>
          <span>• Extensions</span>
          {checkEvents?.checkOtherEvents?.isContainedOther &&
            renderList(checkEvents?.checkOtherEvents?.extensions)}
        </div>
        <div style={testItemStyle}>
          <span>• Types</span>
          {checkEvents?.checkOtherEvents?.isContainedOther &&
            renderMatchString(checkEvents?.checkOtherEvents?.type, [
              "dom-ready",
              "page-bottom",
              "library-loaded",
            ])}
        </div>
        <div style={testItemStyle}>
          <span>• Rules Order</span>
          {checkEvents?.checkOtherEvents?.isContainedOther &&
            renderNumber(checkEvents?.checkOtherEvents?.order)}
        </div>
      </div>
    </div>
  );
};

export default CheckEvents;
