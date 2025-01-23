import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
        cover: ""
    });
    const [file, setFile] = useState(null);// <-- To store the uploaded image

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);// <-- Store selected image file
    };

    const handleClick = async (e) => {
        e.preventDefault();
        console.log("Add button clicked");// Should log when button is clicked
    
        try {
            let coverUrl = "";
            if (file) {
                console.log("File selected:", file);// Debugging check
                const formData = new FormData();
                formData.append("cover", file);
                const uploadRes = await axios.post("http://localhost:8800/upload", formData);
                coverUrl = uploadRes.data.imageUrl;
                console.log("Uploaded image URL:", coverUrl);// Log the URL
            }
            await axios.post("http://localhost:8800/books", {
                ...book,
                cover: coverUrl
            });
            console.log("Book added:", { ...book, cover: coverUrl });// Log the book data
            navigate("/");
        } catch (err) {
            console.log("Error adding book:", err);// Log any errors
        }
    };
    

    return (
        <div className="form">
            <h1>Add New Book</h1>
            <input type="text" placeholder="title" onChange={handleChange} name="title" />
            <input type="text" placeholder="author" onChange={handleChange} name="description" />
            <input type="number" placeholder="price" onChange={handleChange} name="price" />
            <input type="file" onChange={handleFileChange} /> 
            <button 
               type="button" 
               className="formButton" 
               onClick={(e) => { 
                   console.log("Inline click handler triggered"); 
                   handleClick(e); 
               }}>
               Add
            </button>
        </div>
    );
};

export default Add;