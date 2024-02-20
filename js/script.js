const books = [];

class stockItem {
    constructor(id, title, author, category, genre, amount, price) {
        this.id = id
        this.title = title
        this.author = author
        this.category = category
        this.genre = genre
        this.amount = amount
        this.price = price
    }
}

async function getBooks() {
    try {
        await fetch("https://mateosomozadiaz.github.io/bookshop/json/stock.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(book => {
                books.push(
                    new stockItem(
                        book.id,
                        book.title,
                        book.author,
                        book.category,
                        book.genre,
                        book.amount,
                        book.price
                    ))
            });
            books.forEach(book => {
                createBookItem(book);
            });
        })
    } catch (err) {
        console.warn("Something went wrong: " + err);
    }
}

getBooks();

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
        oldShoppingCart.forEach((item) => {
            shoppingCart.push(
                new shoppingCartItem(
                    item.id,
                    item.title,
                    item.author,
                    item.amount,
                    item.price
                )
            )
        })
    }
    updateShoppingCart();
}

getShoppingCart();

function createBookItem(book) {
    const bookItem = document.createElement("article");

    const img = document.createElement("img");
    img.src = `assets/books/${book.id}.png`;
    img.alt = "book cover";

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

    button.addEventListener("click", function () {
        addBookToCart(book);
    })

    document.querySelector("#stock").append(bookItem);
}
/* Declara una función que crea un libro en la página principal */

function addBookToCart(book) {
    let inStock = books.some((stock) => stock.id == book.id);
    /* Verifica si el libro está en la lista de stock */
    let inCart = shoppingCart.some((item) => item.id == book.id);
    /* Verifica si el libro ya fue agregado al carrito de compras */

    if (inStock == true) {
        if (inCart == true) {
            const foundItem = shoppingCart.find((item) => item.id == book.id);
            foundItem.amount++;
            foundItem.price = foundItem.price + book.price;
        } else {
            shoppingCart.push(
                new shoppingCartItem(
                    book.id,
                    book.title,
                    book.author,
                    1,
                    book.price
                )
            );
        }
        Toastify({

            text: "Agregaste " + book.title,
            
            duration: 2000,
            
            style: {
                background: "linear-gradient(to right, #b1ebf0, #94c5f2)",
            },
            
            onClick: () => {
                toggleShoppingCart();
                toggleOverlay();
            }

        }).showToast();
    } else {
        console.error("Invalid book argument");
    }
    updateShoppingCart();
}
/* Declara una función que agrega un libro al carrito de compras */

function updateShoppingCart() {
    const shoppingCartList = document.querySelector("#shopping-cart-list");
    shoppingCartList.innerHTML = "";

    shoppingCart.forEach((item) => {

        const container = document.createElement("article");

        const text = document.createElement("p");
        text.textContent = `${item.title}  ${item.author}  X${item.amount}  $${item.price}`;

        const button = document.createElement("img");
        button.src = `assets/delete.png`;
        button.addEventListener("click", () => {
            shoppingCart.splice(shoppingCart.indexOf(item), 1);
            saveShoppingCart()
            updateShoppingCart();
        })

        container.append(text);
        container.append(button);

        shoppingCartList.append(container);

        saveShoppingCart();
    })
}
/* Declara una función que actualiza la ventana que muestra el carrito de compras y guarda los datos en localStorage */

function toggleOverlay() {
    const results = document.querySelector("#overlay");
    if (results == null) {
        const overlay = document.createElement("div");
        overlay.id = "overlay";
        document.body.prepend(overlay);
        document.body.classList.add("noScroll");
    } else {
        results.remove();
        document.body.classList.remove("noScroll");
    }
}

const shoppingCartWindow = document.querySelector("#shopping-cart");

const shoppingCartButton = document.querySelector("#shopping-cart-button");
const shoppingCartCross = document.querySelector("#shopping-cart-cross");

function toggleShoppingCart() {
    shoppingCartWindow.classList.toggle("hide");
}

shoppingCartButton.addEventListener("click", () => {
    toggleShoppingCart();
    toggleOverlay();
});
shoppingCartCross.addEventListener("click", () => {
    toggleShoppingCart();
    toggleOverlay();
});


const buySection = document.querySelector("#buy-section");

const buyButton = document.querySelector("#buy-button");
const backButton = document.querySelector("#back-button");

function toggleBuySection() {
    buySection.classList.toggle("hide");
    toggleShoppingCart();
}

backButton.addEventListener("click", toggleBuySection);


const shoppingCartTrashCan = document.querySelector("#shopping-cart-trash-can");
function emptyShoppingCart() {
    Swal.fire({
        title: "¿Seguro?",
        text: "Se eliminará el contenido del carrito de compras",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#85cced",
        cancelButtonColor: "#ff8a8a",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Carrito Vacío",
                text: "Se ha vaciado el carrito de compras",
                icon: "success",
                confirmButtonColor: "#85cced"
            })

            while (shoppingCart.length > 0) {
                shoppingCart.pop()
            }
            saveShoppingCart()
            updateShoppingCart()
        }
    })
}
shoppingCartTrashCan.addEventListener("click", emptyShoppingCart);
/* Vacía el carrito de compras al presionar un botón */

function buy() {
    if (shoppingCart.length > 0) {
        const finalPrice = shoppingCart.reduce((count, current) => count + current.price, 0);
        toggleBuySection();
    } else {
        Swal.fire({
            title: "Carrito Vacío",
            text: "Aún no has agregado elementos al carrito de compras",
            icon: "error",
            confirmButtonColor: "#85cced"
        });
    }
}

buyButton.addEventListener("click", buy);

const form = document.querySelector("#form");

function getData() {
    const name = document.querySelector("#name");
    return name.value;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const name = getData();

    Swal.fire({
        title: "¡Compra Exitosa!",
        text: "La compra se ha completado con éxito, " + name + "",
        icon: "success",
        confirmButtonColor: "#85cced"
    });

    while (shoppingCart.length > 0) {
        shoppingCart.pop()
    }
    saveShoppingCart();
    updateShoppingCart();
    toggleBuySection();
    toggleShoppingCart();
    toggleOverlay();
})