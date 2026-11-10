(function(){
  var d=document,b=d.body;
  // aktywna zakladka podstrony widoczna
  var za=d.querySelector('.zak .akt');if(za){var zw=za.parentNode;zw.scrollLeft=za.offsetLeft-zw.offsetLeft-16;}
  // menu mobilne
  var bg=d.querySelector('.burger');
  if(bg){bg.addEventListener('click',function(){var o=b.classList.toggle('menu-otw');bg.setAttribute('aria-expanded',o?'true':'false');});}
  d.querySelectorAll('.mm a').forEach(function(a){a.addEventListener('click',function(){b.classList.remove('menu-otw');});});

  // galerie przesuwane palcem i mysza
  d.querySelectorAll('.sw').forEach(function(sw){
    var t=sw.querySelector('.sw-t'),n=sw.querySelector('.sw-n'),p=sw.querySelector('.sw-p'),x=sw.querySelector('.sw-x');
    var it=t.children.length;
    function krok(){var c=t.children[0];if(!c)return t.clientWidth;var g=parseFloat(getComputedStyle(t).columnGap)||0;return c.getBoundingClientRect().width+g;}
    function stan(){
      var i=Math.round(t.scrollLeft/krok());
      if(n)n.textContent=Math.min(i+1,it)+' / '+it;
      if(p)p.disabled=t.scrollLeft<4;
      if(x)x.disabled=t.scrollLeft+t.clientWidth>=t.scrollWidth-4;
    }
    if(p)p.addEventListener('click',function(){t.scrollBy({left:-krok(),behavior:'smooth'});});
    if(x)x.addEventListener('click',function(){t.scrollBy({left:krok(),behavior:'smooth'});});
    t.addEventListener('scroll',function(){window.requestAnimationFrame(stan);},{passive:true});
    var dn=false,sx=0,sl=0,mv=0;
    t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse'||e.button!==0)return;dn=true;mv=0;sx=e.clientX;sl=t.scrollLeft;});
    window.addEventListener('pointermove',function(e){if(!dn)return;var dx=e.clientX-sx;mv=Math.max(mv,Math.abs(dx));if(mv>4){t.classList.add('ciag');t.scrollLeft=sl-dx;}});
    window.addEventListener('pointerup',function(){if(!dn)return;dn=false;if(t.classList.contains('ciag')){t.classList.remove('ciag');var k=krok();t.scrollTo({left:Math.round(t.scrollLeft/k)*k,behavior:'smooth'});}});
    t.addEventListener('click',function(e){if(mv>4){e.preventDefault();e.stopPropagation();mv=0;}},true);
    t.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){t.scrollBy({left:krok(),behavior:'smooth'});e.preventDefault();}if(e.key==='ArrowLeft'){t.scrollBy({left:-krok(),behavior:'smooth'});e.preventDefault();}});
    stan();
  });

  // dolny pasek po przewinieciu za przyciski
  var mob=d.querySelector('.mob'),cel=d.querySelector('[data-pasek]');
  if(mob&&cel&&'IntersectionObserver' in window){
    new IntersectionObserver(function(e){var r=e[0];mob.classList.toggle('widac',!r.isIntersecting&&r.boundingClientRect.top<0);}).observe(cel);
  }

  // formularz pokazowy
  d.querySelectorAll('form.form').forEach(function(f){
    f.addEventListener('submit',function(e){e.preventDefault();var i=f.querySelector('.form-info');if(i){i.classList.add('widac');i.focus();}});
  });

  // zgody cookies
  var z=d.querySelector('.zgody'),k='alfa-zgody',v=null;
  try{v=localStorage.getItem(k);}catch(e){}
  if(z&&!v){z.classList.add('widac');}
  if(z){z.querySelectorAll('[data-zgoda]').forEach(function(bt){bt.addEventListener('click',function(){try{localStorage.setItem(k,bt.getAttribute('data-zgoda'));}catch(e){}z.classList.remove('widac');});});}
  d.querySelectorAll('[data-ustawienia-cookies]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();if(z)z.classList.add('widac');});});
})();
