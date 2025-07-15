// Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.getElementById('navLinks');

        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Smooth scrolling for navigation links
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

        // Scroll reveal animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all scroll reveal elements
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });

        // Service cards staggered animation
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.2}s`;
        });

        // Add parallax effect to hero section
       /*  window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }); */

        // Add click animation to service cards
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Staggered animation for value items
const valueItems = document.querySelectorAll('.value-item');
valueItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Add click animation to value items
valueItems.forEach(item => {
    item.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});


// CTA button animations
const ctaButtons = document.querySelectorAll('.cta-btn');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const rippleCSS = `
.cta-btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
}

@keyframes rippleEffect {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add ripple CSS to head
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);



// FAQ Toggle Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
        
        // Add click animation
        question.style.transform = 'scale(0.98)';
        setTimeout(() => {
            question.style.transform = '';
        }, 150);
    });
});

// Staggered animation for FAQ items
faqItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Auto-close FAQ when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.faq-item')) {
        faqItems.forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Keyboard accessibility for FAQ
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
    
    // Make it focusable
    question.setAttribute('tabindex', '0');
});


// Footer JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Set current year
    function setCurrentYear() {
        const currentYear = new Date().getFullYear();
        const yearElement = document.getElementById('mascot-current-year');
        if (yearElement) {
            yearElement.textContent = currentYear;
        }
    }
    
    // Initialize intersection observer for animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
        
        const footerSections = document.querySelectorAll('.mascot-footer-info-section');
        footerSections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Enhanced social media interactions
    function initSocialMediaEffects() {
        const socialItems = document.querySelectorAll('.mascot-social-item');
        
        socialItems.forEach(item => {
            const platform = item.getAttribute('data-platform');
            
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.05)';
                
                // Add platform-specific effects
                const icon = this.querySelector('i');
                switch(platform) {
                    case 'linkedin':
                        icon.style.color = '#0077b5';
                        break;
                    case 'twitter':
                        icon.style.color = '#1da1f2';
                        break;
                    case 'instagram':
                        icon.style.background = 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)';
                        icon.style.webkitBackgroundClip = 'text';
                        icon.style.webkitTextFillColor = 'transparent';
                        break;
                    case 'facebook':
                        icon.style.color = '#1877f2';
                        break;
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                const icon = this.querySelector('i');
                icon.style.color = '';
                icon.style.background = '';
                icon.style.webkitBackgroundClip = '';
                icon.style.webkitTextFillColor = '';
            });
            
            // Add click animation
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.background = 'rgba(255, 255, 255, 0.5)';
                ripple.style.borderRadius = '50%';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.marginLeft = '-10px';
                ripple.style.marginTop = '-10px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Here you would typically handle the social media link
                console.log(`Clicked on ${platform}`);
            });
        });
    }
    
    // Contact method interactions
    function initContactMethods() {
        const contactMethods = document.querySelectorAll('.mascot-contact-method');
        
        contactMethods.forEach(method => {
            method.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                icon.style.transform = 'scale(1.2)';
                icon.style.color = '#4ecdc4';
            });
            
            method.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                icon.style.transform = '';
                icon.style.color = '';
            });
            
            // Add special WhatsApp effect
            if (method.classList.contains('whatsapp')) {
                method.addEventListener('click', function(e) {
                    e.preventDefault();
                    const icon = this.querySelector('i');
                    icon.style.animation = 'shake 0.5s ease-in-out';
                    
                    setTimeout(() => {
                        icon.style.animation = '';
                        // Open WhatsApp (you can customize this)
                        window.open(this.href, '_blank');
                    }, 500);
                });
            }
        });
    }
    
    // Floating shapes animation control
    function initFloatingShapes() {
        const shapes = document.querySelectorAll('.mascot-floating-shape');
        
        shapes.forEach((shape, index) => {
            // Add random movement
            const randomDelay = Math.random() * 2000;
            const randomDuration = 6000 + Math.random() * 4000;
            
            setTimeout(() => {
                shape.style.animationDuration = randomDuration + 'ms';
                shape.style.animationDelay = randomDelay + 'ms';
            }, index * 1000);
            
            // Add mouse interaction
            shape.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
                this.style.transform = 'scale(1.5)';
                this.style.opacity = '1';
            });
            
            shape.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
                this.style.transform = '';
                this.style.opacity = '';
            });
        });
    }
    
    // Parallax effect for footer
    function initParallaxEffect() {
        const footer = document.querySelector('.mascot-footer-wrapper');
        if (!footer) return;
        
        function handleScroll() {
            const scrolled = window.pageYOffset;
            const footerOffset = footer.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrolled + windowHeight > footerOffset) {
                const parallaxValue = (scrolled + windowHeight - footerOffset) * 0.1;
                footer.style.transform = `translateY(${parallaxValue}px)`;
            }
        }
        
        // Throttle scroll event
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    // Add CSS animations dynamically
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .mascot-footer-info-section.animate {
                animation: slideInUp 0.6s ease-out forwards;
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .mascot-social-item:active {
                transform: scale(0.95) !important;
            }
            
            .mascot-contact-method:active {
                transform: translateX(5px) scale(0.98) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize all functionality
    function init() {
        setCurrentYear();
        initScrollAnimations();
        initSocialMediaEffects();
        initContactMethods();
        initFloatingShapes();
        initParallaxEffect();
        addDynamicStyles();
    }
    
    // Start initialization
    init();
    
    // Re-initialize on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            init();
        }, 250);
    });
    
    // Add smooth scrolling for internal links
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
    
    // Add loading animation
    const footerWrapper = document.querySelector('.mascot-footer-wrapper');
    if (footerWrapper) {
        footerWrapper.style.opacity = '0';
        footerWrapper.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            footerWrapper.style.transition = 'all 0.8s ease-out';
            footerWrapper.style.opacity = '1';
            footerWrapper.style.transform = 'translateY(0)';
        }, 100);
    }
});

// Optional: Add performance monitoring
if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark('footer-js-start');
    window.addEventListener('load', () => {
        performance.mark('footer-js-end');
        performance.measure('footer-js-duration', 'footer-js-start', 'footer-js-end');
    });
}