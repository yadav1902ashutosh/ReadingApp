import "dotenv/config";
import connectDB from "./db/index.js"
import {app} from "./app.js"

connectDB()
.then( () => {
    //listening for an event i.e error
    app.on("error", (error) => {
        console.log("EROR: ",error);
        throw error
    })

    //listening to the port
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is listening to PORT: ${process.env.PORT}`)
    })
}
)
.catch((error) => {
    console.log("MongoDB Connection Failed !!!", error)
})