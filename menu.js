const menuItems = {
    pasta: [
        { 
            name: "Spaghetti Carbonara",
            price: 12.99,
            imgSrc: "photo/pasta.jpg",
            description: "Lorem ipsum dolor sit amet.",
            ingredients: [
                "Spaghetti", "Eggs", "Parmesan cheese", "Bacon"],
        },
        {
            name: "Fettuccine Alfredo",
            price: 10.99,
            imgSrc: "photo/pasta2.jpg",
            description: "Lorem ipsum dolor sit amet.",
            ingredients: [
                "Fettuci pasta", 
                "Butter", 
                "Parmesan cheese", 
                "Heavy cream",
            ],
        },
        {
            name: "Penne Arrabiata",
            price: 15.99,
            imgSrc: "photo/pasta3.jpg",
            description: "Lorem ipsum dolor sit amet.",
            ingredients: ["Penne Pasta", "Tomato sauce", "Garlic", "Bacon"],
        },
    ],
    pizza: [
        {
            name: "Margarita",
            price: 7.99,
            imgSrc: "photo/pizza1.jpg",
            description: "Lorem ipsum dolor sit amet.",
            ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella cheese", "Basil",
            ], 
        },
        {
            name: "Pepperoni",
            price: 8.99,
            imgSrc: "photo/pizza2.jpg",
            description: "Lorem ipsum dolor sit amet.",
            ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella cheese", "Basil",
            ], 
        },
        {
            name: "Hawaiian",
            price: 12.99,
            imgSrc: "photo/pizza3.jpg",
            description: "Lorem ipsum dolor sit amet.",
            ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella cheese", "Basil",
            ], 
        },
    ],
    desserts: [
        {   
            name: "Tiramisu",
            price: 2.99,
            description: "Lorem ipsum dolor sit amet.",
            ingredients: ["Ladyfingers","Mascarpone cheese", "Coffe"],
        },
        {
            name: "Chocolate Lava Cake",
            price: 3.99,
            description: "Lorem ipsum dolor sit amet.",
            ingredients: ["Chocolate", "Butter","Sugar", "Eggs"],
        },
        {
            name: "Panna Cotta",
            price: 4.99,
            description: "Lorem ipsum dolor sit amet.",
            ingredients: ["Cream", "Sugar","Vanilla"],
        },
        {
            name: "Trileqe",
            price: 1.5,
            description: "Lorem ipsum dolor sit amet.",
            ingredients: ["Milk", "Caramel cream", "Eggs", "Flour"],
        },
    ],
};

function updateMenuItems() {
    const menu = document.getElementById("menu");
    const menuItemsList = document.getElementById("menu-items");

    menuItemsList.innerHTML = "";

    const menuValue = menu.value;

    const items = menuItems[menuValue];

    items.forEach((item) => {
        const li = document.createElement("li");
        const name = document.createElement("span");
        const price = document.createElement("span");
        const description = document.createElement("p");
        const ingredients = document.createElement("p");
        const addButton = document.createElement("button");

        name.textContent = item.name;
        price.textContent = `€${item.price.toFixed(2)}`;
        description.textContent =  `Description: ${item.description}`;
        ingredients.textContent = `Ingredients: ${item.ingredients.join(", ")}`;
        addButton.textContent = "+";
        addButton.setAttribute("data-name", item.name);
        addButton.setAttribute("data-price", item.price.toFixed(2));

        addButton.addEventListener("click", addToBasket);

        li.appendChild(name);
        li.appendChild(price);
        li.appendChild(description);
        li.appendChild(ingredients)
        li.appendChild(addButton);

        menuItemsList.appendChild(li)
    });

    applySearchFunctionality();
}

