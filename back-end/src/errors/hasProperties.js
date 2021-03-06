const hasProperties = (...properties) => {
  return (_req, res, next) => {
    const { body } = res.locals;

    try {
      properties.forEach((property) => {
        if (body[property] === undefined) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = hasProperties;
