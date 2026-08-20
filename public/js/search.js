let hamburgerIcon=document.querySelector(".fa-solid.fa-bars");
let hiddenNav=document.querySelector(".hidden-nav-elements");

hamburgerIcon.addEventListener("click",(event)=>{
    hiddenNav.classList.toggle("active-hamburger");
})