// Norelle Ropa - Main JavaScript

class Cart {
  constructor() {
    this.items = this.loadCart();
  }

  loadCart() {
    try {
      const cart = localStorage.getItem('norelle_cart');
      return cart ? JSON.parse(cart) : [];
    } catch {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('norelle_cart', JSON.stringify(this.items));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  addItem(product, quantity = 1) {
    const existingIndex = this.items.findIndex(item => 
      item.id === product.id
    );
    
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }
    
    this.saveCart();
    this.updateCartUI();
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartUI();
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.updateCartUI();
      }
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartUI();
  }

  updateCartUI() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const count = this.getItemCount();
    cartCountElements.forEach(el => {
      el.textContent = count;
    });
  }
}

const cart = new Cart();

// Favorites management
class Favorites {
  constructor() {
    this.items = this.load();
  }

  load() {
    try {
      const favs = localStorage.getItem('norelle_favorites');
      return favs ? JSON.parse(favs) : [];
    } catch {
      return [];
    }
  }

  save() {
    try {
      localStorage.setItem('norelle_favorites', JSON.stringify(this.items));
    } catch (e) {
      console.error('Error saving favorites:', e);
    }
  }

  toggle(productId) {
    const index = this.items.indexOf(productId);
    if (index > -1) {
      this.items.splice(index, 1);
    } else {
      this.items.push(productId);
    }
    this.save();
    return this.items.includes(productId);
  }

  has(productId) {
    return this.items.includes(productId);
  }
}

const favorites = new Favorites();

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      if (nav.style.display === 'flex') {
        nav.style.position = 'absolute';
        nav.style.top = '80px';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.flexDirection = 'column';
        nav.style.background = 'rgba(253, 252, 251, 0.98)';
        nav.style.padding = '1rem 2rem';
        nav.style.gap = '1rem';
        nav.style.borderBottom = '1px solid var(--border)';
      }
    });
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  cart.updateCartUI();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
