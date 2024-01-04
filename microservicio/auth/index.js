const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../utils/error");

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret)
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);
        // console.log("decoded: ", decoded);

        // COMPORTAR SI ES O NO PROPIO
        if (decoded.id !== owner) {
            throw error("No puede editar", 401);
        }
    },
    logged: function (req, owner) {
        const decoded = decodeHeader(req);
    }
}

function getToken(auth) {
    // Bearer
    if (!auth) {
        throw error("No viene token", 401);
    }
    if (auth.indexOf('Bearer') === -1) {
        throw error("Formato invalido", 401);
    }

    let token = auth.replace("Bearer", '');

    return token;
}

function verify(token) {
    return jwt.verify(token, secret);
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decode = verify(token.trim());
    req.user = decode
    return decode;
}

module.exports = {
    sign,
    check
}