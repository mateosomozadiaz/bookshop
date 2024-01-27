const books = [
    {title: "Harry Potter y la Piedra Filosofal", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000},
    {title: "Harry Potter y la cámara secreta", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000},
    {title: "Harry Potter y el prisionero de Azkaban", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000},
    {title: "Harry Potter y el cáliz de fuego", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000},
    {title: "Harry Potter y la orden del Fénix", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000},
    {title: "Harry Potter y el misterio del príncipe", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000},
    {title: "Harry Potter y las reliquias de la muerte", author: "J.K. Rowling", category: "Fantasía", genre: "Fantasía", price: 8000},
    {title: "Percy Jackson y el ladrón del Rayo", author: "Rick Riordan", category: "Fantasía", genre: "Fantasía", price: 10000},
    {title: "Percy Jackson y el mar de los Monstruos", author: "Rick Riordan", category: "Fantasía", genre: "Fantasía", price: 10000},
    {title: "Percy Jackson y la maldición del Titán", author: "Rick Riordan", category: "Fantasía", genre: "Fantasía", price: 10000},
    {title: "Percy Jackson y la batalla del laberinto", author: "Rick Riordan", category: "Fantasía", genre: "Fantasía", price: 10000},
    {title: "Percy Jackson y el último Héroe del Olimpo", author: "Rick Riordan", category: "Fantasía", genre: "Fantasía", price: 10000},
    {title: "Percy Jackson y el Caliz de los Dioses", author: "Rick Riordan", category: "Fantasía", genre: "Fantasía", price: 10000},
    {title: "Los Juegos del Hambre", author: "Suzanne Collins", category: "Distopía", genre: "Ficción", price: 12500},
    {title: "En llamas", author: "Suzanne Collins", category: "Distopía", genre: "Ficción", price: 12500},
    {title: "Sinsajo", author: "Suzanne Collins", category: "Distopía", genre: "Ficción", price: 12500},
    {title: "Balada de los Pajaros Cantores", author: "Suzanne Collins", category: "Distopía", genre: "Ficción", price: 12500},
]; /* - Declara el array con los libros que existen en la tienda */

books.forEach(book => {
    book.id = books.indexOf(book)
})
/* Le asigna a cada libro un ID que será igual al index, pero que no cambiará dependiendo del orden */


const shoppingCart = [];
/* - Declara el array que guardará los elementos del carrito de compras */

class shoppingCartItem {
    constructor(id, title, author, amount, price) {
        this.id = id
        this.title = title
        this.author = author
        this.amount = amount
        this.price = price
    }
}

function showBookStock() {
    books.forEach(book => {
        console.log(book.id + " | " + book.title + " (Por " + book.author + ")");
        /* Id | Titulo (Por Autor) */
    })
}
/* - Declara una función que muestra una lista de todos los libros existentes en la consola */


function showShoppingCart() {
        console.table(shoppingCart, ["title", "author", "amount", "price"])
}
/* - Declara una función que muestra el carrito de compras en la consola */


let keepAdding = true;
function addBookToCart(id) {

    let bookFound = false;

    books.forEach(function(book) {
        if (parseInt(id) == book.id) {
            bookFound = true;
            let alreadyIncluded = shoppingCart.some(item => item.id == book.id);
            
            if (alreadyIncluded == true) {
                let item = shoppingCart.find(function(item) {
                    return item.id == book.id
                })
                item.amount++;
                item.price = item.price + book.price;
            }

            if (alreadyIncluded == false) {
                shoppingCart.push(new shoppingCartItem(book.id, book.title, book.author, 1, book.price));
            }

            alert(book.title + " ha sido agregado al carrito de compras.");
            showShoppingCart();
        }
    })
    
    if (bookFound == false) {
        if (id == "") {
            alert("No deje el espacio vacío.");
        } else {
            alert("Ingrese un Id (número) válido.");
        }
    }
   

    if (confirm("¿Deseas agregar otro libro al carrito de compras?") == true) {
        keepAdding = true;
    } else {
        keepAdding = false;
    }
}
/* - Declara una función addBookToCart() que:
        - Verifica que el ID corresponda a uno de los libros (si no es así, alerta al usuario)
        - Si ya se agregó el libro a la lista de compras anteriormente, se suma 1 unidad el la clave amount
        - Si no, agrega un objeto nuevo al array 
        - Confirma si el usuario quiere agregar otro elemento al carrito
        - Muestra el carrito en la consola con la función */


showBookList();
/* - Muestra una lista de todos los libros existentes en la consola mediante la función dedicada a esa tarea */


while (keepAdding == true) {
    addBookToCart(prompt("Ingrese el ID (número) correspondiente a el libro que desea agregar a el carrito de compras. Puede encontrar una lista con la información necesaria en la consola."));
}
/* - Ejecuta la función addBookToCart() mientras el usuario confirme que quiere seguir agregando elementos al carrito */