export const ENV = {
  API_URL: window.__ENV__?.REACT_APP_API_URL || process.env.REACT_APP_API_URL,
  LOG_LEVEL: window.__ENV__?.REACT_APP_LOG_LEVEL || process.env.REACT_APP_LOG_LEVEL,
};
