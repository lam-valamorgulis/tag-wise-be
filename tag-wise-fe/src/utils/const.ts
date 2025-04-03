import { theme } from "antd";

export const THEME_OPTIONS = {
  components: {
    Typography: {
      titleMarginBottom: "0",
    },
    Table: {
      borderColor: "rgb(203,213,225)",
    },
  },
  token: {
    fontSize: 14,
    sizeStep: 4,
  },
  algorithm: theme.compactAlgorithm,
};

export const CHECKLISTDATA = {
  newTagChecklist: [
    {
      item: "Summary (Title)",
      result: "[LC Request] [SITE CODE] - [TAGS] [New Tag]",
    },
    { item: "Issue Type", result: "Enhancement Request" },
    { item: "Subsidiary (GTA)", result: "" },
    { item: "Section (GTA)", result: "" },
    { item: "Target Property", result: "" },
    { item: "Target Page", result: "" },
    { item: "Status (AS-IS)", result: "" },
    { item: "Purpose & Goal", result: "" },
    { item: "DataTrue Tag Audit Report result", result: "" },
    { item: "① Result URL", result: "" },
    { item: "② Result Screenshot", result: "" },
    { item: "Local Rule Monitoring Excel file", result: "" },
    { item: "Sub’s Head of Online Biz Confirmation", result: "Name" },
  ],
  newUpdateRuleChecklist: [
    {
      item: "Summary (Title)",
      result: "[LC Request] [SITE CODE] - [TAGS] [New/update Rule]",
    },
    { item: "Issue Type", result: "3rd Party Tag Request" },
    { item: "Subsidiary (GTA)", result: "" },
    { item: "Section (GTA)", result: "" },
    { item: "Target Property", result: "" },
    { item: "Target Page", result: "" },
    { item: "Status (TO-BE)", result: "" },
    { item: "Purpose & Goal", result: "" },
    { item: "DataTrue Tag Audit Report result", result: "" },
    { item: "① Result URL", result: "" },
    { item: "② Result Screenshot", result: "" },
    { item: "Launch Publish Document Excel file", result: "" },
    { item: "Test Result screenshot image file", result: "" },
    { item: "Local Rule Monitoring Excel file", result: "" },
    { item: "Event - NOT Dom Ready", result: "" },
    { item: "Query Path / Value Comparison", result: "" },
    { item: "Condition - Date Range", result: "" },
    { item: "Script - JavaScript", result: "" },
    { item: "Integration Result", result: "" },
    { item: "Sub’s Head of Online Biz Confirmation", result: "Name" },
    { item: "Ticket Link of New Tag Approval", result: "Ticket ID" },
  ],
  dateExtensionRuleChecklist: [
    {
      item: "Summary (Title)",
      result: "[LC Request] [SITE CODE] - [TAGS] [Date Extension Rule]",
    },
    { item: "Issue Type", result: "3rd Party Tag Request" },
    { item: "Subsidiary (GTA)", result: "" },
    { item: "Section (GTA)", result: "" },
    { item: "Target Property", result: "" },
    { item: "Target Page", result: "" },
    { item: "Current Expiration Date", result: "" },
    { item: "Requested Expiration Date", result: "" },
    { item: "Purpose & Goal", result: "" },
    { item: "Launch Publish Document Excel file", result: "" },
    { item: "Event - Window Loaded / Click", result: "" },
    { item: "Query Path / Value Comparison", result: "" },
    { item: "Condition - Date Range", result: "" },
    { item: "Actions", result: "" },
    { item: "Sub’s Head of Online Biz Confirmation", result: "Name" },
  ],
  checkout: [
    {
      item: "Summary (Ticket Title)",
      result:
        "[LC Request] [SITE CODE] - [TAGS] - [Update Rule] [Checkout 2.0]",
    },
    { item: "Issue Type", result: "3rd Party Tag Request" },
    { item: "Subsidiary (GTA)", result: "" },
    { item: "Section (GTA)", result: "" },
    { item: "Target Property", result: "" },
    { item: "Launch Publish Document Excel file", result: "" },
    { item: "Test Result screenshot image file", result: "" },
    { item: "Library/Rules", result: "" },
    { item: "Event - Not DOM Ready", result: "" },
    { item: "Event - Data Element Change", result: "" },
    { item: "No changes done to Query Path / VC", result: "" },
    { item: "No changes done to Date Range", result: "" },
    { item: "No changes done in the Script", result: "" },
  ],
  disableCheckList: [
    {
      item: "Summary (Title)",
      result: "[LC Request] [SITE CODE] - [TAGS] [Disable Rule]",
    },
    { item: "Issue Type", result: "3rd Party Tag Request" },
    { item: "Subsidiary (GTA)", result: "" },
    { item: "Section (GTA)", result: "" },
    { item: "Target Property", result: "" },
    { item: "Launch Publish Document Excel file", result: "" },
  ],
};
