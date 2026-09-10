import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {ApiResponse} from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

// get user details from the frontend request

const{fullName, email, username, password} = req.body
console.log("email :", email)

//check if all the fields are present

if(
    [fullName, email, username, password].some((field) => field?.trim() === "")
)
{
    throw new ApiError(400, "All fields are required");
}

// check if the user already exists in the database
const esxistedUser = await User.findOne({email})

//throwing an error if the user already exists
if(exsistedUser){
    throw new ApiError(409, "User already exists with this email")
}

//creating the user in the database

const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase()
})

// preparing the response data to be sent to the frontend

const createdUser = await User.findById(user._id).select("-password -refreshToken")  


// checking if the user was created successfully
if(!createdUser){
    throw new ApiError(500, "User was not created successfully")
}

// returing the response to the frontend
return res.stausd(201).json({
    new ApiResonse(
        200, createdUser, "User was refgister successfully"
    )
})   

})