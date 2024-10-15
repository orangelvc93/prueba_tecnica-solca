import React, { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
}

const Library: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/books");

        // Asegúrate de que la respuesta sea un array
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error("La respuesta no es un array:", response.data);
        }
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 mx-auto max-w-7xl">
      <input
        type="text"
        placeholder="Buscar libros..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => {
            console.log(book.id); // Verifica si los ID están definidos y son únicos
            return (
              <div key={book.id} className="p-4 border rounded shadow">
                <img src={book.image} alt={book.title} className="mb-2" />
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-gray-600">Autor: {book.author}</p>
                <p>{book.description}</p>
              </div>
            );
          })
        ) : (
          <p>No se encontraron libros.</p>
        )}
      </div>
    </div>
  );
};

export default Library;
