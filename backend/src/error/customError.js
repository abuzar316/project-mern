module.exports = (msg = 'error', statusCode = 500, status = false) => {
    let data = {
        statusCode,
        status,
        msg
    }
    return data;
}


// class ErrorHandler extends Error {
//     constructor(message, statusCode, status) {
//         super(message);
//         this.message = message;
//         this.statusCode = statusCode;
//         this.status = status;
//         Error.captureStackTrace(this, this.constructor);
//     }
// }

// module.exports = ErrorHandler;




// module.exports = (msg = 'error', statusCode = 403, status = false) => {
//     let data = {
//         statusCode,
//         status,
//         msg
//     }
//     return data;
// }