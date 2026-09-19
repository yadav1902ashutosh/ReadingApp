import "dotenv/config";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000;

// Listen for global server runtime errors
app.on("error", (error) => {
  console.log("SERVER ERROR: ", error);
  throw error;
});

// Start express server directly
app.listen(PORT, () => {
  console.log(`⚙️  Server is running at PORT: ${PORT}`);
});