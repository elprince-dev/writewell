// utils/applyMiddleware.js
export const applyMiddleware = (handler, ...middlewares) => {
  return async (req, res) => {
    for (const middleware of middlewares) {
      await new Promise((resolve, reject) => {
        middleware(req, res, (result) => {
          if (result instanceof Error) {
            return reject(result);
          }
          return resolve(result);
        });
      });
    }
    return handler(req, res);
  };
};