function applySearchFunctionality() {
    const searchInput = document.getElementById("search");
    const menuItemsList = document.getElementById("menu-items");
    const menuItems = menuItemsList.getElementsByTagName("li");


    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();

        Array.from(menuItems).forEach((item) => {
            const itemName = item.querySelector("span").textContent.toLowerCase();
            if (itemName.includes(searchTerm)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
}

function addToBasket(event) {
    const itemName = event.target.getAttribute("data-name");
    const itemPrice = parseFloat(event.target.getAttribute("data-price"));

    const basketList = document.getElementById("basket-items");
    const li = document.createElement("li");
    const name = document.createElement("span");
    const price = document.createElement("span");
    const removeButton = document.createElement("button");
    const addButton = document.createElement("button");

    name.textContent = itemName;
    price.textContent = `€${itemPrice.toFixed(2)}`;
    removeButton.textContent = "-";
    addButton.textContent = "+";
    removeButton.classList.add("remove");
    addButton.classList.add("add");
    addButton.setAttribute("data-name", itemName);
    addButton.setAttribute("data-price", itemPrice);

    removeButton.addEventListener("click", removeFromBasket);
    addButton.addEventListener("click", addToBasket);

    li.appendChild(name);
    li.appendChild(price);
    li.appendChild(removeButton);
    li.appendChild(addButton);

    basketList.appendChild(li);

    calculateTotal();
    checkMinimumOrder();

}

function removeFromBasket(event) {
    event.target.parentElement.remove();

    calculateTotal();
    checkMinimumOrder();
}

function calculateTotal() {
    const basketItems = document.querySelectorAll("#basket-items li");
    let subtotal = 0;
    let tax = 0;
    let total = 0;
    const taxRate = 0.1;

    basketItems.forEach((item) => {
        const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(3));
        subtotal += itemPrice;
    });

    tax = subtotal * taxRate;
    total = subtotal + tax;

    document.querySelector("#subtotal-price").textContent = `€${subtotal.toFixed(2)}`;
    document.querySelector("#tax-price").textContent = `€${tax.toFixed(2)}`;
    document.querySelector("#totali-price").textContent = `€${total.toFixed(2)}`;
}

function checkMinimumOrder() {
    const basketItems = document.querySelectorAll("#basket-items li");
    let subtotal = 0;

    basketItems.forEach((item) => {
        const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(3));
        subtotal += itemPrice;
    });

    const minimumOrderValue = 20.0;

    const basketMessage = document.getElementById("basket-message");
    if(subtotal < minimumOrderValue) {
        basketMessage.style.display = "block";
    } else {
        basketMessage.style.display = "none";
    }
}

checkMinimumOrder();

const menu = document.getElementById("menu");
menu.addEventListener("change", updateMenuItems);

updateMenuItems();

function calculateTotal() {
    const basketItems = document.querySelectorAll("#basket-items li");
    let subtotal = 0;
    let tax = 0;
    let total = 0;
    const taxRate = 0.1;

    basketItems.forEach((item) => {
        const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(1)
    );
    subtotal += itemPrice;
    });

    tax = subtotal * taxRate;
    total = subtotal + tax;

    document.querySelector("#subtotal-price").textContent = `€${subtotal.toFixed(2)}`;
    document.querySelector("#tax-price").textContent = `€${tax.toFixed(2)}`;
    document.querySelector("#totali-price").textContent = `€${total.toFixed(2)}`;
}

    const basketList = document.getElementById("basket-items");
    basketList.addEventListener("click", (event) => {
        if(
            event.target.classList.contains("add") || 
            event.target.classList.contains("remove")
        ) {
            calculateTotal();
        }
    });

    calculateTotal();

    var checkoutButton = document.getElementById("checkout");

    checkoutButton.addEventListener("click", function () {
        var totalPrice = parseFloat(document.getElementById("totali-price").textContent);

        var confirmation = confirm("Do you want to continue to payment?");

        if (confirmation) {
            const basketItems = document.querySelectorAll("#basket-items li");
            const orderItems = Array.from(basketItems).map((item) => {
                const itemName = item.querySelector("span:nth-child(1)").textContent;
                const itemPrice = parseFloat(item.querySelector("span:nth-child(2)").textContent.slice(3)
            );
                return { name: itemName, price: itemPrice };
            });
            window.location.href = "payment.html";
        } else {
            var basketItems = document.getElementById("basket-items");
            basketItems.innerHTML = "";
            calculateTotal();
            checkMinimumOrder();
        }
    });


