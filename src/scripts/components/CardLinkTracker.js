import { logAnalyticsEvent } from '../utils/helpers.js';

/**
 * Card Link Tracker Component
 * Handles link click tracking with comprehensive logging
 */
export class CardLinkTracker {
  constructor() {
    this.cardLinks = [];
    this.init();
  }

  /**
   * Initialize card link tracker
   */
  init() {
    // Wait for cards to be loaded, then bind events
    this.observeCardLinks();
    console.log('✅ Card link tracker initialized successfully');
  }

  /**
   * Observe for card links and bind events when they're loaded
   */
  observeCardLinks() {
    const observer = new MutationObserver(() => {
      const links = document.querySelectorAll('.card a');
      if (links.length > 0) {
        this.cardLinks = Array.from(links);
        this.bindLinkEvents();
        observer.disconnect(); // Stop observing once links are found
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Bind click events to all card links
   */
  bindLinkEvents() {
    this.cardLinks.forEach((link, index) => {
      link.addEventListener('click', (e) => this.handleLinkClick(e, index));
      
      // Add additional accessibility attributes
      link.setAttribute('data-link-index', index);
      link.setAttribute('aria-describedby', `card-${index}-description`);
    });

    console.log(`✅ Bound tracking to ${this.cardLinks.length} card links`);
  }

  /**
   * Handle link click event with comprehensive logging
   * @param {Event} event - Click event
   * @param {number} linkIndex - Index of clicked link
   */
  handleLinkClick(event, linkIndex) {
    const link = event.target;
    const card = link.closest('.card');
    const cardTitle = card?.querySelector('h3')?.textContent || 'Unknown';
    
    // Comprehensive logging as required by specifications
    console.group('🔗 Card Link Click Event');
    console.log('Anchor Element:', link);
    console.log('Link href:', link.href);
    console.log('Link text:', link.textContent.trim());
    console.log('Link index:', linkIndex);
    console.log('Parent card:', card);
    console.log('Card title:', cardTitle);
    console.log('Click timestamp:', new Date().toISOString());
    console.log('User agent:', navigator.userAgent);
    console.groupEnd();

    // Analytics event logging
    logAnalyticsEvent('card_link_clicked', {
      linkIndex: linkIndex,
      linkHref: link.href,
      linkText: link.textContent.trim(),
      cardTitle: cardTitle,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      elementId: link.id || null,
      elementClasses: link.className || null
    });
  
  }


  /**
   * Get link analytics summary
   * @returns {Object} Analytics summary
   */
  getAnalyticsSummary() {
    return {
      totalLinks: this.cardLinks.length,
      linkData: this.cardLinks.map((link, index) => ({
        index: index,
        href: link.href,
        text: link.textContent.trim(),
        cardTitle: link.closest('.card')?.querySelector('h3')?.textContent || 'Unknown'
      }))
    };
  }
}
