import { logAnalyticsEvent } from '../utils/helpers.js';

/**
 * Gallery Modal Component
 * Handles image modal functionality with accessibility support
 */
export class GalleryModal {
  constructor() {
    this.modal = document.getElementById('imageModal');
    this.modalImage = document.getElementById('modalImage');
    this.closeButton = document.getElementById('closeModal');
    this.galleryImages = [];
    this.currentImageIndex = 0;
    this.focusedImageBeforeModal = null;
    
    this.init();
  }

  /**
   * Initialize modal component
   */
  init() {
    if (!this.modal || !this.modalImage || !this.closeButton) {
      console.error('Gallery modal elements not found');
      return;
    }

    this.bindEvents();
    console.log('✅ Gallery modal initialized successfully');
  }

  /**
   * Bind all event listeners
   */
  bindEvents() {
    // Close modal events
    this.closeButton.addEventListener('click', () => this.closeModal());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => this.handleKeydown(e));

    // Dynamic image binding will happen when images are loaded
    this.observeGalleryImages();
  }

  /**
   * Observe for gallery images and bind events when they're loaded
   */
  observeGalleryImages() {
    const observer = new MutationObserver(() => {
      const images = document.querySelectorAll('.gallery-image');
      if (images.length > 0) {
        this.galleryImages = Array.from(images);
        this.bindImageEvents();
        observer.disconnect(); // Stop observing once images are found
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Bind click and keyboard events to gallery images
   */
  bindImageEvents() {
    this.galleryImages.forEach((image, index) => {
      // Make images focusable and add keyboard support
      image.setAttribute('tabindex', '0');
      image.setAttribute('role', 'button');
      
      // Click event
      image.addEventListener('click', () => this.openModal(index));
      
      // Keyboard events
      image.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openModal(index);
        }
      });
    });

    console.log(`✅ Bound events to ${this.galleryImages.length} gallery images`);
  }

  /**
   * Open modal with specific image
   * @param {number} imageIndex - Index of image to display
   */
  openModal(imageIndex) {
    this.currentImageIndex = imageIndex;
    this.focusedImageBeforeModal = document.activeElement;
    
    const imageElement = this.galleryImages[imageIndex];
    const highResImage = imageElement.dataset.highRes;
    
    this.modalImage.src = highResImage;
    this.modalImage.alt = imageElement.alt;
    this.modal.classList.add('active');
    
    // Accessibility: Focus management
    this.closeButton.focus();
    document.body.style.overflow = 'hidden';

    // Log analytics event
    logAnalyticsEvent('gallery_image_opened', {
      imageIndex: imageIndex,
      imageAlt: imageElement.alt,
      timestamp: Date.now()
    });

    console.log(`🖼️ Opened modal for image ${imageIndex + 1}`);
  }

  /**
   * Close modal and restore focus
   */
  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Restore focus to previously focused element
    if (this.focusedImageBeforeModal) {
      this.focusedImageBeforeModal.focus();
    }

    // Log analytics event
    logAnalyticsEvent('gallery_modal_closed', {
      imageIndex: this.currentImageIndex,
      timestamp: Date.now()
    });

    console.log('❌ Modal closed');
  }

  /**
   * Handle keyboard interactions
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeydown(e) {
    if (!this.modal.classList.contains('active')) return;

    switch (e.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowLeft':
        this.navigateImage(-1);
        break;
      case 'ArrowRight':
        this.navigateImage(1);
        break;
      case 'Tab':
        // Trap focus within modal
        this.trapFocus(e);
        break;
    }
  }

  /**
   * Navigate to next/previous image
   * @param {number} direction - Direction to navigate (-1 or 1)
   */
  navigateImage(direction) {
    const newIndex = this.currentImageIndex + direction;
    
    if (newIndex >= 0 && newIndex < this.galleryImages.length) {
      this.openModal(newIndex);
    }
  }

  /**
   * Trap focus within modal for accessibility
   * @param {KeyboardEvent} e - Tab key event
   */
  trapFocus(e) {
    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }

}