const navbarMenu = document.querySelector(".menu-nav ul");
const navbarLinks = document.querySelectorAll(".menu-nav a");


// navbarLinks.forEach(elem => elem.addEventListener("click", navbarLinkClick));

for (let i = 0; i < navbarLinks.length; i++) {
    navbarLinks[i].addEventListener("click", navbarLinkClick);
}

function navbarLinkClick(event) {

    smoothScroll(event); // Call the "smoothScroll" function

}

// Smooth-Scrolling

// APPROACH #1 - window.scrollTo() (window.scroll())
function smoothScroll(event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
    window.scrollTo({
        top: targetId === "#" ? 0 : document.querySelector(targetId).offsetTop,
        behavior: "smooth"
    });
}