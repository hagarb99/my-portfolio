document.addEventListener('DOMContentLoaded', () => {
    // 1. Burger Menu Toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('header .nav-links');
    const navLinkItems = document.querySelectorAll('header .nav-links li a');

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            navLinks.classList.toggle('nav-active');

            // Burger Animation
            burger.classList.toggle('toggle');
        });

        // Close menu when a link is clicked (for single-page nav)
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                }
            });
        });
    }

    // 2. Active Navigation Link on Scroll (Scroll Spy)
    const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID
    const headerNavLinks = document.querySelectorAll('header .nav-links a');
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 60; // Get header height for offset, fallback to 60px

    function changeNavOnScroll() {
        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Check if current scroll position is past the top of the section,
            // minus the header height and a small buffer (e.g., 20px)
            if (pageYOffset >= sectionTop - headerHeight - 20) {
                currentSectionId = section.getAttribute('id');
            }
        });

        headerNavLinks.forEach(link => {
            link.classList.remove('active'); // Remove active class from all links
            const linkHref = link.getAttribute('href'); // e.g., "#about"

            // Check if the link's href (without '#') matches the current section ID
            if (linkHref && linkHref.substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });

        // Special case: if scrolled to the very top, and 'home' section exists, make 'home' link active.
        // Or if no section is technically "current" (e.g., above the first section),
        // and the first section is 'home', activate it.
        if ( (window.pageYOffset < (sections[0]?.offsetTop - headerHeight - 20) || !currentSectionId) &&
             sections[0]?.id === 'home') {
            headerNavLinks.forEach(link => link.classList.remove('active')); // Clear all
            const homeLink = document.querySelector('header .nav-links a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    if (sections.length > 0 && headerNavLinks.length > 0) {
        window.addEventListener('scroll', changeNavOnScroll);
        changeNavOnScroll(); // Call once on load to set initial active link
    }

    // 3. Contact Form Validation (Basic)
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const nameInput = contactForm.querySelector('#name');
            const emailInput = contactForm.querySelector('#email');
            const messageTextarea = contactForm.querySelector('#message');
            let isValid = true;
            let errors = [];

            // Clear previous custom error messages/styles if you add them later

            if (nameInput.value.trim() === '') {
                isValid = false;
                errors.push("الاسم مطلوب.");
                // Example: nameInput.classList.add('error-input');
            }
            if (emailInput.value.trim() === '') {
                isValid = false;
                errors.push("البريد الإلكتروني مطلوب.");
            } else if (!isValidEmail(emailInput.value.trim())) {
                isValid = false;
                errors.push("الرجاء إدخال بريد إلكتروني صحيح.");
            }
            if (messageTextarea.value.trim() === '') {
                isValid = false;
                errors.push("الرسالة مطلوبة.");
            }

            if (!isValid) {
                e.preventDefault(); // Prevent form submission if validation fails
                alert("الرجاء تصحيح الأخطاء التالية:\n" + errors.join("\n"));
            } else {
                // If you want to handle submission with JavaScript (e.g., using Fetch API to send to a serverless function or backend)
                // you would put e.preventDefault() outside the `if (!isValid)` block,
                // and then handle the submission here.
                // For a simple demo where it might submit to a mailto: or a service like Formspree,
                // you might not need to preventDefault() if valid.
                // For now, let's assume we want to show a success message and reset.
                e.preventDefault(); // Prevent default for demo purposes
                alert('تم إرسال رسالتك بنجاح! (هذه رسالة تجريبية، النموذج لم يرسل بيانات فعليًا)');
                contactForm.reset(); // Clear the form
            }
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 4. Dynamic Year in Footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 5. Optional: Scroll to Top Button (if you decide to add it)
    // HTML (add this before </body>, for example):
    // <button id="scrollToTopBtn" title="Go to top">↑</button>
    //
    // CSS (add this to your style.css):
    /*
    #scrollToTopBtn {
        display: none;
        position: fixed;
        bottom: 25px;
        right: 25px;
        z-index: 999;
        border: none;
        outline: none;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        padding: 12px 16px;
        border-radius: 50%;
        font-size: 20px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transition: opacity 0.3s, visibility 0.3s;
        opacity: 0;
        visibility: hidden;
    }

    #scrollToTopBtn.show {
        opacity: 1;
        visibility: visible;
    }

    #scrollToTopBtn:hover {
        background-color: #0056b3;
    }
    */

    const scrollToTopBtn = document.getElementById('scrollToTopBtn'); // Make sure this ID matches your HTML button

    if (scrollToTopBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        };

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
});