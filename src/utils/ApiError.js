class ApiError extends Error {
    constructor(
        //extend Error:- means APIerror inherits everything from js built-in-Error class.
        statusCode,
        message= "Something went wrong",
        error = [],
        stack = ""
        //Api's usually need more information,such as
        //http status code, error message, success status, validation errors, stack trace.
        //Instead of using normal error, we create our own class called ApiError.

    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = error

        /*super(message): This calls the parent Error class constructor and passes the message to it. It's required when you extend a class.
this.statusCode: Stores the HTTP status code so your global error-handling middleware knows what HTTP response to send to the client.
this.data = null: APIs typically return data on success. Since this is an error, data is explicitly set to null.
this.success = false: A handy flag for frontend developers to instantly check if the API request succeeded or failed.
this.errors = errors: Assigns the array of detailed errors to the instance.
Even though you already called super(message), explicitly setting this.message = message acts as a safety net. 
It ensures that the message property is directly and reliably attached to your specific ApiError instance.

        */

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)

        }
    }
}

//If you pass a specific stack trace, it uses it. 
// If no stack trace is passed, this built-in V8 engine method automatically finds exactly where the error occurred in your codebase. 
// It attaches that file path and line number to this.stack, but it excludes this constructor function itself so the logs stay clean.


export{ApiError}


//Custom error handling class and main purpose is to send error messages across your API, instead of throwing random strings or standard text errors.