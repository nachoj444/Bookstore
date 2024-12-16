import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer"; // Ensure multer is imported
import path from "path";     // For file path management
import dotenv from "dotenv";


const app = express();

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Nacho110403!",
//     database: "test",
// });
const dbUrl = process.env.JAWSDB_URL;
if (!dbUrl) {
  console.error("JAWSDB_URL environment variable is not set.");
  process.exit(1);
}

const db = mysql.createConnection({
  host: dbUrl.split('@')[1].split(':')[0],  // Extract host
  user: dbUrl.split(':')[1].split('//')[1],  // Extract user
  password: dbUrl.split(':')[2].split('@')[0],  // Extract password
  database: dbUrl.split('/')[3]  // Extract database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to JawsDB MySQL database.");
});

app.use(express.json());
app.use(cors());

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads"); // Specify the destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
    }
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads")); // Serve the uploads folder

// Route to handle file uploads
app.post("/upload", upload.single("cover"), (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json("No file uploaded.");
    res.json({ imageUrl: `/uploads/${file.filename}` });
});

app.get("/", (req, res) => {
    res.json("hello this is the backend");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books(`title`, `description`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created successfully.");
    });
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted successfully.");
    });
});

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been updated successfully.");
    });
});

const PORT = process.env.PORT || 8800; // Use the port provided by Heroku or default to 8800 locally

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

