const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

/*

app.use(bodyParser.json()): This middleware parses incoming JSON requests and makes the data available on req.body.


*/

//connect to MONGODB
mongoose
  .connect(
    "mongodb+srv://jyotsnajha003:vmyvHJE4i1SOnMu1@crud-next-mongo.slaklsu.mongodb.net/?retryWrites=true&w=majority&appName=crud-next-mongo",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.error("counld not connect to mongodb", err));

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  contactNumber: String,
  message: String,
});

const FormData = mongoose.model("FormData", formSchema);

// Define the /api/home route
app.post("/api/home", async (req, res) => {
  console.log("Received form data:", req.body);

  try {
    const formData = new FormData(req.body); // Create a new instance of FormData

   // Creates a new instance of the FormData model with the data received in the request body.
    await formData.save(); // Save the form data to MongoDB

    res.status(200).json({ message: "Form received and saved!" });
  } catch (err) {
    console.error("Error saving form data:", err);
    res.status(500).json({ message: "Error saving form data" });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
