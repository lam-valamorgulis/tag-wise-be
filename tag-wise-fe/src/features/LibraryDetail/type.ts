/* eslint-disable @typescript-eslint/no-explicit-any */

// RuleList and RuleItem types (unchanged)
type RuleItem = {
  id: string;
  name: string;
  enable: boolean;
  revision_number: number;
};

export type RuleList = RuleItem[];

// RuleApiData and ApiDataState types (unchanged)
export interface RuleApiData {
  id: string;
  attributes?: {
    revision_number?: string;
    published_at?: string;
  };
}

export interface ApiDataState {
  [key: string]: RuleApiData;
}

// ValidationResult type (unchanged)
export interface ValidationResult {
  [key: string]: any;
}

// RuleLabelProps type (unchanged)
export interface RuleLabelProps {
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

// Base types for common properties
interface Component {
  userType: string;
  siteSection: string;
  purpose: string;
  trackingPage: string;
  trackingFeature: string;
}

// checkName section
interface CheckName {
  isValid: boolean;
  components: Component;
  valideName: Component;
}

// checkEvents section
interface CheckWindowLoad {
  isContainedWL: boolean;
  extensions: string[];
  type: string[];
  order: number;
  isDataElementIncluded: {
    isInclude: boolean;
    settings: any[]; // Adjust if settings have a specific structure
  };
}

interface CheckClicks {
  isContainedClick: boolean;
  extensions: string[];
  type: string[];
  order: string; // Empty string in the data, but could be a number in other cases
  delayNavigation: boolean;
}

interface CheckOtherEvents {
  isContainedOther: boolean;
  extensions: string[];
  type: string[];
  order: number;
}

interface CheckEvents {
  checkWindowLoad: CheckWindowLoad;
  checkClicks: CheckClicks;
  checkOtherEvents: CheckOtherEvents;
}

// checkCondition section
interface CheckDateRangeSettings {
  isValid: boolean;
  expectedEndDate: string[];
  maxAllowedDate: string[];
}

interface CheckDateRange {
  isContainedDateRangeComponent: boolean;
  extensions: string[];
  type: string[];
  settings: CheckDateRangeSettings;
}

interface CheckTrustArcCondition {
  byPass: boolean;
  isContainedTrustArc: boolean;
}

interface CheckPathStringSettings {
  inValidQuery: string[];
  configurable: string[];
}

interface CheckPathString {
  isContainPathQuery: boolean;
  settings: CheckPathStringSettings;
}

interface CheckDateRuleInProduction {
  isUrgentRules: boolean;
  currentEndDateInProduction: string[];
}

interface CheckCondition {
  checkDateRange: CheckDateRange;
  checkDateRuleInProduction: CheckDateRuleInProduction;
  checkTrustArcCondition: CheckTrustArcCondition;
  checkPathString: CheckPathString;
}

// checkActions section
interface CheckActionsSettings {
  method: string[];
  containPII: boolean;
  inValidQuery: string[];
  singleVariable: boolean;
}

interface CheckActionsData {
  isContainedActions: boolean;
  extensions: string[];
  type: string[];
  settings: CheckActionsSettings;
}

interface CheckActions {
  checkActions: CheckActionsData;
}

// Top-level interface for the entire data structure
export interface RuleValidationResult {
  checkName: CheckName;
  checkEvents: CheckEvents;
  checkCondition: CheckCondition;
  checkActions: CheckActions;
}
