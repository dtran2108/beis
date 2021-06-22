const apiAction = (method = 'post') => (
  type,
  url,
  body = {},
  withToken = false,
  async = true,
  ctx = null,
  headerParams = {},
  version = 'v1',
  footer
) => {
  return {
    type,
    meta: {
      method,
      path: url,
      body,
      async,
      withToken,
      ctx,
      headerParams,
      version,
      footer
    }
  };
};

export const defaultAction = (type, payload = {}) => ({
  type,
  payload
});

export default apiAction;
