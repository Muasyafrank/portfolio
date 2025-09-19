// lazy loading

const lazyLoadInstance = new LazyLoad({
      elements_selector: ".lazy"
    });

// theme switcher

const themeToggle = document.getElementById("theme-toggle");
const themeOptions = document.getElementById("theme-options");
const body = document.body;

// show/hide theme options
themeToggle.addEventListener("click",()=>{
    themeOptions.classList.toggle('hidden');
})
document.addEventListener('click',(e)=>{
    if(!themeToggle.contains(e.target) && !themeOptions.contains(e.target)){
        themeOptions.classList.add('hidden')
    }
});

const toggleButton = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    toggleButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
       if (mobileMenu.classList.contains("hidden")) {
        menuIcon.classList.remove("ri-close-line");
        menuIcon.classList.add("ri-menu-line");
      } else {
        menuIcon.classList.remove("ri-menu-line");
        menuIcon.classList.add("ri-close-line");
      }
    });


// Theme selection

const themeOptionEl = document.querySelectorAll('.theme-option');
themeOptionEl.forEach(option => {
    option.addEventListener("click",()=>{
        const theme = option.getAttribute('data-theme');

        body.classList.remove('theme-dark','theme-colorful','theme-neobrutalist')

        if(theme === 'dark'){
            body.classList.add('theme-dark');
        }else if(theme === 'colorful'){
            body.classList.add('theme-colorful')
        }else if(theme === 'neobrutalist'){
            body.classList.add('theme-neobrutalist')
        }
        localStorage.setItem('portfolio-theme',theme);
        themeOptions.classList.add('hidden');
    })
});



// filter projects

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
        
        // Trigger lazyload to check for newly visible images
        lazyLoadInstance.update();
      });
    });


    const contactForm = document.getElementById('contact-form');
    const formLoading = document.getElementById('form-loading');
    const formSuccess = document.getElementById('form-success');
    const sendAnother = document.getElementById('send-another');


    contactForm.addEventListener('submit',async function(e){
        e.preventDefault();
        contactForm.classList.add('hidden');
        formLoading.classList.remove('hidden');

        const formData = {
            name:document.getElementById('name').value,
            email:document.getElementById('email').value,
            subject:document.getElementById('subject').value,
            message:document.getElementById('message').value

        };

        try {
          const res = await fetch("/api/send-message",{
            method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
          });
        } catch (error) {
            const data = await res.json();
        }


        // const submissions = JSON.parse(localStorage.getItem('contact-submissions') || '[]');

        // submissions.push({
        //     ...formData,
        //     date:new Date().toISOString()
        // });
        // localStorage.setItem('contact-submission',JSON.stringify(submissions));

        setTimeout(() => {
            formLoading.classList.add('hidden');
            formSuccess.classList.remove('hidden')
        }, 2000);
    })

    sendAnother.addEventListener('click',()=>{
        contactForm.reset();
        formSuccess.classList.add('hidden');
        contactForm.classList.remove('hidden');
    })

    const sections = document.querySelectorAll('.section');

     function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight * 0.75) &&
        rect.bottom >= 0
      );
    }


    function handleScrollAnimations() {
      sections.forEach(section => {
        if (isInViewport(section)) {
          section.classList.add('visible');
        }
      });
    }

    window.addEventListener('load', handleScrollAnimations);
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
     

     document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.style.backgroundColor = '';
          b.style.color = '';
        });
        
        this.style.backgroundColor = 'var(--primary-color)';
        this.style.color = 'white';
      });
    });
    
    // Set the first filter button as active by default
    document.querySelector('.filter-btn').click();