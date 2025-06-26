document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
        anchor.addEventListener('click',(e)=>{
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollItoView({
                behavior:"smooth"
            })
        })
    })
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item =>{
    const circle = item.querySelector('.progress-circle');
    const percent = parseInt(circle.dataset.percent);
    const angle = (percent / 100) * 360;
    circle.style.setProperty('--angle',angle + 'deg')
})
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.fixed-side-nav i');
const observerOptions = {
    root:null,
    rootMargin:'0px',
    threshold:0.5
};
const sectionObserver = new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry =>{
        const currentSectionId = entry.target.id;
        navLinks.forEach(link =>{
            link.classList.remove('actiive');
            if(link.getAttribute('href').includes(currentSectionId)){
                link.classList.add('active')
            }
        })
    })
})
})