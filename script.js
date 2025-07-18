// ================================
// PORTFOLIO INTERACTIVE FUNCTIONALITY
// ================================

class PortfolioApp {
    constructor() {
        this.sidebarNav = document.getElementById('sidebar-nav');
        this.mobileTopbar = document.getElementById('mobile-topbar');
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.contactForm = document.querySelector('.contact-form');
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupFormHandling();
        this.setupAnimations();
        this.setupParallaxEffects();
    }
    
    setupEventListeners() {
        // Mobile menu toggle
        this.mobileMenuToggle?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.sidebarNav && 
                !this.sidebarNav.contains(e.target) && 
                !this.mobileMenuToggle.contains(e.target) &&
                this.sidebarNav.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
        
        // Resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Contact method hover effects
        this.setupContactMethodEffects();
        
        // Service card interactions
        this.setupServiceCardEffects();
        
        // Portfolio item effects
        this.setupPortfolioEffects();
        
        // Tool item animations
        this.setupToolAnimations();
    }
    
    toggleMobileMenu() {
        if (!this.sidebarNav) return;
        
        this.sidebarNav.classList.toggle('active');
        const isOpen = this.sidebarNav.classList.contains('active');
        
        // Update menu toggle animation
        const toggleSpans = this.mobileMenuToggle.querySelectorAll('span');
        if (isOpen) {
            toggleSpans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            toggleSpans[1].style.opacity = '0';
            toggleSpans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            toggleSpans[0].style.transform = '';
            toggleSpans[1].style.opacity = '';
            toggleSpans[2].style.transform = '';
        }
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        if (!this.sidebarNav) return;
        
        this.sidebarNav.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset menu toggle animation
        const toggleSpans = this.mobileMenuToggle.querySelectorAll('span');
        toggleSpans[0].style.transform = '';
        toggleSpans[1].style.opacity = '';
        toggleSpans[2].style.transform = '';
    }
    
    handleResize() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
        
