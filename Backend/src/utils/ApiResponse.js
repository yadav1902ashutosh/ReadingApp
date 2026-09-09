class ApiResponse{
    constructor(statusCode, data, mesage = "Request was successful")
    {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode <400
    }
}

export {ApiResponse}