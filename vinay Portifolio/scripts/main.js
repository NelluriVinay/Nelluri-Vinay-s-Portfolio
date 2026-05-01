document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Toggle icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };
    
    // Trigger once on load
    revealOnScroll();
    
    // Trigger on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // --- Editable Sections Logic ---
    
    // Load saved content on startup
    document.querySelectorAll('.editable-section').forEach(section => {
        const id = section.getAttribute('data-section-id');
        const savedContent = localStorage.getItem('portfolio_section_' + id);
        if (savedContent) {
            section.innerHTML = savedContent;
        }
    });

    window.toggleEdit = function(sectionId) {
        const section = document.querySelector(`[data-section-id="${sectionId}"]`);
        if (!section) return;

        const isEditing = section.classList.contains('is-editing');
        const btn = section.querySelector('.edit-btn');
        
        // Elements to make editable
        const textElements = section.querySelectorAll('h1, h2, h3, h4, p, span.tag, span, li');

        if (!isEditing) {
            // Enable editing
            section.classList.add('is-editing');
            btn.innerHTML = '<i class="fas fa-save"></i> Save';
            
            textElements.forEach(el => {
                // Don't make the edit button itself editable, and don't make icons editable
                if (!btn.contains(el) && !el.classList.contains('fas') && !el.classList.contains('fab')) {
                    el.setAttribute('contenteditable', 'true');
                }
            });
        } else {
            // Disable editing and Save
            section.classList.remove('is-editing');
            btn.innerHTML = '<i class="fas fa-edit"></i> Edit';
            
            textElements.forEach(el => {
                el.removeAttribute('contenteditable');
            });

            // Save to local storage
            localStorage.setItem('portfolio_section_' + sectionId, section.innerHTML);
            
            // Show a brief "Saved!" indicator
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Saved!';
            setTimeout(() => {
                if (!section.classList.contains('is-editing')) {
                    btn.innerHTML = originalText;
                }
            }, 2000);
        }
    };
});
