const errHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ err: 'incorrect id format' });
    } else {
      res.status(500).send({
        message: err.message || 'Internal server error.',
      });
    }
  }

  next(err);
};

module.exports = errHandler;