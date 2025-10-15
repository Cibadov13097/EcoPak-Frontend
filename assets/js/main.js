document.addEventListener('DOMContentLoaded', function(){
  // Year
  var yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  // Hero Swiper
  var fadeSlider = document.querySelector('.hero-fade-slider');
  if(fadeSlider){
    var slides = fadeSlider.querySelectorAll('.hfs-slide');
    var prevBtn = fadeSlider.querySelector('.hfs-prev');
    var nextBtn = fadeSlider.querySelector('.hfs-next');
    var dotsWrap = fadeSlider.querySelector('.hfs-dots');
    var current = 0;
    var timer;

    function renderDots(){
      dotsWrap.innerHTML = '';
      slides.forEach(function(_, idx){
        var b = document.createElement('button');
        if(idx === current) b.classList.add('active');
        b.addEventListener('click', function(){ goTo(idx); });
        dotsWrap.appendChild(b);
      });
    }

    function show(index){
      slides.forEach(function(s){ s.classList.remove('active'); });
      slides[index].classList.add('active');
      var allDots = dotsWrap.querySelectorAll('button');
      allDots.forEach(function(d){ d.classList.remove('active'); });
      if(allDots[index]) allDots[index].classList.add('active');
    }

    function goTo(index){
      current = (index + slides.length) % slides.length;
      show(current);
      restart();
    }

    function next(){ goTo(current + 1); }
    function prev(){ goTo(current - 1); }

    function start(){ timer = setInterval(next, 5000); }
    function stop(){ if(timer) clearInterval(timer); }
    function restart(){ stop(); start(); }

    if(prevBtn) prevBtn.addEventListener('click', prev);
    if(nextBtn) nextBtn.addEventListener('click', next);
    fadeSlider.addEventListener('mouseenter', stop);
    fadeSlider.addEventListener('mouseleave', start);

    renderDots();
    show(current);
    start();
  }

  // Services Swiper
  var servicesEl = document.querySelector('.services-swiper');
  if(servicesEl){
    new Swiper(servicesEl, {
      slidesPerView:1.2,
      spaceBetween:16,
      breakpoints:{
        576:{ slidesPerView:2 },
        768:{ slidesPerView:3 },
        1200:{ slidesPerView:4 }
      },
      pagination:{ el:'.services-swiper .swiper-pagination', clickable:true }
    });
  }

  // Subtle enter animations using Motion One
  if(window && window.Motion){
    var cards = document.querySelectorAll('.feature-card, .service-card, .form-card');
    cards.forEach(function(card, idx){
      Motion.animate(card, { opacity:[0,1], transform:["translateY(12px)","translateY(0)"] }, { duration:.5, delay: .05*idx, easing:'ease-out' });
    });
  }
});


