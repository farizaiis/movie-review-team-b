module.exports = function(err, req, res, next) {
    let statusCode;
    if(err.name === "SequelizeValidatorError") {
        statusCode = 400;
        let messages = [];

        for(let i = 0; i < err.errors.length; i++) {
            messages.push(err.errors[i].message)
        }
        res.status(statusCode).json({ statusCode, messages})
    };
};