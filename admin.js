// Admin Authentication
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is on admin page and verify admin status
    if (document.querySelector('.admin-page')) {
        if (typeof checkAdminAuth === 'function') {
            checkAdminAuth();
        } else {
            console.error('checkAdminAuth function is not defined.');
        }
    }

    // Admin Login Form
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;
            const errorElement = document.getElementById('admin-login-error');

            // Simple admin authentication (in a real app, this would be server-side)
            if (username === 'admin' && password === 'admin123') {
                // Store admin status in localStorage
                localStorage.setItem('adminAuthenticated', 'true');
                localStorage.setItem('currentUser', JSON.stringify({
                    name: 'Administrator',
                    email: 'admin@alumniconnect.edu',
                    type: 'admin'
                }));

                // Redirect to admin panel
                window.location.href = 'admin.html';
            } else {
                // Show error message
                errorElement.textContent = 'Invalid username or password. Please try again.';
                errorElement.style.display = 'block';
            }
        });
    }
});

// Admin Logout
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear admin authentication
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('currentUser');
        
        // Redirect to home page
        window.location.href = 'index.html';
    });
}

// Admin Panel Navigation
const adminNavLinks = document.querySelectorAll('.admin-nav a');
const adminSections = document.querySelectorAll('.admin-section');

if (adminNavLinks.length > 0 && adminSections.length > 0) {
    adminNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // Update active link
            adminNavLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            adminSections.forEach(section => {
                if (section.id === targetSection) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });
}

// Content Moderation Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show target content
            tabContents.forEach(content => {
                if (content.id === targetTab) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });
}

// User Management
const userSearch = document.getElementById('user-search');
const userTypeFilter = document.getElementById('user-type-filter');
const userStatusFilter = document.getElementById('user-status-filter');
const selectAllUsers = document.getElementById('select-all-users');
const userCheckboxes = document.querySelectorAll('.user-select');

// Search and filter users
if (userSearch && userTypeFilter && userStatusFilter) {
    function filterUsers() {
        const searchTerm = userSearch.value.toLowerCase();
        const typeFilter = userTypeFilter.value;
        const statusFilter = userStatusFilter.value;
        
        const userRows = document.querySelectorAll('.admin-table tbody tr');
        
        userRows.forEach(row => {
            const userName = row.querySelector('.user-info span').textContent.toLowerCase();
            const userEmail = row.querySelectorAll('td')[2].textContent.toLowerCase();
            const userType = row.querySelector('.badge').textContent.toLowerCase();
            const userStatus = row.querySelectorAll('td')[4].querySelector('.badge').textContent.toLowerCase();
            
            const matchesSearch = userName.includes(searchTerm) || userEmail.includes(searchTerm);
            const matchesType = typeFilter === '' || userType === typeFilter;
            const matchesStatus = statusFilter === '' || userStatus === statusFilter;
            
            if (matchesSearch && matchesType && matchesStatus) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }
    
    userSearch.addEventListener('input', filterUsers);
    userTypeFilter.addEventListener('change', filterUsers);
    userStatusFilter.addEventListener('change', filterUsers);
}

// Select all users
if (selectAllUsers && userCheckboxes.length > 0) {
    selectAllUsers.addEventListener('change', function() {
        userCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
}

// User action buttons
const approveUserButtons = document.querySelectorAll('.approve-user');
if (approveUserButtons.length > 0) {
    approveUserButtons.forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            const userRow = this.closest('tr');
            const statusCell = userRow.querySelectorAll('td')[4];
            
            // Update user status
            statusCell.innerHTML = '<span class="badge active">Active</span>';
            
            // Show success message
            alert(`User ID ${userId} has been approved.`);
        });
    });
}

// Bulk actions
const bulkActionSelect = document.getElementById('bulk-action');
const bulkActionButton = document.querySelector('.bulk-actions .btn');

if (bulkActionSelect && bulkActionButton) {
    bulkActionButton.addEventListener('click', function() {
        const selectedAction = bulkActionSelect.value;
        if (!selectedAction) return;
        
        const selectedUsers = [];
        userCheckboxes.forEach((checkbox, index) => {
            if (checkbox.checked) {
                selectedUsers.push(index + 1); // User ID (for demo purposes)
            }
        });
        
        if (selectedUsers.length === 0) {
            alert('Please select at least one user.');
            return;
        }
        
        // Perform bulk action
        switch (selectedAction) {
            case 'approve':
                alert(`Approved ${selectedUsers.length} users.`);
                break;
            case 'restrict':
                alert(`Restricted ${selectedUsers.length} users.`);
                break;
            case 'delete':
                if (confirm(`Are you sure you want to delete ${selectedUsers.length} users? This action cannot be undone.`)) {
                    alert(`Deleted ${selectedUsers.length} users.`);
                }
                break;
        }
    });
}

