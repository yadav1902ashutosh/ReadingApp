import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {ApiResponse} from "../utils/apiResponse.js";

const generateAccessandRefreshTokens = async (userId) => {
    try {

        // finding the user in DB
        const user = await User.findById(userId);

        //generating the AccessToken for the user
        const accessToken = user.generateAccessToken()

        //generating the refreshToken for the user
        const refreshToken = user.generateRefreshToken()

        //saving the generated refreshToken for the user in DB and disabling the updation of all the other fields
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        //returning the generated tokens
        return {accessToken, refreshToken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the refresh and access tokens")
    }
}


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
return res.stausd(201).json(
    new ApiResonse(
        200, createdUser, "User was refgister successfully"
    )
)   

})


const loginUser = asyncHandler(async (req, res) => {

    // req body -> data

    const {email,username, password} = {...req.body}

    // check if the user has provided either email or username
    if(!email && !username)
    {
        throw new ApiError(400, "Email or username is required");
    }

    // check if the user has provided password  
    if(!password)
    {
        throw new ApiError(400, "Password is required");
    }

    // check if the user exists in the database

    const user = await User.findOne({
        $or: [{email}, {username}]
    })

    if(!user)
    {
        throw new ApiError(404, "User not found");
    }

    //check if the password is correct
    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid)
    {
        throw new ApiError(401, "Invalid password");
    }

    // generating and storing the access and refresh tokens for the user

    const {accessToken, RefreshToken} = await generateAccessandRefreshTokens(user._id);

    //querying the updated user from DB to return in the response and removing password and  refreshtoken from it

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    //configuring options for the cookies

    const options = {
        httpOnly: true,
        secure: true
    }


    //returning the response
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "user logged in successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req,res) =>{
    
    //updating the user and removing the refreshtoken from the database
    await User.findByIdAndUpdate(
        request.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            returnDocument: "after"
        }
    )

    // consfiguring options for cookies
    const options = {
        httpOnly: true,
        secure: true
    }

    //returning the response and clearing user cookies

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
}