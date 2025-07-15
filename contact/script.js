// Form handling and validation
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('contactForm');
            const submitBtn = document.getElementById('submitBtn');
            const successMessage = document.getElementById('successMessage');

            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    showLoadingState();
                    
                    // Submit form using FormSubmit
                    const formData = new FormData(form);
                    
                    fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            showSuccessState();
                            form.reset();
                            clearValidation();
                        } else {
                            showErrorState();
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        showErrorState();
                    });
                }
            });

            function validateForm() {
                let isValid = true;
                const formGroups = form.querySelectorAll('.form-group');
                
                formGroups.forEach(group => {
                    const input = group.querySelector('input, select, textarea');
                    if (input && input.hasAttribute('required')) {
                        if (!input.value.trim()) {
                            showFieldError(group);
                            isValid = false;
                        } else if (input.type === 'email' && !isValidEmail(input.value)) {
                            showFieldError(group);
                            isValid = false;
                        } else if (input.name === 'message' && input.value.trim().length < 10) {
                            showFieldError(group);
                            isValid = false;
                        } else {
                            clearFieldError(group);
                        }
                    }
                });
                
                return isValid;
            }

            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            function showFieldError(group) {
                group.classList.add('error');
            }

            function clearFieldError(group) {
                group.classList.remove('error');
            }

            function clearValidation() {
                const formGroups = form.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.classList.remove('error');
                });
            }

            function showLoadingState() {
                submitBtn.classList.add('loading');
                submitBtn.querySelector('.btn-text').textContent = 'Sending...';
                submitBtn.querySelector('.btn-icon-left i').className = 'fas fa-spinner';
                submitBtn.disabled = true;
            }

            function showSuccessState() {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                submitBtn.querySelector('.btn-text').textContent = 'Message Sent';
                submitBtn.querySelector('.btn-icon-left i').className = 'fas fa-check';
                
                successMessage.classList.add('show');
                
                setTimeout(() => {
                    resetButtonState();
                    successMessage.classList.remove('show');
                }, 5000);
            }

            function showErrorState() {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('error');
                submitBtn.querySelector('.btn-text').textContent = 'Try Again';
                submitBtn.querySelector('.btn-icon-left i').className = 'fas fa-exclamation-triangle';
                
                setTimeout(() => {
                    resetButtonState();
                }, 3000);
            }

            function resetButtonState() {
                submitBtn.classList.remove('loading', 'success', 'error');
                submitBtn.querySelector('.btn-text').textContent = 'Send Message';
                submitBtn.querySelector('.btn-icon-left i').className = 'fas fa-paper-plane';
                submitBtn.disabled = false;
            }

            // Real-time validation
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    const group = this.closest('.form-group');
                    if (group.classList.contains('error')) {
                        clearFieldError(group);
                    }
                });
            });
        });




        document.getElementById('mobileToggle').addEventListener('click', function() {
    document.getElementById('mobileMenu').classList.toggle('active');
});