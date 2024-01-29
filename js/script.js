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
    book.id = books.indexOf(book);
    createBookItem(book);
});
/* Asigna al ID de cada libro su valor de index */

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

function saveShoppingCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

function getShoppingCart() {
    let oldShoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
    if (oldShoppingCart) {
        oldShoppingCart.forEach(item => {
            shoppingCart.push(new shoppingCartItem(item.id, item.title, item.author, item.amount, item.price));
        });
    }
    updateShoppingCart();
}

getShoppingCart();

function createBookItem(book) {
    const bookItem = document.createElement("article");

    const img = document.createElement("img");
    img.src = `img/books/${book.id}.png`;
    img.alt = "book cover"

    const button = document.createElement("button");
    button.textContent = "Agregar";

    const title = document.createElement("h6");
    title.textContent = book.title;
    title.className = "book-title";

    const price = document.createElement("p");
    price.textContent = `$${book.price}`;
    price.className = "book-price";

    bookItem.append(img);
    bookItem.append(button);
    bookItem.append(title);
    bookItem.append(price);

    img.addEventListener("click", function() {
        console.log(`(${book.title}) -- Hiciste click en un libro. En un futuro, eso abrirá una ventana con detalles sobre él.`);
    });

    button.addEventListener("click", function() {
        addBookToCart(book);
    });

    document.querySelector("#stock").append(bookItem);
}
/* Declara una función que crea un libro en la página principal */

function addBookToCart(book) {
    let inStock = books.some(stock => stock.id == book.id); /* Verifica si el libro está en la lista de stock */
    let inCart = shoppingCart.some(item => item.id == book.id); /* Verifica si el libro ya fue agregado al carrito de compras */

    if (inStock == true) {

        if (inCart == true) {

            let foundItem = shoppingCart.find(item => item.id == book.id);
            foundItem.amount++;
            foundItem.price = foundItem.price + book.price;

        } else {

            shoppingCart.push(new shoppingCartItem(book.id, book.title, book.author, 1, book.price));
        }

    } else {
        console.error("Invalid book argument");
    }
    updateShoppingCart();
}
/* Declara una función que agrega un libro al carrito de compras */

function updateShoppingCart() {
    const shoppingCartList = document.querySelector("#shopping-cart-list");
    shoppingCartList.innerHTML = "";

    shoppingCart.forEach(item => {
        const hr1 = document.createElement("hr");

        const container = document.createElement("article");

        const element = document.createElement("p");
        element.textContent = `${item.title} | ${item.author} | X${item.amount} | $${item.price}`;

        const hr2 = document.createElement("hr");

        container.append(hr1);
        container.append(element);
        container.append(hr2);

        shoppingCartList.append(container);

        saveShoppingCart();
    })
}
/* Declara una función que actualiza la ventana que muestra el carrito de compras y guarda los datos en localStorage */

const shoppingCartWindow = document.querySelector("#shopping-cart");

const shoppingCartButton = document.querySelector("#shopping-cart-button");
const shoppingCartCross = document.querySelector("#shopping-cart-cross");

function toggleShoppingCart() {
    shoppingCartWindow.classList.toggle("hide");
}
shoppingCartButton.addEventListener("click", toggleShoppingCart);
shoppingCartCross.addEventListener("click", toggleShoppingCart);
/* Muestra/Oculta el carrito de compras al presionar un botón u otro */


const shoppingCartTrashCan = document.querySelector("#shopping-cart-trash-can");
function emptyShoppingCart() {
    while (shoppingCart.length > 0) {
        shoppingCart.pop();
    }
    saveShoppingCart();
    updateShoppingCart();
}
shoppingCartTrashCan.addEventListener("click", emptyShoppingCart);
/* Vacía el carrito de compras al presionar un botón */