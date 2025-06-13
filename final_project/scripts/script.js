// Product array (requirement: use arrays and objects)
const products = [
    {
        id: 1,
        name: "Laptop Gaming Pro",
        price: 1299.99,
        category: "laptops",
        image: "images/laptop_1.webp",
        description: "High-performance laptop for gaming and professional work."
    },
    {
        id: 2,
        name: "Laptop HP Business",
        price: 899.99,
        category: "laptops",
        image: "images/laptop_2.webp",
        description: "Ideal laptop for business and productivity."
    },
    {
        id: 3,
        name: "Laptop Ultrabook",
        price: 1099.99,
        category: "laptops",
        image: "images/laptop_3.webp",
        description: "Thin and light laptop with excellent battery life."
    },
    {
        id: 4,
        name: "Smartphone TECNO Pro",
        price: 599.99,
        category: "smartphones",
        image: "images/smartphone_1.webp",
        description: "Smartphone with advanced camera and exceptional performance."
    },
    {
        id: 5,
        name: "Smartphone TECNO Elite",
        price: 799.99,
        category: "smartphones",
        image: "images/smartphone_2.webp",
        description: "Premium smartphone with innovative design."
    },
    {
        id: 6,
        name: "Smartphone Tech Future",
        price: 449.99,
        category: "smartphones",
        image: "images/smartphone_3.webp",
        description: "Futuristic smartphone with an affordable price."
    }
];

// Object to manage the cart (requirement: use objects)
const cart = {
    items: [],
    
    // Function to add item to cart
    addItem: function(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const existingItem = this.items.find(item => item.id === productId);
            
            // Conditional branching (requirement)
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            this.saveToLocalStorage();
            this.updateCartDisplay();
            this.showNotification(`${product.name} added to cart!`);
        }
    },
    
    // Function to remove item from cart
    removeItem: function(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToLocalStorage();
        this.updateCartDisplay();
    },
    
    // Function to update quantity
    updateQuantity: function(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item && newQuantity > 0) {
            item.quantity = newQuantity;
        } else if (item && newQuantity <= 0) {
            this.removeItem(productId);
            return;
        }
        this.saveToLocalStorage();
        this.updateCartDisplay();
    },
    
    // Function to clear cart
    clear: function() {
        this.items = [];
        this.saveToLocalStorage();
        this.updateCartDisplay();
    },
    
    // Function to calculate total
    getTotal: function() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // Function to save to localStorage (requirement)
    saveToLocalStorage: function() {
        localStorage.setItem('techstore_cart', JSON.stringify(this.items));
    },
    
    // Function to load from localStorage (requirement)
    loadFromLocalStorage: function() {
        const savedCart = localStorage.getItem('techstore_cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    },
    
    // Function to update cart display
    updateCartDisplay: function() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');
        
        if (cartItemsContainer) {
            // Conditional branching (requirement)
            if (this.items.length === 0) {
                cartItemsContainer.innerHTML = `<p class="loading">Your cart is empty.</p>`;
            } else {
                // Template literals (requirement)
                cartItemsContainer.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy">
                        <div class="cart-item-info">
                            <h3>${item.name}</h3>
                            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        </div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-item-btn" onclick="cart.removeItem(${item.id})">Remove</button>
                    </div>
                `).join('');
            }
        }
        
        if (cartTotalElement) {
            cartTotalElement.textContent = this.getTotal().toFixed(2);
        }
    },
    
    // Function to show notification
    showNotification: function(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #28a745;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove após 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

// Function to render products (requirement: more than one function)
function renderProducts(productsToRender = products) {
    const productGrid = document.getElementById('productGrid');
    const featuredProducts = document.getElementById('featuredProducts');
    
    // Template literals para construir strings (requisito)
    const productHTML = productsToRender.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart-btn" onclick="cart.addItem(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
    
    // DOM interaction (requisito: selecionar e modificar elementos)
    if (productGrid) {
        productGrid.innerHTML = productHTML;
    }
    
    if (featuredProducts) {
        // Mostrar apenas os primeiros 3 produtos na página inicial
        const featuredHTML = products.slice(0, 3).map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart-btn" onclick="cart.addItem(${product.id})">
                    Add to Cart
                </button>
            </div>
        `).join('');
        
        featuredProducts.innerHTML = featuredHTML;
    }
}

// Function to filter products (requirement: use array methods)
function filterProducts(category) {
    // Conditional branching (requirement)
    if (category === 'all') {
        renderProducts(products);
    } else {
        // Array method filter (requisito)
        const filteredProducts = products.filter(product => product.category === category);
        renderProducts(filteredProducts);
    }
}

// Function to validate contact form (requirement: more than one function)
function validateContactForm(formData) {
    const errors = [];
    
    // Conditional branching (requirement)
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Invalid email');
    }
    
    if (!formData.subject) {
        errors.push('Please select a subject');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to process contact form
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    const errors = validateContactForm(formData);
    
    // Conditional branching (requirement)
    if (errors.length > 0) {
        alert(`Form errors:\n${errors.join('\n')}`);
        return;
    }
    
    // Simular envio do formulário
    alert('Message sent successfully! We will contact you shortly.');
    
    // Save to localStorage for demonstration
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    submissions.push({
        ...formData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));
    
    // Clear form
    document.getElementById('contactForm').reset();
}

// Function to finalize purchase
function handleCheckout() {
    // Conditional branching (requirement)
    if (cart.items.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    
    const total = cart.getTotal();
    const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
    
    // Template literals (requirement)
    const confirmMessage = `
Confirm purchase:
${itemCount} item(s)
Total: $${total.toFixed(2)}

Do you want to continue?
    `;
    
    if (confirm(confirmMessage)) {
        // Simular processamento da compra
        alert('Purchase completed successfully! Thank you for your preference.');
        cart.clear();
    }
}

// Event listeners (requirement: listening for and reacting to events)
document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    cart.loadFromLocalStorage();
    
    // Render products
    renderProducts();
    
    // Update cart display
    cart.updateCartDisplay();
    
    // Event listener for category filter (requirement: DOM interaction)
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(event) {
            filterProducts(event.target.value);
        });
    }
    
    // Event listener for contact form (requirement: listening for events)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Event listeners for cart buttons
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear the cart?')) {
                cart.clear();
            }
        });
    }
});

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

window.addEventListener('DOMContentLoaded', () => {
  // dynamic footer year & last modified
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastmodified').textContent = document.lastModified; });

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastmodified").textContent = document.lastModified;

  // 2) Toggle do menu hambúrguer
  const hamburger = document.querySelector(".hamburger");
  const navMenu   = document.getElementById("navMenu");
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});

