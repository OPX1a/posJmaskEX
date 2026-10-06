// 1. Food Catalog Data
const foods = [
    { id: 1, name: "Classic Cheeseburger", category: "Burgers", price: 8.99, desc: "Juicy beef patty with fresh cheddar, lettuce, and special sauce.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
    { id: 2, name: "Pepperoni Pizza", category: "Pizza", price: 12.50, desc: "Loaded with crispy pepperoni slices, mozzarella, and tomato sauce.", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500" },
    { id: 3, name: "Iced Cold Brew Coffee", category: "Drinks", price: 4.20, desc: "Smooth and refreshing freshly brewed chilled coffee.", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500" },
    { id: 4, name: "Double Bacon Burger", category: "Burgers", price: 11.00, desc: "Double layer beef, crispy bacon strips, melted cheese.", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500" },
    { id: 5, name: "Margherita Pizza", category: "Pizza", price: 10.00, desc: "Fresh basil leaves, mozzarella cheese, and authentic sauce.", img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500" },
    { id: 6, name: "Fresh Mango Smoothie", category: "Drinks", price: 5.50, desc: "Blend of tropical fresh mangoes with natural yogurt.", img: "https://images.unsplash.com/photo-1546173159-315724a31696?w=500" }
];

let cart = [];
let selectedCategory = "All";

// DOM Elements
const menuGrid = document.getElementById("menuGrid");
const searchInput = document.getElementById("searchInput");
const categoryContainer = document.getElementById("categoryContainer");
const cartSidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("overlay");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const totalPrice = document.getElementById("totalPrice");
const cartBtn = document.getElementById("cartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");
const orderModal = document.getElementById("orderModal");
const orderStatus = document.getElementById("orderStatus");
const doneModalBtn = document.getElementById("doneModalBtn");

// Render Menu
function renderMenu() {
    const searchVal = searchInput.value.toLowerCase();
    menuGrid.innerHTML = "";

    const filtered = foods.filter(food => {
        const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
        const matchesSearch = food.name.toLowerCase().includes(searchVal);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        menuGrid.innerHTML = "<p style='grid-column: 1/-1;'>No food items found.</p>";
        return;
    }

    filtered.forEach(food => {
        const card = document.createElement("div");
        card.className = "food-card";
        card.innerHTML = `
            <img src="${food.img}" alt="${food.name}" class="food-img">
            <div class="food-info">
                <div class="food-title">${food.name}</div>
                <div class="food-desc">${food.desc}</div>
                <div class="food-bottom">
                    <span class="food-price">$${food.price.toFixed(2)}</span>
                    <button class="add-btn" data-id="${food.id}">+ Add</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// Add Item to Cart
function addToCart(id) {
    const food = foods.find(f => f.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...food, quantity: 1 });
    }

    updateCartUI();
}

// Adjust Cart Quantity
function updateQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    let totalItems = 0;
    let sum = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p style='text-align: center; color: #888; margin-top: 20px;'>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            totalItems += item.quantity;
            sum += item.price * item.quantity;

            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="qty-controls">
                    <button class="qty-btn" data-action="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" data-action="increase" data-id="${item.id}">+</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    cartCount.innerText = totalItems;
    totalPrice.innerText = `$${sum.toFixed(2)}`;
}

// Toggle Cart Visibility
function toggleCart() {
    cartSidebar.classList.toggle("open");
    overlay.classList.toggle("active");
}

// Process Checkout & Simulate Order Tracking
function processCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    cart = [];
    updateCartUI();
    toggleCart();

    orderModal.classList.add("active");
    overlay.classList.add("active");

    orderStatus.innerText = "👨‍🍳 Kitchen is preparing your food...";

    setTimeout(() => {
        orderStatus.innerText = "🛵 Driver is picking up your order...";
    }, 3000);

    setTimeout(() => {
        orderStatus.innerText = "🏡 Driver is nearby!";
    }, 6000);
}

function closeModal() {
    orderModal.classList.remove("active");
    overlay.classList.remove("active");
}

// Event Listeners
categoryContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("cat-btn")) {
        document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        selectedCategory = e.target.getAttribute("data-category");
        renderMenu();
    }
});

searchInput.addEventListener("keyup", renderMenu);

menuGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        addToCart(id);
    }
});

cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("qty-btn")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        const action = e.target.getAttribute("data-action");
        updateQuantity(id, action === "increase" ? 1 : -1);
    }
});

cartBtn.addEventListener("click", toggleCart);
closeCartBtn.addEventListener("click", toggleCart);
overlay.addEventListener("click", () => {
    cartSidebar.classList.remove("open");
    closeModal();
});

checkoutBtn.addEventListener("click", processCheckout);
doneModalBtn.addEventListener("click", closeModal);

// Initial Load
renderMenu();