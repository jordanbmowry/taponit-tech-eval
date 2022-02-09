const passDownBodyToPipeline = (req, res, next) => {
  const body = req.body.data ?? req.body;
  res.locals.body = body;
  next();
};

module.exports = passDownBodyToPipeline;
