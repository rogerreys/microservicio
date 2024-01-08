const auth = require('../../../auth');
const error = require('../../../utils/error');

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch (action) {
            case 'add':
                auth.check.logged(req);
                next(); // Si no da error, ejecuta el siguiente codigo
                break;
            default:
                next()
        }
    }
    return middleware
}