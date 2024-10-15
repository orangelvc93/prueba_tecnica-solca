import React, { useState } from "react";
import booksData from "../books.json";

const BookList: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  // Filtrar los libros en función de la búsqueda
  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="m-auto  max-w-7xl">
      <h1 className="text-3xl font-bold text-center uppercase text-slate-600 mb-7">
        Biblioteca Completa
      </h1>
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded-md shadow-sm "
        placeholder="Buscar libros..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredBooks.map((book) => (
          <div key={book._id} className="p-4 bg-white rounded-md shadow-xl">
            <img
              src={book.image}
              alt={book.title}
              className="object-cover w-full h-48 mb-2 rounded"
            />
            <h3 className="text-xl font-semibold text-slate-800">
              {book.title}
            </h3>
            <p className="text-sm font-thin text-gray-700">{book.author}</p>
            <p className="text-gray-600">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
