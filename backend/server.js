const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Ruta para obtener los libros
app.get("/api/books", (req, res) => {
  fs.readFile("./books.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error al leer el archivo");
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para agregar un nuevo libro
app.post("/api/books", (req, res) => {
  const newBook = req.body;

  fs.readFile("./books.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error al leer el archivo");
    }

    const books = JSON.parse(data);
    newBook.id = (books.length + 1).toString(); // Generar ID único como string
    books.push(newBook);

    fs.writeFile("./books.json", JSON.stringify(books, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error al guardar el libro");
      }
      res.status(201).json(newBook);
    });
  });
});

// Ruta para actualizar un libro
app.put("/api/books/:id", (req, res) => {
  const bookId = req.params.id; // bookId como string
  const updatedBook = req.body;

  fs.readFile("./books.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error al leer el archivo");
    }

    let books = JSON.parse(data);
    const index = books.findIndex((book) => book.id === bookId); // Comparación como string

    if (index === -1) {
      return res.status(404).send("Libro no encontrado");
    }

    books[index] = { ...books[index], ...updatedBook }; // Actualiza el libro

    fs.writeFile("./books.json", JSON.stringify(books, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error al guardar el libro");
      }
      res.json(books[index]); // Devuelve el libro actualizado
    });
  });
});

// Ruta para eliminar un libro
app.delete("/api/books/:id", (req, res) => {
  const bookId = req.params.id; // bookId como string

  fs.readFile("./books.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error al leer el archivo");
    }

    let books = JSON.parse(data);
    const bookIndex = books.findIndex((book) => book.id === bookId); // Comparación como string

    if (bookIndex === -1) {
      return res.status(404).send("Libro no encontrado");
    }

    // Eliminar el libro
    books.splice(bookIndex, 1);

    fs.writeFile("./books.json", JSON.stringify(books, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Error al guardar los cambios");
      }
      res.status(204).send(); // No hay contenido que devolver
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Ruta para validar el usuario
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  fs.readFile("./users.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error al leer el archivo de usuarios");
    }

    const users = JSON.parse(data);
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  });
});
