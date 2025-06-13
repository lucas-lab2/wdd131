// Array de produtos (requisito: usar arrays e objetos)
const products = [
    {
        id: 1,
        name: "Laptop Gaming Pro",
        price: 1299.99,
        category: "laptops",
        image: "images/laptop_1.webp",
        description: "Laptop de alta performance para gaming e trabalho profissional."
    },
    {
        id: 2,
        name: "Laptop HP Business",
        price: 899.99,
        category: "laptops",
        image: "images/laptop_2.webp",
        description: "Laptop ideal para negócios e produtividade."
    },
    {
        id: 3,
        name: "Laptop Ultrabook",
        price: 1099.99,
        category: "laptops",
        image: "images/laptop_3.jpg",
        description: "Laptop fino e leve com excelente autonomia."
    },
    {
        id: 4,
        name: "Smartphone TECNO Pro",
        price: 599.99,
        category: "smartphones",
        image: "images/smartphone_1.jpg",
        description: "Smartphone com câmara avançada e performance excepcional."
    },
    {
        id: 5,
        name: "Smartphone TECNO Elite",
        price: 799.99,
        category: "smartphones",
        image: "images/smartphone_2.jpg",
        description: "Smartphone premium com design inovador."
    },
    {
        id: 6,
        name: "Smartphone Tech Future",
        price: 449.99,
        category: "smartphones",
        image: "images/smartphone_3.jpg",
        description: "Smartphone com tecnologia futurista e preço acessível."
    }
];

// Objeto para gerir o carrinho (requisito: usar objetos)
const cart = {
    items: [],
    
    // Função para adicionar item ao carrinho
    addItem: function(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const existingItem = this.items.find(item => item.id === productId);
            
            // Conditional branching (requisito)
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
            this.showNotification(`${product.name} adicionado ao carrinho!`);
        }
    },
    
    // Função para remover item do carrinho
    removeItem: function(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToLocalStorage();
        this.updateCartDisplay();
    },
    
    // Função para atualizar quantidade
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
    
    // Função para limpar carrinho
    clear: function() {
        this.items = [];
        this.saveToLocalStorage();
        this.updateCartDisplay();
    },
    
    // Função para calcular total
    getTotal: function() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    // Função para salvar no localStorage (requisito)
    saveToLocalStorage: function() {
        localStorage.setItem('techstore_cart', JSON.stringify(this.items));
    },
    
    // Função para carregar do localStorage (requisito)
    loadFromLocalStorage: function() {
        const savedCart = localStorage.getItem('techstore_cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
        }
    },
    
    // Função para atualizar display do carrinho
    updateCartDisplay: function() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');
        
        if (cartItemsContainer) {
            // Conditional branching (requisito)
            if (this.items.length === 0) {
                cartItemsContainer.innerHTML = `<p class="loading">O seu carrinho está vazio.</p>`;
            } else {
                // Template literals (requisito)
                cartItemsContainer.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy">
                        <div class="cart-item-info">
                            <h3>${item.name}</h3>
                            <p class="cart-item-price">€${item.price.toFixed(2)}</p>
                        </div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span class="quantity-display">${item.quantity}</span>
                            <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-item-btn" onclick="cart.removeItem(${item.id})">Remover</button>
                    </div>
                `).join('');
            }
        }
        
        if (cartTotalElement) {
            cartTotalElement.textContent = this.getTotal().toFixed(2);
        }
    },
    
    // Função para mostrar notificação
    showNotification: function(message) {
        // Criar elemento de notificação
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
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};

// Função para renderizar produtos (requisito: mais de uma função)
function renderProducts(productsToRender = products) {
    const productGrid = document.getElementById('productGrid');
    const featuredProducts = document.getElementById('featuredProducts');
    
    // Template literals para construir strings (requisito)
    const productHTML = productsToRender.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">€${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart-btn" onclick="cart.addItem(${product.id})">
                Adicionar ao Carrinho
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
                <p class="product-price">€${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart-btn" onclick="cart.addItem(${product.id})">
                    Adicionar ao Carrinho
                </button>
            </div>
        `).join('');
        
        featuredProducts.innerHTML = featuredHTML;
    }
}

// Função para filtrar produtos (requisito: usar array methods)
function filterProducts(category) {
    // Conditional branching (requisito)
    if (category === 'all') {
        renderProducts(products);
    } else {
        // Array method filter (requisito)
        const filteredProducts = products.filter(product => product.category === category);
        renderProducts(filteredProducts);
    }
}

// Função para validar formulário de contacto (requisito: mais de uma função)
function validateContactForm(formData) {
    const errors = [];
    
    // Conditional branching (requisito)
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Email inválido');
    }
    
    if (!formData.subject) {
        errors.push('Por favor selecione um assunto');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Mensagem deve ter pelo menos 10 caracteres');
    }
    
    return errors;
}

// Função auxiliar para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para processar formulário de contacto
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
    
    // Conditional branching (requisito)
    if (errors.length > 0) {
        alert(`Erros no formulário:\n${errors.join('\n')}`);
        return;
    }
    
    // Simular envio do formulário
    alert('Mensagem enviada com sucesso! Entraremos em contacto em breve.');
    
    // Salvar no localStorage para demonstração
    const submissions = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
    submissions.push({
        ...formData,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('contact_submissions', JSON.stringify(submissions));
    
    // Limpar formulário
    document.getElementById('contactForm').reset();
}

// Função para finalizar compra
function handleCheckout() {
    // Conditional branching (requisito)
    if (cart.items.length === 0) {
        alert('O seu carrinho está vazio!');
        return;
    }
    
    const total = cart.getTotal();
    const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);
    
    // Template literals (requisito)
    const confirmMessage = `
Confirmar compra:
${itemCount} item(s)
Total: €${total.toFixed(2)}

Deseja continuar?
    `;
    
    if (confirm(confirmMessage)) {
        // Simular processamento da compra
        alert('Compra realizada com sucesso! Obrigado pela sua preferência.');
        cart.clear();
    }
}

// Event listeners (requisito: listening for and reacting to events)
document.addEventListener('DOMContentLoaded', function() {
    // Carregar carrinho do localStorage
    cart.loadFromLocalStorage();
    
    // Renderizar produtos
    renderProducts();
    
    // Atualizar display do carrinho
    cart.updateCartDisplay();
    
    // Event listener para filtro de categoria (requisito: DOM interaction)
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function(event) {
            filterProducts(event.target.value);
        });
    }
    
    // Event listener para formulário de contacto (requisito: listening for events)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Event listeners para botões do carrinho
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja limpar o carrinho?')) {
                cart.clear();
            }
        });
    }
});

// Adicionar CSS para animação de notificação
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

