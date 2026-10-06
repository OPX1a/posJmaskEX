
const products = [
    { id: 1, name: 'Espresso',         price: 2.50, category: 'drinks', image: 'images/espresso.jpg'   },
    { id: 2, name: 'Iced Latte',       price: 3.50, category: 'drinks', image: 'images/latte.jpg'      },
    { id: 3, name: 'Green Tea',        price: 3.00, category: 'drinks', image: 'images/greentea.jpg'   },
    { id: 4, name: 'Potato Chips',     price: 1.50, category: 'snacks', image: 'images/chips.jpg'      },
    { id: 5, name: 'Chocolate Bar',    price: 1.20, category: 'snacks', image: 'images/chocolate.jpg'  },
    { id: 6, name: 'Croissant',        price: 2.80, category: 'bakery', image: 'images/croissant.jpg'  },
    { id: 7, name: 'Blueberry Muffin', price: 2.50, category: 'bakery', image: 'images/muffin.jpg'     },
    { id: 8, name: 'Sandwich',         price: 4.50, category: 'bakery', image: 'images/sandwich.jpg'   }
];

let cart = [];
let currentCategory = 'all';
const TAX_RATE = 0.10;


const NO_IMAGE = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200"><rect width="100%" height="100%" fill="#e2e8f0"/>' +
    '<text x="50%" y="50%" fill="#64748b" font-family="sans-serif" font-size="18" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>'
);

const toCents = n => Math.round(n * 100);
const money = cents => `$${(cents / 100).toFixed(2)}`;

function getTotals() {
    const subtotal = cart.reduce((sum, i) => sum + toCents(i.price) * i.qty, 0);
    const tax = Math.round(subtotal * TAX_RATE);
    return { subtotal, tax, total: subtotal + tax };
}

window.onload = () => {
    displayProducts(products);
    document.getElementById('cash-received').addEventListener('keydown', e => {
        if (e.key === 'Enter') processPayment();
    });
};

function displayProducts(items) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = '<p class="no-results">No products found.</p>';
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => addToCart(product.id);
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" loading="lazy"
                     onerror="this.onerror=null; this.src='${NO_IMAGE}'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">$${product.price.toFixed(2)}</div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function applyFilters() {
    const query = document.getElementById('search-input').value.trim().toLowerCase();
    const filtered = products.filter(p =>
        (currentCategory === 'all' || p.category === currentCategory) &&
        p.name.toLowerCase().includes(query)
    );
    displayProducts(filtered);
}

function filterCategory(category, event) {
    currentCategory = category;
    document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
    applyFilters();
}

function filterProducts() {
    applyFilters();
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
        if (item.qty <= 0) cart = cart.filter(i => i.id !== productId);
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
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>$${item.price.toFixed(2)} x ${item.qty} = ${money(toCents(item.price) * item.qty)}</span>
                </div>
                <div class="cart-controls">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            `;
            container.appendChild(el);
        });
    }

    const { subtotal, tax, total } = getTotals();
    document.getElementById('subtotal-val').innerText = money(subtotal);
    document.getElementById('tax-val').innerText = money(tax);
    document.getElementById('total-val').innerText = money(total);
}

function openPaymentModal() {
    if (cart.length === 0) {
        alert('Please add items to cart first!');
        return;
    }
    document.getElementById('modal-total').innerText = money(getTotals().total);
    document.getElementById('cash-received').value = '';
    document.getElementById('change-val').innerText = '$0.00';
    document.getElementById('payment-modal').style.display = 'flex';
    document.getElementById('cash-received').focus();
}

function closePaymentModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

function calculateChange() {
    const cash = toCents(parseFloat(document.getElementById('cash-received').value) || 0);
    document.getElementById('change-val').innerText = money(Math.max(0, cash - getTotals().total));
}

function processPayment() {
    const { subtotal, tax, total } = getTotals();
    const cash = toCents(parseFloat(document.getElementById('cash-received').value) || 0);

    if (cart.length === 0) return;
    if (cash < total) {
        alert('Cash amount is less than total amount!');
        return;
    }

    document.getElementById('receipt-date').innerText = new Date().toLocaleString();
    document.getElementById('receipt-items').innerHTML = cart.map(item =>
        `<div class="receipt-row"><span>${item.name} x${item.qty}</span><span>${money(toCents(item.price) * item.qty)}</span></div>`
    ).join('');

    document.getElementById('receipt-subtotal').innerText = money(subtotal);
    document.getElementById('receipt-tax').innerText = money(tax);
    document.getElementById('receipt-total').innerText = money(total);
    document.getElementById('receipt-cash').innerText = money(cash);
    document.getElementById('receipt-change').innerText = money(cash - total);

    closePaymentModal();
    window.print();
    clearCart();
}