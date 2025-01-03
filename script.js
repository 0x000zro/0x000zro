document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.querySelector('#mainNav ul');

    mobileNavToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Form submission with basic validation
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('[name="name"]').value;
        const email = this.querySelector('[name="email"]').value;
        const message = this.querySelector('[name="message"]').value;

        if(name && email && message) {
            // Here you might want to add AJAX to send form data to a server
            alert('Form submitted successfully!');
            this.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });
});