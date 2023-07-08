//Error Handler Class

class ErrorHandler extends Error{// inheritance is used here where Error is parent class and ErrorHandler is child class
    constructor(message, statusCode){ // constructor of errorHandler and recieves 2 things
        super(message);// it is the constructor of the parent class i.e. Error and we need to pass message to parent class.
        this.statusCode = statusCode

        console.log(this.message)
        // Error.captureStackTrace(this, this.constructor) //captureStackTrace is the function of error class and it gives the
        //stack from where or which file and line the error is originated.
    }

}

module.exports = ErrorHandler