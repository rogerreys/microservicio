const resp = require('./response');

function errors(err, req, res, next){
    console.error('[ERROR]',err);

    const message = err.message || 'Error interno';
    const status = res.statusCode || '500';

    resp.error(req, res, message, status)
}

module.exports = errors;