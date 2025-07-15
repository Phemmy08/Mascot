// Enhanced Branding Services JavaScript

class BrandingPageController {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupParallaxEffects();
        this.setupServiceCardInteractions();
        this.setupMobileOptimizations();
        this.setupProgressiveLoading();
    }

    setupEventListeners() {
        // Button click handlers
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('click', this.handleButtonClick.bind(this));
        });

        // Service card click handlers
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', this.handleServiceCardClick.bind(this));
            card.addEventListener('mouseenter', this.handleServiceCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleServiceCardLeave.bind(this));
        });

        // Scroll event for animations
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Resize event for responsive adjustments
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe service cards
        document.querySelectorAll('.service-card').forEach(card => {
            observer.observe(card);
        });

        // Observe process steps
        document.querySelectorAll('.process-step').forEach(step => {
            observer.observe(step);
        });

        // Observe section headers
        document.querySelectorAll('.section-header').forEach(header => {
            observer.observe(header);
        });
    }

    animateElement(element) {
        if (element.classList.contains('service-card')) {
            this.animateServiceCard(element);
        } else if (element.classList.contains('process-step')) {
            this.animateProcessStep(element);
        } else if (element.classList.contains('section-header')) {
            this.animateSectionHeader(element);
        }
    }

    animateServiceCard(card) {
        const icon = card.querySelector('.service-icon');
        const features = card.querySelectorAll('.service-features span');
        
        // Animate icon
        setTimeout(() => {
            icon.style.transform = 'scale(1.05) rotate(5deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        }, 200);

        // Animate features with stagger
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.opacity = '0';
                feature.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    feature.style.transition = 'all 0.3s ease';
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateY(0)';
                }, 50);
            }, index * 100);
        });
    }

    animateProcessStep(step) {
        const number = step.querySelector('.step-number');
        const content = step.querySelector('.step-content');
        
        // Animate number with bounce
        setTimeout(() => {
            number.style.transform = 'scale(1.2)';
            setTimeout(() => {
                number.style.transform = 'scale(1)';
            }, 200);
        }, 100);

        // Animate content
        setTimeout(() => {
            content.style.opacity = '0.7';
            content.style.transform = 'translateY(10px)';
            setTimeout(() => {
                content.style.transition = 'all 0.5s ease';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }, 100);
        }, 300);
    }

    animateSectionHeader(header) {
        const title = header.querySelector('.section-title');
        const subtitle = header.querySelector('.section-subtitle');
        
        // Animate title
        title.style.opacity = '0';
        title.style.transform = 'translateY(30px)';
        setTimeout(() => {
            title.style.transition = 'all 0.6s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 100);

        // Animate subtitle
        setTimeout(() => {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateY(20px)';
            setTimeout(() => {
                subtitle.style.transition = 'all 0.6s ease';
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }, 100);
        }, 200);
    }

    setupParallaxEffects() {
        const floatingShapes = document.querySelectorAll('.floating-shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            floatingShapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });
    }

    setupServiceCardInteractions() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            // Add ripple effect
            card.addEventListener('click', (e) => {
                this.createRippleEffect(e, card);
            });

            // Add tilt effect on mouse move
            card.addEventListener('mousemove', (e) => {
                this.createTiltEffect(e, card);
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    }

    createRippleEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            left: ${x - 10}px;
            top: ${y - 10}px;
            width: 20px;
            height: 20px;
            z-index: 1000;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    createTiltEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    setupMobileOptimizations() {
        // Touch-friendly interactions
        if ('ontouchstart' in window) {
            document.querySelectorAll('.service-card').forEach(card => {
                card.addEventListener('touchstart', () => {
                    card.style.transform = 'scale(0.95)';
                });
                
                card.addEventListener('touchend', () => {
                    setTimeout(() => {
                        card.style.transform = 'scale(1)';
                    }, 100);
                });
            });
        }

        // Responsive text sizing
        this.adjustTextSizes();
    }

    adjustTextSizes() {
        const heroTitle = document.querySelector('.hero-title');
        const sectionTitles = document.querySelectorAll('.section-title');
        
        const adjustSize = () => {
            const vw = window.innerWidth;
            
            if (vw <= 480) {
                heroTitle.style.fontSize = '2rem';
                sectionTitles.forEach(title => {
                    title.style.fontSize = '2rem';
                });
            } else if (vw <= 768) {
                heroTitle.style.fontSize = '2.5rem';
                sectionTitles.forEach(title => {
                    title.style.fontSize = '2.5rem';
                });
            } else {
                heroTitle.style.fontSize = '4rem';
                sectionTitles.forEach(title => {
                    title.style.fontSize = '3rem';
                });
            }
        };
        
        adjustSize();
        window.addEventListener('resize', adjustSize);
    }

    setupProgressiveLoading() {
        // Lazy load animations
        const lazyElements = document.querySelectorAll('.service-card, .process-step');
        
        lazyElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
        });
    }

    handleButtonClick(e) {
        const button = e.target;
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);

        // Add particle effect
        this.createParticleEffect(e, button);
        
        // Handle different button actions
        if (button.textContent.includes('Start Your Project')) {
            this.handleStartProject();
        } else if (button.textContent.includes('View Portfolio')) {
            this.handleViewPortfolio();
        } else if (button.textContent.includes('Get Started Today')) {
            this.handleGetStarted();
        }
    }

    createParticleEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: white;
                border-radius: 50%;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                animation: particle-explosion 0.8s ease-out forwards;
                animation-delay: ${i * 0.1}s;
                z-index: 1000;
            `;
            
            element.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }

    handleServiceCardClick(e) {
        const card = e.currentTarget;
        const service = card.dataset.service;
        
        // Add selection animation
        card.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        card.style.color = 'white';
        
        setTimeout(() => {
            card.style.background = 'white';
            card.style.color = '#333';
        }, 300);
        
        // Show service details (you can expand this)
        this.showServiceDetails(service);
    }

    handleServiceCardHover(e) {
        const card = e.currentTarget;
        const icon = card.querySelector('.service-icon');
        const features = card.querySelectorAll('.service-features span');
        
        // Enhanced hover animations
        icon.style.transform = 'scale(1.1) rotate(10deg)';
        
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.transform = 'translateY(-3px)';
                feature.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            }, index * 50);
        });
    }

    handleServiceCardLeave(e) {
        const card = e.currentTarget;
        const icon = card.querySelector('.service-icon');
        const features = card.querySelectorAll('.service-features span');
        
        icon.style.transform = 'scale(1) rotate(0deg)';
        
        features.forEach(feature => {
            feature.style.transform = 'translateY(0)';
            feature.style.boxShadow = 'none';
        });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        // Parallax effect for hero background
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Update floating shapes
        document.querySelectorAll('.floating-shape').forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    }

    handleResize() {
        this.adjustTextSizes();
        
        // Recalculate animations on resize
        setTimeout(() => {
            this.setupScrollAnimations();
        }, 300);
    }

    showServiceDetails(service) {
        // Create a modal or expand section (placeholder for future enhancement)
        console.log(`Selected service: ${service}`);
        
        // You can implement a modal here or redirect to service page
        // For now, we'll show an alert
        const serviceNames = {
            'book-cover': 'Book Cover Design',
            'brand-identity': 'Brand Identity Design',
            'logo-design': 'Logo Design',
            'magazines': 'Magazine & Brochure Design',
            'customization': 'General Customization',
            'content-design': 'Content Design',
            'graphics': 'Graphics Design',
            'infographics': 'Infographics',
            'branding-materials': 'Branding Materials',
            'general-printing': 'General Printing',
            'di-printing': 'Digital Innovation Printing',
            'large-format': 'Large Format Printing',
            'book-publishing': 'Book Publishing & Production'
        };
        
        const serviceName = serviceNames[service] || 'Service';
        this.showNotification(`Interested in ${serviceName}? Let's discuss your project!`);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    handleStartProject() {
        this.showNotification('Ready to start your project? Contact us to begin!');
    }

    handleViewPortfolio() {
        this.showNotification('Portfolio coming soon! Contact us to see our work.');
    }

    handleGetStarted() {
        this.showNotification('Let\'s get started! We\'ll be in touch soon.');
    }
}

