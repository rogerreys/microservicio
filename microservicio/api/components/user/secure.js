const auth = require('../../../auth');
const error = require('../../../utils/error');

module.exports = function checkAuth(action) {
    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                const owner = req.body.id;
                auth.check.own(req, owner);
                next(); // Si no da error, ejecuta el siguiente codigo
                break;
            case 'upsert':
                if (req.body.name!==null && req.body.username!=null && req.body.password!=null){
                    next()
                } else{
                    throw error("No existe el nombre", 401);
                }
                break;
            default:
                next()
        }
    }
    return middleware
}