import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
    const[books,setBooks] = useState([]);

    useEffect(()=>{
        const fetchAllBooks = async() =>{
            try{
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllBooks();
    },[]);
    const handleDelete = async(id)=>{
        try{
            await axios.delete("http://localhost:8800/books/" +id)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
    }
const BASE_URL = "http://localhost:8800";  // Define the base URL

return (
    <div>
        <h1>Nacho's Book Shop</h1>
        <div className="books">
            {books.map((book) => (
                <div key={book.id} className="book">
                    {book.cover && (
                        <img 
                            src={`${BASE_URL}${book.cover}`}  // Use the full URL for the image
                            alt={book.title} 
                            style={{ width: '200px', height: '300px' }} 
                        />
                    )}
                    <h2>{book.title}</h2>
                    <p>{book.description}</p>
                    <span>${book.price}</span>
                    <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                    <button className="update">
                        <Link to={`/update/${book.id}`} style={{ color: "inherit", textDecoration: "none" }}>Update</Link>
                    </button>
                </div>
            ))}
        </div>
        <button className="addBookButton">
            <Link to="/add">Add new book</Link>
        </button>
    </div>
);


}
export default Books