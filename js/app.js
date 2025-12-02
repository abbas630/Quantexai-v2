document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Scroll Animations (Subtle)
    AOS.init({ 
        duration: 600, 
        once: true, 
        offset: 30,
        easing: 'ease-out-cubic' 
    });

    // 2. Mobile Nav Logic
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
            // Simple accessible toggle
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close when clicking a link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Secure Contact Form Logic
    const contactForm = document.getElementById('secure-contact-form');
    const transmitBtn = document.getElementById('transmit-btn');
    const RECIPIENT_EMAIL = "abbas@quantexai.info"; 

    if (contactForm && transmitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const originalText = transmitBtn.innerText;
            transmitBtn.innerText = "Processing...";
            transmitBtn.style.opacity = "0.7";

            const formData = new FormData(contactForm);

            fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                transmitBtn.innerText = "Request Sent Successfully";
                transmitBtn.style.backgroundColor = "#10b981"; // Success Green
                transmitBtn.style.opacity = "1";
                contactForm.reset();
                
                setTimeout(() => {
                    transmitBtn.innerText = originalText;
                    transmitBtn.style.backgroundColor = ""; // Revert to CSS default
                }, 4000);
            })
            .catch(error => {
                console.error("Error:", error);
                transmitBtn.innerText = "Error. Please WhatsApp us.";
            });
        });
    }
});
