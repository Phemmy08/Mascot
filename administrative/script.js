// Administrative Session JavaScript

// Service data with detailed information
const serviceData = {
    'virtual-assistance': {
        title: 'Virtual Assistance',
        description: 'Comprehensive virtual support services designed to streamline your business operations and boost productivity.',
        features: [
            '24/7 Professional Support',
            'Administrative Task Management',
            'Email Management & Filtering',
            'Calendar & Schedule Coordination',
            'Document Processing & Organization',
            'Customer Service Support',
            'Social Media Management',
            'Data Entry & Research'
        ],
        benefits: [
            'Reduce operational costs by up to 60%',
            'Increase productivity and focus on core business',
            'Access to skilled professionals worldwide',
            'Scalable solutions for growing businesses'
        ]
    },
    'customer-relation': {
        title: 'Customer Relation Service',
        description: 'Build and maintain stronger relationships with your customers through our expert CRM solutions and support services.',
        features: [
            'Multi-channel Customer Support',
            'Complaint Resolution & Management',
            'Customer Feedback Systems',
            'Client Communication Strategies',
            'CRM Software Integration',
            'Customer Satisfaction Surveys',
            'Loyalty Program Management',
            'Customer Data Analytics'
        ],
        benefits: [
            'Improve customer satisfaction rates',
            'Increase customer retention by 25%',
            'Streamline communication processes',
            'Build stronger brand loyalty'
        ]
    },
    'hr-management': {
        title: 'Human Resource Management',
        description: 'Optimize your workforce with our comprehensive HR management solutions tailored to your business needs.',
        features: [
            'Employee Lifecycle Management',
            'Payroll Processing & Benefits',
            'Performance Tracking & Reviews',
            'Policy Development & Compliance',
            'Training & Development Programs',
            'Recruitment & Onboarding',
            'Employee Relations & Support',
            'HR Analytics & Reporting'
        ],
        benefits: [
            'Reduce HR administrative burden',
            'Improve employee satisfaction',
            'Ensure compliance with regulations',
            'Streamline HR processes'
        ]
    },
    'corporate-training': {
        title: 'Corporate Training',
        description: 'Enhance your team\'s skills and capabilities with our tailored corporate training programs and workshops.',
        features: [
            'Customized Training Programs',
            'Leadership Development',
            'Team Building Activities',
            'Professional Skills Workshops',
            'Industry-Specific Training',
            'Online Learning Platforms',
            'Progress Tracking & Assessment',
            'Certification Programs'
        ],
        benefits: [
            'Improve employee performance',
            'Increase team productivity',
            'Develop future leaders',
            'Stay competitive in the market'
        ]
    },
    'interview-management': {
        title: 'Interview Management',
        description: 'Streamline your hiring process with our professional interview management system and expert support.',
        features: [
            'Interview Scheduling & Coordination',
            'Candidate Evaluation Systems',
            'Assessment Tools & Tests',
            'Interview Process Automation',
            'Video Interview Platforms',
            'Candidate Experience Management',
            'Interview Analytics & Reports',
            'Hiring Decision Support'
        ],
        benefits: [
            'Reduce time-to-hire by 40%',
            'Improve candidate quality',
            'Streamline hiring process',
            'Enhance candidate experience'
        ]
    },
    'talent-sourcing': {
        title: 'Talent Sourcing/Recruitment',
        description: 'Find and attract the best talent for your organization with our expert recruitment and sourcing services.',
        features: [
            'Global Talent Sourcing',
            'Skill Assessment & Evaluation',
            'Background Checks & Verification',
            'Placement & Onboarding Services',
            'Headhunting for Executive Roles',
            'Candidate Database Management',
            'Market Research & Analysis',
            'Recruitment Strategy Development'
        ],
        benefits: [
            'Access to global talent pool',
            'Reduce recruitment costs',
            'Faster hiring process',
            'Higher quality candidates'
        ]
    }
};

