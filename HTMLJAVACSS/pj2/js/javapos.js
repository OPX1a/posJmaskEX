// Add an image path or URL for each product
const products = [
    { id: 1, name: 'Espresso', price: 2.50, category: 'drinks', image: 'HTMLJAVACSS/pj2/assets/images/espresso.jpg' },
    { id: 2, name: 'Iced Latte', price: 3.50, category: 'drinks', image: 'HTMLJAVACSS/pj2/assets/images/latte.png' },
    { id: 3, name: 'Green Tea', price: 3.00, category: 'drinks', image: 'images/greentea.jpg' },
    { id: 4, name: 'Potato Chips', price: 1.50, category: 'snacks', image: 'images/chips.jpg' },
    { id: 5, name: 'Chocolate Bar', price: 1.20, category: 'snacks', image: 'images/chocolate.jpg' },
    { id: 6, name: 'Croissant', price: 2.80, category: 'bakery', image: 'images/croissant.jpg' },
    { id: 7, name: 'Blueberry Muffin', price: 2.50, category: 'bakery', image: 'images/muffin.jpg' },
    { id: 8, name: 'Sandwich', price: 4.50, category: 'bakery', image: 'images/sandwich.jpg' }
];
let cart = [];
const TAX_RATE = 0.10;

window.onload = () => {
    displayProducts(products);
};

// Update the renderer to display images
function displayProducts(items) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => addToCart(product.id);
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">$${product.price.toFixed(2)}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterCategory(category, event) {
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    if (event) event.target.classList.add('active');

    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

function filterProducts() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
}

function addToCart(productId) {
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.qty += 1;
    } else {
        const product = products.find(p => p.id === productId);
        cart.push({ ...product, qty: 1 });
    }
    updateCartUI();
}

function changeQty(productId, amount) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty += amount;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== productId);
        }
    }
    updateCartUI();
}

function clearCart() {
    cart = [];
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg">No items added yet.</p>';
    } else {
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>$${item.price.toFixed(2)} x ${item.qty} = $${(item.price * item.qty).toFixed(2)}</span>
                </div>
                <div class="cart-controls">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            `;
            container.appendChild(itemElement);
        });
    }

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    document.getElementById('subtotal-val').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax-val').innerText = `$${tax.toFixed(2)}`;
    document.getElementById('total-val').innerText = `$${total.toFixed(2)}`;
}

function openPaymentModal() {
    if (cart.length === 0) {
        alert("Please add items to cart first!");
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) * (1 + TAX_RATE);
    document.getElementById('modal-total').innerText = `$${total.toFixed(2)}`;
    document.getElementById('cash-received').value = '';
    document.getElementById('change-val').innerText = '$0.00';
    document.getElementById('payment-modal').style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

function calculateChange() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) * (1 + TAX_RATE);
    const cash = parseFloat(document.getElementById('cash-received').value) || 0;
    const change = cash - total;
    document.getElementById('change-val').innerText = `$${Math.max(0, change).toFixed(2)}`;
}

function processPayment() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) * (1 + TAX_RATE);
    const cash = parseFloat(document.getElementById('cash-received').value) || 0;

    if (cash < total) {
        alert("Cash amount is less than total amount!");
        return;
    }

    document.getElementById('receipt-date').innerText = new Date().toLocaleString();
    const itemsContainer = document.getElementById('receipt-items');
    itemsContainer.innerHTML = '';
    cart.forEach(item => {
        itemsContainer.innerHTML += `<div class="receipt-row"><span>${item.name} x${item.qty}</span><span>$${(item.price * item.qty).toFixed(2)}</span></div>`;
    });

    document.getElementById('receipt-total').innerText = `$${total.toFixed(2)}`;
    document.getElementById('receipt-cash').innerText = `$${cash.toFixed(2)}`;
    document.getElementById('receipt-change').innerText = `$${(cash - total).toFixed(2)}`;

    closePaymentModal();
    window.print();
    clearCart();
}