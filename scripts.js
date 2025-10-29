(function(){
  'use strict';


  function on(selector, event, handler){
    document.addEventListener(event, function(e){
      if(e.target.closest(selector)) handler(e);
    });
  }


  function initNav(toggleId){
    var btn = document.getElementById(toggleId);
    if(!btn) return;
    btn.addEventListener('click', function(){
      var nav = document.querySelector('.site-nav');
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if(nav){
        nav.style.display = expanded ? '' : 'block';
        nav.style.opacity = expanded ? '' : 0;
        requestAnimationFrame(function(){ if(!expanded) nav.style.opacity = 1; });
      }
    });
  }
  initNav('navToggle'); initNav('navToggle2'); initNav('navToggle3');

  function themeToggle(btnId){
    var btn = document.getElementById(btnId);
    if(!btn) return;
    btn.addEventListener('click', function(){
      var isLight = document.body.classList.toggle('theme-light');
      document.body.classList.toggle('theme-dark', !isLight);
      btn.setAttribute('aria-pressed', String(isLight));
      try{ localStorage.setItem('site-theme','' + (isLight ? 'light' : 'dark')); }catch(e){}
   
      btn.animate([{transform:'scale(0.96)'},{transform:'scale(1)'}],{duration:180,easing:'cubic-bezier(.2,.9,.3,1)'});
    });
  }
  themeToggle('themeToggle'); themeToggle('themeToggle2'); themeToggle('themeToggle3'); themeToggle('themeToggle4');

  try{
    var saved = localStorage.getItem('site-theme');
    if(saved === 'light'){
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    } else {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    }
  }catch(e){}


  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('.card, .project-card, .hero-copy, .glass-card').forEach(function(el){ observer.observe(el); });


  var newsletterForm = document.getElementById('newsletterForm');
  if(newsletterForm){
    newsletterForm.addEventListener('submit', function(ev){
      ev.preventDefault();
      var msg = document.getElementById('newsletterMsg');
      if(msg) msg.textContent = 'Thanks! You are subscribed (testing mode).';
      newsletterForm.reset();
    });
  }


  var contactForm = document.getElementById('contactForm');
  var popup = document.getElementById('popup');
  var closePopup = document.getElementById('closePopup');
  if(contactForm && popup){
    contactForm.addEventListener('submit', function(ev){
      ev.preventDefault();
      popup.setAttribute('aria-hidden','false');
      popup.querySelector('.modal-content').animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,easing:'cubic-bezier(.2,.9,.3,1)'});
    });
  }
  if(closePopup && popup){
    closePopup.addEventListener('click', function(){ popup.setAttribute('aria-hidden','true'); });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') popup.setAttribute('aria-hidden','true'); });
  }


  on('a[href^="#"]','click',function(e){
    var a = e.target.closest('a');
    if(!a) return;
    var href = a.getAttribute('href');
    if(href && href.startsWith('#')){
      var el = document.querySelector(href);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
    }
  });

})();

document.addEventListener('DOMContentLoaded', () => {
const contactForm = document.getElementById('contactForm');
if (contactForm) {
contactForm.addEventListener('submit', () => {
alert('Message received! We’ll get back to you soon. (Testing Mode)');
contactForm.reset();
});
}
});