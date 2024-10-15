import React, { useState, useEffect } from "react";
import axios from "axios";

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
}

const AddBook: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar libros al inicio
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  useEffect(() => {
    fetchBooks(); // Llama a fetchBooks aquí al montar el componente
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !description || !image) {
      alert("Por favor, completa todos los campos antes de enviar.");
      return;
    }
    try {
      if (editingBook) {
        // Asegúrate de que el ID sea un string
        await axios.put(
          `http://localhost:5000/api/books/${String(editingBook.id)}`,
          {
            title,
            author,
            description,
            image,
          }
        );

        setEditingBook(null); // Limpiar el estado de edición
      } else {
        // Agregar nuevo libro
        await axios.post("http://localhost:5000/api/books", {
          title,
          author,
          description,
          image,
        });
      }
      resetForm();
      await fetchBooks(); // Refrescar la lista de libros
    } catch (error) {
      console.error("Error al agregar/editar el libro:", error);
    }
  };

  // Función para restablecer el formulario
  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setImage("");
  };

  // Función para buscar un libro por título
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Seleccionar un libro para editar
  const selectBookForEditing = (book: Book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setDescription(book.description);
    setImage(book.image);
    setEditingBook(book);
  };

  // Eliminar un libro
  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      await fetchBooks(); // Refrescar la lista de libros después de eliminar
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  // Filtrar los libros según el término de búsqueda
  const filteredBooks = books.filter(
    (book) =>
      book.title && book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 m-auto bg-white rounded-lg shadow-xl max-w-7xl">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Autor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Imagen (URL)</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          {editingBook ? "Actualizar Libro" : "Agregar Libro"}
        </button>
      </form>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border rounded"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.map((book) => (
            <div key={book.id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-gray-600">Autor: {book.author}</p>
              <p>{book.description}</p>
              {book.image && (
                <img
                  src={book.image}
                  alt={book.title}
                  className="my-2"
                  style={{ width: "100px", height: "auto" }}
                />
              )}
              <button
                className="px-2 py-1 mt-2 text-white bg-yellow-500 rounded"
                onClick={() => selectBookForEditing(book)}
              >
                Editar
              </button>
              <button
                className="px-2 py-1 mt-2 text-white bg-red-500 rounded"
                onClick={() => deleteBook(book.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddBook;
