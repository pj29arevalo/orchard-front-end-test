import '../styles/main.css';
import { GalleryModal } from './components/GalleryModal.js';
import { CardLinkTracker } from './components/CardLinkTracker.js';
import { logAnalyticsEvent } from './utils/helpers.js';
import  contentData from '../data/content.json';

/**
 * Main Application Class
 * Orchestrates all components and handles content loading
 */
class OrchartFrontendTest {
  constructor() {
    this.contentData = null;
    this.components = {};
    
    this.init();
  }

  /**
   * Initialize the application
   */
  async init() {
    console.log('🚀 Initializing Orchard Front-end Test Website...');
    
    try {
      // Load content data
      await this.loadContent();
      
      // Render content
      this.renderGallery();
      this.renderCards();
      
      // Initialize interactive components
      this.initializeComponents();
      
      // Log successful initialization
      logAnalyticsEvent('app_initialized', {
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      });

      console.log('✅ Orchard Front-end Test Website initialized successfully!');
      
    } catch (error) {
      console.error('❌ Failed to initialize application:', error);
      this.handleInitializationError(error);
    }
  }

  /**
   * Load content data from JSON file
   */
  async loadContent() {
    try {
      // In a real application, this would fetch from an API or CMS
      // For this demo, we're using inline content data
      this.contentData = contentData;

      console.log('✅ Content data loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load content:', error);
      throw new Error('Content loading failed');
    }
  }

  /**
   * Render gallery section with content from JSON
   */
  renderGallery() {
    const gallery = this.contentData.gallery;
    
    // Set title
    const titleElement = document.getElementById('gallery-title');
    if (titleElement) {
      titleElement.textContent = gallery.title;
    }

    // Set content text
    const textElement = document.getElementById('gallery-text');
    if (textElement) {
      gallery.content.forEach(paragraph => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        textElement.appendChild(p);
      });
    }

    // Set perfect egg content
    const eggTitleElement = document.getElementById('egg-title');
    const eggTextElement = document.getElementById('egg-text');
    
    if (eggTitleElement) {
      eggTitleElement.textContent = gallery.perfectEgg.title;
    }
    
    if (eggTextElement) {
      eggTextElement.textContent = gallery.perfectEgg.description;
    }

    // Render gallery images
    const imagesContainer = document.querySelector('[data-gallery="main"]');
    if (imagesContainer) {
      gallery.images.forEach((imageData, index) => {
        const img = document.createElement('img');
        img.src = imageData.src;
        img.setAttribute('data-high-res', imageData.highRes);
        img.alt = imageData.alt;
        img.className = imageData.classes.join(' ');
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `Click to view larger image ${index + 1}`);
        if (index !== 0) img.loading = 'lazy';
        
        imagesContainer.appendChild(img);
      });
    }

    console.log('✅ Gallery rendered successfully');
  }

  /**
   * Render cards section with content from JSON
   */
  renderCards() {
    const cards = this.contentData.cards;
    
    // Set cards title
    const titleElement = document.getElementById('cards-title');
    if (titleElement) {
      titleElement.textContent = cards.title;
    }

    // Render cards
    const cardsContainer = document.getElementById('cards-container');
    if (cardsContainer) {
      cards.items.forEach((cardData, index) => {
        const cardElement = this.createCardElement(cardData, index);
        cardsContainer.appendChild(cardElement);
      });
    }

    console.log('✅ Cards rendered successfully');
  }

  /**
   * Create individual card element
   * @param {Object} cardData - Card data object
   * @param {number} index - Card index
   * @returns {HTMLElement} Card element
   */
  createCardElement(cardData, index) {
    const article = document.createElement('article');
    article.className = 'card';

    const img = document.createElement('img');
    img.src = cardData.image.src;
    img.setAttribute('data-high-res', cardData.image.highRes);
    img.alt = cardData.image.alt;
    img.className = 'card-image';
    img.loading = 'lazy';

    const h3 = document.createElement('h3');
    h3.textContent = cardData.title;

    const p = document.createElement('p');
    p.innerHTML = `${cardData.description} <a href="${cardData.link.href}" target="${cardData.link.target}" rel="${cardData.link.rel}">${cardData.link.text}</a>`;
    p.setAttribute('id', `card-${index}-description`);

    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);

    return article;
  }

  /**
   * Initialize interactive components
   */
  initializeComponents() {
    // Initialize Gallery Modal
    this.components.galleryModal = new GalleryModal();
    
    // Initialize Card Link Tracker
    this.components.cardLinkTracker = new CardLinkTracker();

    console.log('✅ All interactive components initialized');
  }

  /**
   * Handle initialization errors gracefully
   * @param {Error} error - The initialization error
   */
  handleInitializationError(error) {
    const errorMessage = `
      <div style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #dc2626;
        color: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        z-index: 9999;
        max-width: 400px;
      ">
        <h3>⚠️ Application Error</h3>
        <p>Failed to initialize the website.</p>
        <p><strong>Error:</strong> ${error.message}</p>
        <button onclick="location.reload()" style="
          background: white;
          color: #dc2626;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
        ">Reload Page</button>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', errorMessage);
  }
}

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Create global app instance
  window.OrchardApp = new OrchartFrontendTest();
});