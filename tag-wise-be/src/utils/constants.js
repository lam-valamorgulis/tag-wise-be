// Window Events
const WINDOW_LOADED = 'core::events::window-loaded';

// Data Element Events
const DATA_ELEMET_CHANGE = 'core::events::data-element-change';

// Custom Events
const CUSTOM_EVENT = 'core::events::custom';
const CLICK_EVENT = 'core::events::click';
const SUBMIT_EVENT = 'core::events::submit';

// Custom condition
const DATE_RANGE_CONDITION = 'core::conditions::date-range';
const PATH = 'core::conditions::path';
const PATH_AND_QUERYSTRING = 'core::conditions::path-and-querystring';

// Custom code
const CUSTOM_CODE = 'core::conditions::custom-code';

// action custom code

const ACTION_CUSTOM_CODE = 'core::actions::custom-code';
// pattern matching
const GDPR = 'bnotice_gdpr_prefs';

// API Status Codes
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;
const HTTP_NOT_FOUND = 404;
const HTTP_SERVER_ERROR = 500;

// Pagination
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

// Time Constants
const ONE_HOUR = 3600000;
const ONE_DAY = 86400000;

// other
const DELAY_NAVIGATION = 'anchorDelay';
const NAME = 'name';

// Export all constants
module.exports = {
  // Window Events
  WINDOW_LOADED,

  // Data Element Events
  DATA_ELEMET_CHANGE,

  // Condition
  DATE_RANGE_CONDITION,
  CUSTOM_CODE,
  PATH_AND_QUERYSTRING,
  PATH,

  // Custom Events
  CUSTOM_EVENT,
  CLICK_EVENT,
  SUBMIT_EVENT,

  // Custom code
  ACTION_CUSTOM_CODE,

  // API Status Codes
  HTTP_OK,
  HTTP_CREATED,
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
  HTTP_NOT_FOUND,
  HTTP_SERVER_ERROR,

  // Pagination
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,

  // Time Constants
  ONE_HOUR,
  ONE_DAY,

  // other
  DELAY_NAVIGATION,
  NAME,
  GDPR,
};
