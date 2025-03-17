const express = require("express"); // Import Express framework
const cors = require("cors");
const path = require("path"); // Helps with file paths
require("dotenv").config(); // Load environment variables

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 8080; // Use environment variable or default to 8080

app.use(cors());
app.use(express.json()); // Middleware to handle JSON data
app.use(express.urlencoded({ extended: true })); // Middleware to handle form data

// Function to generate folder name based on user input
function createFolderName(answers) {
    answers = answers.map(answer => answer !== "" ? answer : "XXX"); // Replace empty fields with "XXX"
    return answers.join("_").toUpperCase().replace(/\s/g, ""); // Format and remove spaces
}

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public")));


// Handle form submission
app.post("/", (req, res) => {
    const answers = [
        req.body.Modelo,
        req.body.Litragem,
        req.body.Potencia,
        req.body.Ano,
        req.body.Transmissao,
        req.body.Placa,
        req.body.Cliente
    ];
    const folderName = createFolderName(answers);
    res.json({ folder_name: folderName }); // Return JSON response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
