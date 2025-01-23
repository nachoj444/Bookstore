import React, { useState } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
    const [book, setBook] = useState({
        title: "",
        description: "",
        price: null,
        cover: ""
    });
    const [file, setFile] = useState(null);  // <-- To handle image file input

    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);  // <-- Capture the image file
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            let coverUrl = book.cover;

            // If there is a new image file, upload it
            if (file) {
                const formData = new FormData();
                formData.append("cover", file);
                const uploadRes = await axios.post("http://host:8800/upload", formData);
                coverUrl = uploadRes.data.imageUrl;  // Get the uploaded image URL
            }

            // Update the book with the new or existing cover URL
            await axios.put(`http://localhost:8800/books/${bookId}`, {
                ...book,
                cover: coverUrl
            });

            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form'>
            <h1>Update Book</h1>
            <input type="text" placeholder="title" onChange={handleChange} name="title" />
            <input type="text" placeholder="description" onChange={handleChange} name="description" />
            <input type="number" placeholder="price" onChange={handleChange} name="price" />
            <input type="file" onChange={handleFileChange} />
            <button className='formButton' onClick={handleClick}>Update</button>
        </div>
    );
};

export default Update;
