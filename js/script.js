const books = [
    { title: "Harry Potter y la Piedra Filosofal", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000 },
    { title: "Harry Potter y la cámara secreta", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000 },
    { title: "Harry Potter y el prisionero de Azkaban", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000 },
    { title: "Harry Potter y el cáliz de fuego", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000 },
    { title: "Harry Potter y la orden del Fénix", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000 },
    { title: "Harry Potter y el misterio del príncipe", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000 },
    { title: "Harry Potter y las reliquias de la muerte", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000 },
    { title: "Percy Jackson y el ladrón del Rayo", author: "Rick Riordan", category: "Fantasía", genre: "Fantasía", price: 10000 },
    { title: "Percy Jackson y el mar de los Monstruos", author: "Rick Riordan", category: "Fantasía", genre: "Fantasía", price: 10000 },
    { title: "Percy Jackson y la maldición del Titán", author: "Rick Riordan", category: "Fantasía", genre: "Fantasía", price: 10000 },
    { title: "Percy Jackson y la batalla del laberinto", author: "Rick Riordan", category: "Fantasía", genre: "Fantasía", price: 10000 },
    { title: "Percy Jackson y el último Héroe del Olimpo", author: "Rick Riordan", category: "Fantasía", genre: "Fantasía", price: 10000 },
    { title: "Percy Jackson y el Caliz de los Dioses", author: "Rick Riordan", category: "Fantasía", genre: "Fantasía", price: 10000 },
    { title: "Los Juegos del Hambre", author: "Suzanne Collins", category: "Distopía", genre: "Ficción", price: 12500 },
    { title: "En llamas", author: "Suzanne Collins", category: "Distopía", genre: "Ficción", price: 12500 },
    { title: "Sinsajo", author: "Suzanne Collins", category: "Distopía", genre: "Ficción", price: 12500 },
    { title: "Balada de los Pajaros Cantores", author: "Suzanne Collins", category: "Distopía", genre: "Ficción", price: 12500 },
]; /* Declara el array con los libros en stock */

books.forEach(book => {
    book.id = books.indexOf(book)
    createBookItem(book);
    // createBookItem(book)
});
/* Asigna al ID de cada libro su valor de index */

function createBookItem(book) {
    const bookItem = document.createElement("article");

    bookItem.innerHTML = `<img src="img/books/${book.id}.png" alt="book cover"> <h6 class="book-title">${book.title}</h6> <p class="book-price">$${book.price}</p>`;

    document.querySelector("#stock").append(bookItem);
}

const shoppingCart = [];
/* Declara el array del carrito de compras */

class shoppingCartItem {
    constructor(id, title, author, amount, price) {
        this.id = id
        this.title = title
        this.author = author
        this.amount = amount
        this.price = price
    }
}
/* Declara una clase que estructura los items del carrito de compras */

function addBookToCart(book) {
    let inStock = books.some(stock => stock.id == book.id); /* Verifica si el libro está en la lista de stock */
    let inCart = shoppingCart.some(item => item.id == book.id); /* Verifica si el libro ya fue agregado al carrito de compras */

    if (inStock == true) {

        if (inCart == true) {

            let foundItem = shoppingCart.find(item => item.id == book.id);
            foundItem.amount++;
            foundItem.price = foundItem.price + book.price;

        } else {

            shoppingCart.push(new shoppingCartItem(book.id, book.title, book.author, book.amount, book.price));
        }

    } else {
        console.error("Invalid book argument");
    }
}

const shoppingCartButton = document.querySelector("#shopping-cart-button")
const shoppingCartScreen = document.querySelector("#shopping-cart")

function toggleShoppingCart() {
    shoppingCartScreen.classList.toggle("hide")
}

shoppingCartButton.addEventListener("click", toggleShoppingCart)
