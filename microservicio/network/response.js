exports.sucess = (req,res, message, status)=>{
    let statusCode = status || 200;
    let statusMessage = message  || '';

    res.status(status).send({
        error: false,
        status: status,
        body: statusMessage,
    })
}
exports.error = (req,res, message, status)=>{
    let statusCode = status || 500;
    let statusMessage = message  || 'Internal Server Error';

    res.status(status).send({
        error: false,
        status: statusCode,
        body: statusMessage,
    })
}