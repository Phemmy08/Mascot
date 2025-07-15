// Mobile menu toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navMenu = document.querySelector('.nav-menu');

        mobileMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
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
                // Close mobile menu after clicking
                navMenu.classList.remove('active');
            });
        });

        // Header background change on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });

        // Animated counter for stats
        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
                }
            }, 20);
        };

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate service cards
                    if (entry.target.classList.contains('service-card')) {
                        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    }
                    
                    // Animate stats
                    if (entry.target.classList.contains('stat-number')) {
                        const text = entry.target.textContent;
                        const number = parseInt(text.replace(/[^\d]/g, ''));
                        animateCounter(entry.target, number);
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.service-card, .stat-number').forEach(el => {
            observer.observe(el);
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Animate button
            submitBtn.textContent = 'Sending...';
            submitBtn.style.background = 'linear-gradient(45deg, #43e97b, #38f9d7)';
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent! ✓';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                    e.target.reset();
                }, 2000);
            }, 1500);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        });

        // Dynamic typing effect for hero title
        const heroTitle = document.querySelector('.hero h1');
        const titleText = 'Professional Writing Services';
        let index = 0;

        function typeWriter() {
            if (index < titleText.length) {
                heroTitle.textContent = titleText.slice(0, index + 1);
                index++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing effect after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                heroTitle.textContent = '';
                typeWriter();
            }, 1000);
        });

        // Add hover effects to service cards
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Floating particles effect
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = Math.random() * 6 + 4 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(255, 255, 255, 0.8)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '999';
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            particle.style.animation = 'floatUp 8s linear infinite';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 8000);
        }

        // Add floating particles animation
        const floatUpKeyframes = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;

        const style = document.createElement('style');
        style.textContent = floatUpKeyframes;
        document.head.appendChild(style);

        // Create particles periodically
        setInterval(createParticle, 2000);

        // Add click ripple effect
        function createRipple(e) {
            const button = e.currentTarget;
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }

        // Add ripple keyframes
        const rippleKeyframes = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;

        style.textContent += rippleKeyframes;

        // Apply ripple effect to buttons
        document.querySelectorAll('.cta-button, .submit-btn').forEach(button => {
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.addEventListener('click', createRipple);
        });

        // Smooth reveal animations on scroll
        const revealElements = document.querySelectorAll('.service-card, .about-text, .about-image');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => {
            revealObserver.observe(el);
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