        // Update animations based on screen size
        this.updateAnimationsForScreenSize();
    }
    
    setupScrollEffects() {
        // Scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                document.querySelector('#about').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        }
        
        // Hide scroll indicator after scrolling
        window.addEventListener('scroll', () => {
            if (scrollIndicator && window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else if (scrollIndicator) {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
    
    setupIntersectionObserver() {
        // Active navigation highlighting
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -80% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.updateActiveNavLink(entry.target.id);
                }
            });
        }, observerOptions);
        
        this.sections.forEach(section => observer.observe(section));
        
        // Animation on scroll
        this.setupScrollAnimations();
    }
    
    updateActiveNavLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
    
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(`
            .service-card,
            .portfolio-item,
            .tool-item,
            .experience-card,
            .contact-method,
            .process-step
        `);
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            animationObserver.observe(element);
        });
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offset = window.innerWidth <= 768 ? 70 : 0; // Account for mobile topbar
                    const targetPosition = targetSection.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // CTA button smooth scrolling
        const ctaButtons = document.querySelectorAll('a[href^="#"]');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = button.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offset = window.innerWidth <= 768 ? 70 : 0;
                    const targetPosition = targetSection.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupFormHandling() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
            
            // Enhanced form validation
            const formInputs = this.contactForm.querySelectorAll('input, textarea, select');
            formInputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!this.validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitButton = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            this.showSuccessMessage();
            this.contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
    
    validateForm(data) {
        let isValid = true;
        
        // Required fields
        const requiredFields = ['name', 'email', 'message'];
        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            }
        });
        
        // Email validation
        if (data.email && !this.isValidEmail(data.email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        return isValid;
    }
    
    validateField(input) {
        const value = input.value.trim();
        
        if (input.hasAttribute('required') && !value) {
            this.showFieldError(input.name, 'This field is required');
            return false;
        }
        
        if (input.type === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(input.name, 'Please enter a valid email address');
            return false;
        }
        
        this.clearFieldError(input);
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showFieldError(fieldName, message) {
        const field = this.contactForm.querySelector(`[name="${fieldName}"]`);
        if (!field) return;
        
        this.clearFieldError(field);
        
        field.style.borderColor = '#ef4444';
        
        const errorElement = document.createElement('span');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#ef4444';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorElement);
    }
    
    clearFieldError(input) {
        input.style.borderColor = '';
        const errorElement = input.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-weight: 500;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            ">
                <i class="fas fa-check-circle" style="font-size: 1.2rem;"></i>
                <span>Message sent successfully! I'll get back to you soon.</span>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0;
                    margin-left: 0.5rem;
                ">×</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.firstElementChild.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.firstElementChild.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    setupContactMethodEffects() {
        const contactMethods = document.querySelectorAll('.contact-method');
        contactMethods.forEach(method => {
            method.addEventListener('mouseenter', () => {
                method.style.transform = 'translateX(12px) scale(1.02)';
                method.style.boxShadow = '0 15px 60px rgba(139, 69, 19, 0.15)';
            });
            
            method.addEventListener('mouseleave', () => {
                method.style.transform = 'translateX(8px)';
                method.style.boxShadow = '';
            });
        });
    }
    
    setupServiceCardEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('featured')) {
                    card.style.borderColor = 'var(--primary-color)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('featured')) {
                    card.style.borderColor = '';
                }
            });
        });
    }
    
    setupPortfolioEffects() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.boxShadow = '0 20px 80px rgba(255, 107, 53, 0.2)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.boxShadow = '';
            });
        });
    }
    
    setupToolAnimations() {
        const toolItems = document.querySelectorAll('.tool-item');
        toolItems.forEach((item, index) => {
            // Staggered hover effects
            item.addEventListener('mouseenter', () => {
                setTimeout(() => {
                    item.style.transform = 'translateY(-8px) scale(1.05)';
                }, index * 50);
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = '';
            });
        });
    }
    
    setupAnimations() {
        // Hero text animation
        this.animateHeroText();
        
        // Counter animations
        this.setupCounterAnimations();
        
        // Floating elements animation
        this.setupFloatingElements();
        
        // Typing effect for hero subtitle
        this.setupTypingEffect();
    }
    
    animateHeroText() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        const titleLines = heroTitle.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                line.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 400 + (index * 200));
        });
    }
    
    setupCounterAnimations() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => counterObserver.observe(stat));
    }
    
    animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.float-element');
        floatingElements.forEach((element, index) => {
            // Add random delay and duration for more natural movement
            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 2;
            
            element.style.animationDelay = `${delay}s`;
            element.style.animationDuration = `${duration}s`;
        });
    }
    
    setupTypingEffect() {
        const greetingText = document.querySelector('.greeting-text');
        if (!greetingText) return;
        
        const originalText = greetingText.textContent;
        greetingText.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeTimer = setInterval(() => {
                greetingText.textContent += originalText[i];
                i++;
                if (i >= originalText.length) {
                    clearInterval(typeTimer);
                }
            }, 100);
        }, 200);
    }
    
    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // Hero parallax
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
            
            // Floating elements parallax
            const floatingElements = document.querySelectorAll('.float-element');
            floatingElements.forEach((element, index) => {
                const speed = 0.05 + (index * 0.02);
                element.style.transform += ` translateY(${scrolled * speed}px)`;
            });
        });
    }
    
    updateAnimationsForScreenSize() {
        // Disable complex animations on mobile for better performance
        if (window.innerWidth <= 768) {
            document.body.classList.add('mobile-device');
            
            // Simplify animations
            const complexAnimations = document.querySelectorAll('[style*="animation"]');
            complexAnimations.forEach(element => {
                if (element.style.animationDuration) {
                    element.style.animationDuration = '0.5s';
                }
            });
        } else {
            document.body.classList.remove('mobile-device');
        }
    }
}

// ================================
// UTILITY FUNCTIONS
// ================================

// Smooth scroll polyfill for older browsers
function smoothScrollPolyfill() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        import('https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@v0.4.4/dist/smoothscroll.min.js');
    }
}

// Lazy loading for images
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Performance optimization
function optimizePerformance() {
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Theme handling (for future dark mode support)
function setupThemeToggle() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Listen for theme toggle (if implemented)
    document.addEventListener('theme-toggle', (e) => {
        const newTheme = e.detail.theme;
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Error handling
function setupErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('Portfolio Error:', e.error);
        // Could send error reports to analytics service
    });
    
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled Promise Rejection:', e.reason);
        e.preventDefault();
    });
}

// ================================
// INITIALIZATION
// ================================

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the portfolio app
    new PortfolioApp();
    
    // Setup additional features
    smoothScrollPolyfill();
    setupLazyLoading();
    optimizePerformance();
    setupThemeToggle();
    setupErrorHandling();
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}