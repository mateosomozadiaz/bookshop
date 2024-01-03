const books = [
    {id: 1, title: "Harry Potter y la Piedra Filosofal", author: "J.K. Rowling", section: "Fantasía", genre: "Fantasía", price: 8000},
    {id: 2, title: "Harry Potter y la Cámara Secreta", author: "J.K. Rowling", section: "Fantasía", genre: "Fantasía", price: 8000},
    {id: 3, title: "Harry Potter y el Prisionero de Azkaban", author: "J.K. Rowling", section: "Fantasía", genre: "Fantasía", price: 8000},
];

const shoppingCart = [];

function showBookList() {
    for (const book of books) {
        console.log(book.id + " | " + book.title + " (Por " + book.author + ")");
        /* Id | Titulo (Por Autor) */
    }
}

function showShoppingCart() {
    for (item of shoppingCart) {
        console.table(shoppingCart, ["title", "author", "amount", "price"])
    }
}

let keepAdding = true;
function addBookToCart() {

    let id = prompt("Ingrese el ID (número) correspondiente a el libro que desea agregar a el carrito de compras. Puede encontrar una lista con la información necesaria en la consola.");

    let bookFound = false;
    for (const book of books) {
        if (parseInt(id) == book.id) {
            bookFound = true;
            let alreadyIncluded = false;
            for (item of shoppingCart) {
                if (item.id == book.id) {
                    alreadyIncluded = true;
                    item.amount++;
                    item.price = item.price + book.price;
                    break;
                }
            }
            if (alreadyIncluded == false) {
                shoppingCart.push({id: book.id, title: book.title, author: book.author, amount: 1, price: book.price});
            }
            alert(book.title + " ha sido agregado al carrito de compras.")
            showShoppingCart();
        }
    }
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

showBookList();

while (keepAdding == true) {
    addBookToCart();
}

/* Resumen:
- Declara el array con los libros que existen en la tienda
- Declara el array que guardará los elementos del carrito de compras
- Declara una función que muestra una lista de todos los libros existentes en la consola
- Declara una función que muestra el carrito de compras en la consola
- Declara una función que:
        - Pide al usuario un ID
        - Verifica que el ID corresponda a uno de los libros (si no es así, alerta al usuario)
        - Si ya se agregó el libro a la lista de compras anteriormente, se suma 1 unidad el la clave amount
        - Si no, agrega un objeto nuevo al array 
        - Confirma si el usuario quiere agregar otro elemento al carrito
        - Muestra el carrito en la consola con la función
- Muestra una lista de todos los libros existentes en la consola mediante la función dedicada a esa tarea
- Ejecuta la función principal mientras el usuario confirme que quiere seguir agregando elementos al carrito */