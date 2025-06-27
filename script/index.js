document.addEventListener('DOMContentLoaded', function() {
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Progress Circles Logic
            const skillItems = document.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
                const circle = item.querySelector('.progress-circle');
                const percent = parseInt(circle.dataset.percent);
                const angle = (percent / 100) * 360; // Convert percentage to degrees
                circle.style.setProperty('--angle', angle + 'deg'); // Set CSS variable
            });

            // Portfolio Filtering Logic
            const filterButtons = document.querySelectorAll('.portfolio-filters button');
            const portfolioItems = document.querySelectorAll('.portfolio-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to the clicked button
                    button.classList.add('active');

                    const filterValue = button.dataset.filter;

                    portfolioItems.forEach(item => {
                        if (filterValue === 'all' || item.classList.contains(filterValue)) {
                            item.style.display = 'block'; // Show item
                        } else {
                            item.style.display = 'none'; // Hide item
                        }
                    });
                });
            });

            // Fixed Side Navigation Active State on Scroll (Intersection Observer)
            const sections = document.querySelectorAll('section[id]'); // Select sections with an ID
            const navLinks = document.querySelectorAll('.fixed-side-nav a');

            const observerOptions = {
                root: null, // viewport
                rootMargin: '0px',
                threshold: 0.5 // When 50% of the section is visible
            };

            const sectionObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const currentSectionId = entry.target.id;
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href').includes(currentSectionId)) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);

            sections.forEach(section => {
                sectionObserver.observe(section);
            });
        });