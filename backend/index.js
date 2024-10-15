// import express from "express";
// import mysql from "mysql2";
// import cors from "cors";
// import multer from "multer";//
// import path from "path";//

// const app = express()

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Nacho110403!",
//     database: "test",
// })

// app.use(express.json());
// app.use(cors());

// //
// // Setup multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));  // Unique filename
//     }
// });

// const upload = multer({ storage });

// app.use("/uploads", express.static("uploads")); // Serve uploaded files

// // Route to handle file uploads
// app.post("/upload", upload.single("cover"), (req, res) => {
//     const file = req.file;
//     if (!file) return res.status(400).json("No file uploaded.");
//     res.json({ imageUrl: `/uploads/${file.filename}` });
// });
// //

// app.get("/", (req,res)=>{
//     res.json("hello this is the backend")
// });
// app.get("/books", (req,res)=>{
//     const q = "SELECT * FROM books";
//     db.query(q,(err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })
// app.post("/books", (req,res)=>{
//     const q = "INSERT INTO books(`title`, `description`, `price`,`cover`) VALUES (?)";
//     const values = [
//         req.body.title,
//         req.body.description,
//         req.body.price,
//         req.body.cover,
//     ];
    
//     db.query(q,[values], (err,data)=>{
//         if(err) return res.json(err);
//         return res.json("Book has been created successfully.");
//     })
// })
// app.delete("/books/:id", (req,res) =>{
//     const bookId = req.params.id;
//     const q = "DELETE FROM books WHERE id = ?";
    
//     db.query(q,[bookId], (err,data)=>{
//         if(err) return res.json(err);
//         return res.json("Book has been deleted successfully.");
//     })
// })
// app.put("/books/:id", (req,res) =>{
//     const bookId = req.params.id;
//     const q = "UPDATE books SET `title` = ?, `description` = ?, `price` = ?,`cover` = ? WHERE id = ?";
    
//     const values = [
//         req.body.title,
//         req.body.description,
//         req.body.price,
//         req.body.cover,
//     ]
    
//     db.query(q,[...values,bookId], (err,data)=>{
//         if(err) return res.json(err);
//         return res.json("Book has been updated successfully.");
//     })
// })
// app.listen(8800, ()=>{
//     console.log("Connected to backend")
// })
import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer"; // Ensure multer is imported
import path from "path";     // For file path management

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nacho110403!",
    database: "test",
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

app.listen(8800, () => {
    console.log("Connected to backend");
});
