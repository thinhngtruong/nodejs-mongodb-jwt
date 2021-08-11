const unknownEndpoint = (req, res) => {
  res.status(404).send({ message: 'Unknown endpoint.' });
};

const errHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err) {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Incorrect id format.' });
    } else if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    else {
      res.status(500).send({
        message: err.message || 'Internal server error.',
      });
    }
  }

  next(err);
};

module.exports = { errHandler, unknownEndpoint };