// Add CSS animations for particles and notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes particle-explosion {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-20px) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: inherit;
        font-size: 14px;
        line-height: 1.4;
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BrandingPageController();
});

// Add smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handler
window.addEventListener('scroll', debounce(() => {
    // Additional scroll optimizations can be added here
}, 16)); // 60fps











// Navbar functionality
class NavbarController {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navBtn = document.querySelector('.nav-btn');
        this.lastScrollY = window.scrollY;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupMobileMenu();
    }

    setupEventListeners() {
        // Check if hamburger exists before adding event listener
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Check if it's an internal link (starts with #)
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.smoothScrollTo(href);
                }
                this.closeMobileMenu();
            });
        });

        // Nav button click - only if button exists
        if (this.navBtn) {
            this.navBtn.addEventListener('click', () => {
                this.handleNavButtonClick();
            });
        }
    }

    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    setupMobileMenu() {
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navbar && this.navMenu && 
                !this.navbar.contains(e.target) && 
                this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (this.navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }

    closeMobileMenu() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.classList.remove('active');
            this.navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for backdrop effect
        if (this.navbar) {
            if (currentScrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

           /*  // Hide/show navbar on scroll
            if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                this.navbar.classList.add('hidden');
                this.navbar.classList.remove('visible');
            } else {
                this.navbar.classList.remove('hidden');
                this.navbar.classList.add('visible');
            } */
        }
        
        this.lastScrollY = currentScrollY;
        
        // Update active nav link based on scroll position
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        } else {
            console.warn(`Target element ${targetId} not found`);
        }
    }

    handleNavButtonClick() {
        if (this.navBtn) {
            // Add click animation
            this.navBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.navBtn.style.transform = 'scale(1)';
            }, 150);
            
            // Show notification or redirect
            this.showNotification('Ready to get your quote? Let\'s discuss your project!');
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'nav-notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavbarController();
});

// Fallback: Simple smooth scrolling for any anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
});