// Initialize charts if Chart.js is available
if (typeof Chart !== 'undefined') {
    // User Growth Chart
    const userGrowthChart = document.getElementById('userGrowthChart');
    if (userGrowthChart) {
        new Chart(userGrowthChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'New Users',
                    data: [65, 78, 90, 115, 135, 150],
                    borderColor: '#3a5a78',
                    backgroundColor: 'rgba(58, 90, 120, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'User Growth Over Time'
                    }
                }
            }
        });
    }
    
    // User Demographics Chart
    const userDemographicsChart = document.getElementById('userDemographicsChart');
    if (userDemographicsChart) {
        new Chart(userDemographicsChart, {
            type: 'doughnut',
            data: {
                labels: ['Alumni', 'Students', 'Faculty', 'Admins'],
                datasets: [{
                    data: [875, 370, 120, 15],
                    backgroundColor: [
                        '#3a5a78',
                        '#f8b400',
                        '#28a745',
                        '#dc3545'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: 'User Distribution by Type'
                    }
                }
            }
        });
    }
    
    // Engagement Chart
    const engagementChart = document.getElementById('engagementChart');
    if (engagementChart) {
        new Chart(engagementChart, {
            type: 'bar',
            data: {
                labels: ['Posts', 'Comments', 'Job Applications', 'Event RSVPs', 'Connections'],
                datasets: [{
                    label: 'Last Month',
                    data: [120, 350, 75, 180, 210],
                    backgroundColor: '#3a5a78'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Platform Engagement Metrics'
                    }
                }
            }
        });
    }
}

// Settings Forms
const generalSettingsForm = document.getElementById('general-settings-form');
const emailSettingsForm = document.getElementById('email-settings-form');
const securitySettingsForm = document.getElementById('security-settings-form');

if (generalSettingsForm) {
    generalSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('General settings saved successfully!');
    });
}

if (emailSettingsForm) {
    emailSettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Email settings saved successfully!');
    });
}

if (securitySettingsForm) {
    securitySettingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Security settings saved successfully!');
    });
}

if (!isAdmin) {
    // Redirect to admin login page
    window.location.href = 'admin-login.html';
}

if (chartControls.length > 0) {
    chartControls.forEach(control => {
        control.addEventListener('click', function() {
            const controlGroup = this.parentElement.querySelectorAll('.chart-control');
            controlGroup.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // In a real application, this would update the chart data
            // For demo purposes, we'll just show an alert
            const period = this.getAttribute('data-period');
            const chart = this.getAttribute('data-chart');
            
            if (period) {
                console.log(`Updating chart to show ${period} data`);
            } else if (chart) {
                console.log(`Switching chart to show ${chart} data`);
            }
        });
    });
}

// Define isAdmin based on localStorage
const isAdmin = localStorage.getItem('adminAuthenticated') === 'true';

// Check admin authentication
function checkAdminAuth() {
    if (!isAdmin) {
        window.location.href = 'admin-login.html';
    }
}

// Admin Authentication
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.admin-page')) {
        if (typeof checkAdminAuth === 'function') {
            checkAdminAuth();
        } else {
            console.error('checkAdminAuth function is not defined.');
        }
    }

    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('admin-username').value;
            const password = document.getElementById('admin-password').value;
            const errorElement = document.getElementById('admin-login-error');

            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('adminAuthenticated', 'true');
                localStorage.setItem('currentUser', JSON.stringify({
                    name: 'Administrator',
                    email: 'admin@alumniconnect.edu',
                    type: 'admin'
                }));
                window.location.href = 'admin.html';
            } else {
                errorElement.textContent = 'Invalid username or password. Please try again.';
                errorElement.style.display = 'block';
            }
        });
    }
});

// Sidebar Toggle for Mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const adminSidebar = document.querySelector('.admin-sidebar');

if (mobileMenuBtn && adminSidebar) {
    mobileMenuBtn.addEventListener('click', () => {
        adminSidebar.classList.toggle('open');
    });
}