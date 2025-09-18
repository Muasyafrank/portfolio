// lazy loading



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

const mobileMenuToggle = document.getElementById('moblie-menu-toggle');
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuToggle.addEventListener('click',()=>{
    mobileMenu.classList.toggle('hidden');
});

const mobileLinks  = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click',()=>{
        mobileMenu.classList.add('hidden');
    })
});
