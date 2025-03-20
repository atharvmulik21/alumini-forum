// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
    }
    
    if (testimonials.length > 0) {
        // Initialize testimonial display
        showTestimonial(currentTestimonial);
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Dashboard Tabs
    const dashboardTabs = document.querySelectorAll('.dashboard-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (dashboardTabs.length > 0 && tabContents.length > 0) {
        dashboardTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const target = this.getAttribute('data-tab');
                
                // Update active tab
                dashboardTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show target content
                tabContents.forEach(content => {
                    if (content.getAttribute('id') === target) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }
    
    // Form Validation
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const postJobForm = document.getElementById('post-job-form');
    
    // Login Form Validation
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            let isValid = true;
            
            // Simple validation
            if (!email || !validateEmail(email)) {
                showError('login-email', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('login-email');
            }
            
            if (!password) {
                showError('login-password', 'Please enter your password');
                isValid = false;
            } else {
                clearError('login-password');
            }
            
            if (isValid) {
                // Simulate login
                simulateLogin(email);
            }
        });
    }
    
    // Signup Form Validation
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            const userType = document.querySelector('input[name="user-type"]:checked')?.value;
            let isValid = true;
            
            // Simple validation
            if (!name) {
                showError('signup-name', 'Please enter your name');
                isValid = false;
            } else {
                clearError('signup-name');
            }
            
            if (!email || !validateEmail(email)) {
                showError('signup-email', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('signup-email');
            }
            
            if (!password || password.length < 6) {
                showError('signup-password', 'Password must be at least 6 characters');
                isValid = false;
            } else {
                clearError('signup-password');
            }
            
            if (password !== confirmPassword) {
                showError('signup-confirm-password', 'Passwords do not match');
                isValid = false;
            } else {
                clearError('signup-confirm-password');
            }
            
            if (!userType) {
                showError('user-type-error', 'Please select a user type');
                isValid = false;
            } else {
                clearError('user-type-error');
            }
            
            if (isValid) {
                // Simulate signup
                simulateSignup(name, email, userType);
            }
        });
    }
    
    // Post Job Form Validation
    if (postJobForm) {
        postJobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('job-title').value;
            const company = document.getElementById('job-company').value;
            const location = document.getElementById('job-location').value;
            const description = document.getElementById('job-description').value;
            let isValid = true;
            
            // Simple validation
            if (!title) {
                showError('job-title', 'Please enter a job title');
                isValid = false;
            } else {
                clearError('job-title');
            }
            
            if (!company) {
                showError('job-company', 'Please enter a company name');
                isValid = false;
            } else {
                clearError('job-company');
            }
            
            if (!location) {
                showError('job-location', 'Please enter a location');
                isValid = false;
            } else {
                clearError('job-location');
            }
            
            if (!description) {
                showError('job-description', 'Please enter a job description');
                isValid = false;
            } else {
                clearError('job-description');
            }
            
            if (isValid) {
                // Simulate job posting
                simulateJobPost(title, company, location, description);
                postJobForm.reset();
                alert('Job posted successfully!');
            }
        });
    }
    
    // Job Search and Filter
    const jobSearch = document.getElementById('job-search');
    const jobFilter = document.getElementById('job-filter');
    const jobCards = document.querySelectorAll('.job-card');
    
    if (jobSearch && jobFilter && jobCards.length > 0) {
        function filterJobs() {
            const searchTerm = jobSearch.value.toLowerCase();
            const filterValue = jobFilter.value;
            
            jobCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const company = card.querySelector('.job-company').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.job-tag')).map(tag => tag.textContent.toLowerCase());
                
                const matchesSearch = title.includes(searchTerm) || company.includes(searchTerm);
                const matchesFilter = filterValue === 'all' || tags.includes(filterValue.toLowerCase());
                
                if (matchesSearch && matchesFilter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        jobSearch.addEventListener('input', filterJobs);
        jobFilter.addEventListener('change', filterJobs);
    }
    
    // Profile Edit Toggle
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const profileForm = document.getElementById('profile-form');
    const profileInfo = document.getElementById('profile-info');
    
    if (editProfileBtn && profileForm && profileInfo) {
        editProfileBtn.addEventListener('click', function() {
            if (profileForm.style.display === 'none') {
                profileForm.style.display = 'block';
                profileInfo.style.display = 'none';
                editProfileBtn.textContent = 'Cancel';
            } else {
                profileForm.style.display = 'none';
                profileInfo.style.display = 'block';
                editProfileBtn.textContent = 'Edit Profile';
            }
        });
    }
    
    // Admin Panel User Management
    const approveButtons = document.querySelectorAll('.approve-user');
    const restrictButtons = document.querySelectorAll('.restrict-user');
    
    if (approveButtons.length > 0) {
        approveButtons.forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                // Simulate user approval
                alert(`User ${userId} approved!`);
                this.closest('tr').classList.add('approved');
            });
        });
    }
    
    if (restrictButtons.length > 0) {
        restrictButtons.forEach(button => {
            button.addEventListener('click', function() {
                const userId = this.getAttribute('data-user-id');
                // Simulate user restriction
                alert(`User ${userId} restricted!`);
                this.closest('tr').classList.add('restricted');
            });
        });
    }
});

// Helper Functions
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    const errorElement = document.getElementById(`${elementId}-error`) || createErrorElement(elementId);
    
    element.classList.add('error');
    errorElement.textContent = message;
}

function clearError(elementId) {
    const element = document.getElementById(elementId);
    const errorElement = document.getElementById(`${elementId}-error`);
    
    if (element) {
        element.classList.remove('error');
    }
    
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function createErrorElement(elementId) {
    const element = document.getElementById(elementId);
    const errorElement = document.createElement('div');
    
    errorElement.id = `${elementId}-error`;
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
    
    element.parentNode.insertBefore(errorElement, element.nextSibling);
    
    return errorElement;
}

// Authentication Simulation
function simulateLogin(email) {
    // Store user info in localStorage
    const userType = email.includes('alumni') ? 'alumni' : 'student';
    const user = {
        email: email,
        name: email.split('@')[0],
        type: userType
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect to appropriate dashboard
    if (userType === 'alumni') {
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'student_dashboard.html';
    }
}

function simulateSignup(name, email, userType) {
    // Store user info in localStorage
    const user = {
        name: name,
        email: email,
        type: userType
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect to appropriate dashboard
    if (userType === 'alumni') {
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'student_dashboard.html';
    }
}

function simulateJobPost(title, company, location, description) {
    // Get existing jobs from localStorage or initialize empty array
    const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
    
    // Add new job
    jobs.push({
        id: Date.now(),
        title: title,
        company: company,
        location: location,
        description: description,
        postedBy: JSON.parse(localStorage.getItem('currentUser') || '{}').name,
        postedDate: new Date().toLocaleDateString()
    });
    
    // Save updated jobs to localStorage
    localStorage.setItem('jobs', JSON.stringify(jobs));
}

// Check Authentication Status
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        window.location.href = 'login.html';
    }
    
    return JSON.parse(currentUser);
}

// Logout Function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
// Logout Function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
