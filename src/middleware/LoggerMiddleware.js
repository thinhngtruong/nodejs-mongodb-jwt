const morgan = require('morgan');

// Request body logger
morgan.token('req-body', (req) => JSON.stringify(req.body));

const logger = morgan(':method :url :status :res[content-length] - :response-time ms :req-body');

module.exports = logger;