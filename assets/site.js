(function(){
  var els=document.querySelectorAll('.fade-up');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:0.1});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('visible');});}
  var b=document.getElementById('rc-menu-btn'),m=document.getElementById('rc-menu');
  if(b&&m){
    b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Close menu':'Open menu');});
    m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','Open menu');}});
  }
  var h=document.querySelector('.rc-h1'),words=(h&&h.getAttribute('data-rc-words')||'').split('|');
  if(h&&words.length>1&&!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)){
    var mk=function(w){var el=document.createElement('span');el.className='rc-word';for(var k=0;k<w.length;k++){var c=document.createElement('i');c.textContent=w.charAt(k);c.style.animationDelay=(k*0.05)+'s';el.appendChild(c);}return el;};
    var flip=document.createElement('span');flip.className='rc-flip';flip.setAttribute('aria-hidden','true');
    flip.appendChild(document.createTextNode(h.getAttribute('data-rc-lead')+' '));
    var slot=document.createElement('span');slot.className='rc-slot';flip.appendChild(slot);h.appendChild(flip);h.classList.add('rc-flip-on');
    var fit=function(){var m=0;words.forEach(function(w){var t=mk(w);t.style.cssText='animation:none;visibility:hidden;position:absolute';slot.appendChild(t);m=Math.max(m,t.offsetWidth);slot.removeChild(t);});
      slot.style.minWidth=(m/parseFloat(getComputedStyle(h).fontSize))+'em';};
    fit();if(document.fonts&&document.fonts.ready){document.fonts.ready.then(fit);}
    var n=0,cur=mk(words[0]);slot.appendChild(cur);
    setInterval(function(){if(document.hidden){return;}var old=cur;old.classList.add('rc-out');setTimeout(function(){old.remove();},700);
      n=(n+1)%words.length;cur=mk(words[n]);slot.appendChild(cur);},3000);
  }
  var ps=document.querySelectorAll('[data-rc-panel]');
  function act(p){ps.forEach(function(q){var on=q===p,s=q.querySelector('span');
    q.classList.toggle('w-[400px]',on);q.classList.toggle('w-[60px]',!on);
    ['bottom-6','rotate-0'].forEach(function(c){s.classList.toggle(c,on);});
    ['w-auto','text-left','bottom-24','rotate-90'].forEach(function(c){s.classList.toggle(c,!on);});});}
  ps.forEach(function(p){p.addEventListener('mouseenter',function(){act(p);});p.addEventListener('click',function(){act(p);});});
})();
