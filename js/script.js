document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Consider header height for accurate scroll position
                const headerOffset = document.querySelector('header')?.offsetHeight || 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                // Close mobile nav if open
                if (navLinks.classList.contains('nav-open')) {
                    navLinks.classList.remove('nav-open');
                    document.body.classList.remove('nav-open');
                }
            }
        });
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
            document.body.classList.toggle('nav-open'); 
        });
    }
    

    // Project Category Filtering
    const categoryLinks = document.querySelectorAll('.category-nav a');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');

    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Active class for button
            categoryLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category').split(' ');
                if (filter === 'all' || cardCategories.includes(filter)) {
                    card.style.display = 'flex'; //
                    card.classList.remove('filtered-out'); // For animation
                    setTimeout(() => card.classList.add('animate-in'), 50); // Re-trigger animation
                } else {
                    card.style.display = 'none';
                    card.classList.add('filtered-out');
                    card.classList.remove('animate-in');
                }
            });
        });
    });

    // Scroll Animations for elements
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-item');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Update current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navHeaderLinks = document.querySelectorAll('header .nav-links a');

    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - (varHeaderHeight + 50);
            let sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navHeaderLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });

        if (scrollY < sections[0].offsetTop - (varHeaderHeight + 50)) {
            navHeaderLinks.forEach(link => link.classList.remove("active"));
            const homeLink = document.querySelector('header .nav-links a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }
    const varHeaderHeight = document.querySelector('header')?.offsetHeight || 70;
    navHighlighter(); 

});