// Animation and interaction handlers
class AdminSessionManager {
    constructor() {
        this.modal = document.getElementById('serviceModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalContent = document.getElementById('modalContent');
        this.closeBtn = document.querySelector('.close');
        this.contactBtn = document.getElementById('contactBtn');
        this.serviceCards = document.querySelectorAll('.service-card');
        this.serviceBtns = document.querySelectorAll('.service-btn');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initAnimations();
        this.addScrollAnimations();
    }

    bindEvents() {
        // Service card click events
        this.serviceCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const serviceType = card.dataset.service;
                this.showServiceModal(serviceType);
            });
        });

        // Service button click events
        this.serviceBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const serviceType = btn.closest('.service-card').dataset.service;
                this.showServiceModal(serviceType);
            });
        });

        // Modal close events
        this.closeBtn.addEventListener('click', () => {
            this.closeModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Contact button
        this.contactBtn.addEventListener('click', () => {
            this.showContactModal();
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    initAnimations() {
        // Add stagger animation to service cards
        this.serviceCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });

        // Add hover effects with additional animations
        this.serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });
    }

    addHoverEffect(card) {
        const features = card.querySelectorAll('.service-features li');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.transform = 'translateX(10px)';
                feature.style.color = '#667eea';
            }, index * 50);
        });
    }

    removeHoverEffect(card) {
        const features = card.querySelectorAll('.service-features li');
        features.forEach(feature => {
            feature.style.transform = 'translateX(0)';
            feature.style.color = '#555';
        });
    }

    addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        });

        this.serviceCards.forEach(card => {
            observer.observe(card);
        });
    }

    showServiceModal(serviceType) {
        const service = serviceData[serviceType];
        if (!service) return;

        this.modalTitle.textContent = service.title;
        
        const modalHTML = `
            <div class="modal-service-content">
                <p class="modal-description">${service.description}</p>
                
                <div class="modal-section">
                    <h3>Key Features</h3>
                    <ul class="modal-features">
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-section">
                    <h3>Benefits</h3>
                    <ul class="modal-benefits">
                        ${service.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-actions">
                    <button class="modal-btn primary">Get Started</button>
                    <button class="modal-btn secondary">Learn More</button>
                </div>
            </div>
        `;

        this.modalContent.innerHTML = modalHTML;
        this.modal.style.display = 'block';
        
        // Add click handlers to modal buttons
        this.modalContent.querySelectorAll('.modal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.textContent.toLowerCase().replace(' ', '-');
                this.handleModalAction(action, service.title);
            });
        });

        // Add CSS for modal content
        this.addModalStyles();
    }

    showContactModal() {
        this.modalTitle.textContent = 'Get in Touch';
        
        const contactHTML = `
            <div class="modal-contact-content">
                <p class="modal-description">Ready to transform your business operations? Contact us today to discuss your specific needs and get a customized solution.</p>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <h4>📞 Phone</h4>
                        <p>+1 (555) 123-4567</p>
                    </div>
                    <div class="contact-item">
                        <h4>📧 Email</h4>
                        <p>info@yourcompany.com</p>
                    </div>
                    <div class="contact-item">
                        <h4>🌐 Website</h4>
                        <p>www.yourcompany.com</p>
                    </div>
                    <div class="contact-item">
                        <h4>📍 Address</h4>
                        <p>123 Business Ave, Suite 100<br>Your City, State 12345</p>
                    </div>
                </div>
                
                <div class="contact-form">
                    <h4>Send us a message</h4>
                    <form id="contactForm">
                        <div class="form-group">
                            <input type="text" id="name" placeholder="Your Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" placeholder="Your Email" required>
                        </div>
                        <div class="form-group">
                            <select id="service" required>
                                <option value="">Select a Service</option>
                                <option value="virtual-assistance">Virtual Assistance</option>
                                <option value="customer-relation">Customer Relation Service</option>
                                <option value="hr-management">Human Resource Management</option>
                                <option value="corporate-training">Corporate Training</option>
                                <option value="interview-management">Interview Management</option>
                                <option value="talent-sourcing">Talent Sourcing/Recruitment</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <textarea id="message" placeholder="Your Message" rows="4" required></textarea>
                        </div>
                        <button type="submit" class="modal-btn primary">Send Message</button>
                    </form>
                </div>
            </div>
        `;

        this.modalContent.innerHTML = contactHTML;
        this.modal.style.display = 'block';
        
        // Add form submission handler
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmission();
        });

        this.addModalStyles();
    }

    handleContactSubmission() {
        const form = document.getElementById('contactForm');
        const formData = new FormData(form);
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#28a745';
            
            setTimeout(() => {
                this.closeModal();
                this.showSuccessMessage();
            }, 1500);
        }, 2000);
    }

    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <div class="success-icon">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>We'll get back to you within 24 hours.</p>
            </div>
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 4000);
    }

    handleModalAction(action, serviceTitle) {
        if (action === 'get-started') {
            this.closeModal();
            this.showContactModal();
        } else if (action === 'learn-more') {
            // Simulate navigation to detailed service page
            this.showNotification(`Redirecting to ${serviceTitle} details...`);
            setTimeout(() => {
                this.closeModal();
            }, 1500);
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.modalContent.innerHTML = '';
    }

    addModalStyles() {
        // Add dynamic styles for modal content
        const style = document.createElement('style');
        style.textContent = `
            .modal-service-content {
                max-height: 70vh;
                overflow-y: auto;
            }
            
            .modal-description {
                font-size: 1.1rem;
                line-height: 1.6;
                color: #555;
                margin-bottom: 30px;
            }
            
            .modal-section {
                margin-bottom: 25px;
            }
            
            .modal-section h3 {
                color: #333;
                margin-bottom: 15px;
                font-size: 1.3rem;
                border-bottom: 2px solid #667eea;
                padding-bottom: 5px;
            }
            
            .modal-features, .modal-benefits {
                list-style: none;
                padding: 0;
            }
            
            .modal-features li, .modal-benefits li {
                padding: 8px 0;
                position: relative;
                padding-left: 25px;
                color: #555;
                border-bottom: 1px solid #eee;
            }
            
            .modal-features li::before {
                content: '🔹';
                position: absolute;
                left: 0;
            }
            
            .modal-benefits li::before {
                content: '✨';
                position: absolute;
                left: 0;
            }
            
            .modal-actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
                justify-content: center;
            }
            
            .modal-btn {
                padding: 12px 30px;
                border: none;
                border-radius: 25px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                min-width: 120px;
            }
            
            .modal-btn.primary {
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
            }
            
            .modal-btn.secondary {
                background: transparent;
                color: #667eea;
                border: 2px solid #667eea;
            }
            
            .modal-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
            }
            
            .contact-info {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin: 30px 0;
            }
            
            .contact-item {
                text-align: center;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
                transition: transform 0.3s ease;
            }
            
            .contact-item:hover {
                transform: translateY(-5px);
            }
            
            .contact-item h4 {
                color: #333;
                margin-bottom: 10px;
                font-size: 1.1rem;
            }
            
            .contact-item p {
                color: #666;
                margin: 0;
            }
            
            .contact-form {
                margin-top: 30px;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 10px;
            }
            
            .contact-form h4 {
                color: #333;
                margin-bottom: 20px;
                text-align: center;
            }
            
            .form-group {
                margin-bottom: 15px;
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 12px;
                border: 2px solid #ddd;
                border-radius: 8px;
                font-size: 1rem;
                transition: border-color 0.3s ease;
            }
            
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #667eea;
            }
            
            .success-message {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 3000;
                animation: fadeIn 0.3s ease;
            }
            
            .success-content {
                background: white;
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                animation: slideIn 0.4s ease;
            }
            
            .success-icon {
                font-size: 4rem;
                color: #28a745;
                margin-bottom: 20px;
            }
            
            .success-content h3 {
                color: #333;
                margin-bottom: 10px;
            }
            
            .success-content p {
                color: #666;
            }
            
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #667eea;
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 2500;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            @media (max-width: 768px) {
                .modal-actions {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .modal-btn {
                    width: 100%;
                    margin-bottom: 10px;
                }
                
                .contact-info {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        // Remove existing style if present
        const existingStyle = document.querySelector('style[data-modal-styles]');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        style.setAttribute('data-modal-styles', 'true');
        document.head.appendChild(style);
    }
}

// Utility functions for enhanced animations
class AnimationUtils {
    static addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.service-card');
            
            parallaxElements.forEach((element, index) => {
                const rate = scrolled * -0.5;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    static addTypingEffect(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }
    
    static addCounterAnimation(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const adminSession = new AdminSessionManager();
    
    // Add some additional interactive effects
    setTimeout(() => {
        AnimationUtils.addParallaxEffect();
    }, 1000);
    
    // Add smooth scrolling for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Add loading animation completion
    document.body.classList.add('loaded');
});

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdminSessionManager, AnimationUtils };
}









// Navigation Bar Functionality
class NavigationManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.addScrollEffect();
    }
    
    bindEvents() {
        // Hamburger menu toggle
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Close mobile menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }
    
    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
    
    addScrollEffect() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});