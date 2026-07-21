
const tabs=[...document.querySelectorAll('.tab')];
const panels=[...document.querySelectorAll('.panel')];
function resetTabScroll(){
  // Move the viewport to the beginning of the newly opened tab content,
  // while keeping the hero/header above it out of view.
  const activePanel=document.querySelector('.panel.active');
  if(!activePanel) return;

  activePanel.scrollIntoView({behavior:'auto',block:'start'});

  // Keep the panel heading visible below the sticky tab navigation.
  const stickyTabs=document.querySelector('.tabs');
  const offset=(stickyTabs?.offsetHeight || 0)+14;
  window.scrollBy({top:-offset,left:0,behavior:'auto'});
}
function openTab(name, updateHash=false){
  tabs.forEach(b=>b.classList.toggle('active',b.dataset.tab===name));
  panels.forEach(p=>p.classList.toggle('active',p.dataset.panel===name));
  if(updateHash) history.replaceState(null,'','#'+name);

  // Wait until the selected panel is visible, then reset the view.
  requestAnimationFrame(resetTabScroll);
}
tabs.forEach(b=>b.addEventListener('click',()=>openTab(b.dataset.tab,true)));
document.querySelectorAll('.side a').forEach(a=>a.addEventListener('click',e=>{
  e.preventDefault(); openTab(a.dataset.target);
  setTimeout(()=>document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth',block:'start'}),60);
}));
document.querySelectorAll('.faq button').forEach(b=>b.addEventListener('click',()=>b.parentElement.classList.toggle('open')));

const input=document.getElementById('searchInput');
input.addEventListener('input',()=>{
  const q=input.value.trim().toLowerCase();
  document.querySelectorAll('mark').forEach(m=>m.replaceWith(m.textContent));
  if(!q) return;
  let first=null;
  panels.forEach(panel=>{
    const walker=document.createTreeWalker(panel,NodeFilter.SHOW_TEXT);
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      if(['SCRIPT','STYLE','BUTTON'].includes(node.parentElement?.tagName)) return;
      const text=node.nodeValue; const idx=text.toLowerCase().indexOf(q);
      if(idx>=0){
        const frag=document.createDocumentFragment();
        frag.append(text.slice(0,idx));
        const mark=document.createElement('mark'); mark.textContent=text.slice(idx,idx+q.length); frag.append(mark);
        frag.append(text.slice(idx+q.length)); node.replaceWith(frag);
        if(!first){first=mark; openTab(panel.dataset.panel);}
      }
    });
  });
  if(first) setTimeout(()=>first.scrollIntoView({behavior:'smooth',block:'center'}),80);
});

document.querySelectorAll('[data-open-tab]').forEach(btn=>{
  btn.addEventListener('click',()=>openTab(btn.dataset.openTab,true));
});

document.querySelector('.print-action')?.addEventListener('click',()=>window.print());
const initial=location.hash.replace('#','');
if(tabs.some(t=>t.dataset.tab===initial)) openTab(initial);


document.querySelectorAll('.footer-links a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    openTab(a.dataset.target);
    setTimeout(() => document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth',block:'start'}), 60);
  });
});


/* ---- Extracted script block ---- */


(function(){
  const target = document.getElementById('scheduleFullscreenTarget');
  const expandBtn = document.getElementById('scheduleExpandBtn');
  const closeBtn = document.getElementById('scheduleCloseFullscreen');
  const scaleEl = document.getElementById('scheduleScale');
  const zoomLabel = document.getElementById('scheduleZoomLabel');
  const zoomIn = document.getElementById('scheduleZoomIn');
  const zoomOut = document.getElementById('scheduleZoomOut');
  const search = document.getElementById('scheduleSearch');
  let zoom = 1;

  function applyZoom(){
    scaleEl.style.transform = `scale(${zoom})`;
    scaleEl.style.width = `${100 / zoom}%`;
    zoomLabel.textContent = `${Math.round(zoom * 100)}%`;
  }

  zoomIn?.addEventListener('click', () => {
    zoom = Math.min(1.4, +(zoom + 0.1).toFixed(2));
    applyZoom();
  });

  zoomOut?.addEventListener('click', () => {
    zoom = Math.max(0.7, +(zoom - 0.1).toFixed(2));
    applyZoom();
  });

  function openSchedule(){
    if (target.requestFullscreen) {
      target.requestFullscreen().catch(() => target.classList.add('fullscreen-fallback'));
    } else {
      target.classList.add('fullscreen-fallback');
    }
  }

  function closeSchedule(){
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    target.classList.remove('fullscreen-fallback');
  }

  expandBtn?.addEventListener('click', openSchedule);
  closeBtn?.addEventListener('click', closeSchedule);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') target.classList.remove('fullscreen-fallback');
  });

  search?.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    let hits = 0;
    document.querySelectorAll('.guide-match').forEach(card => {
      card.classList.remove('search-hidden','search-hit');
      if (!q) return;
      const hit = card.textContent.toLowerCase().includes(q);
      card.classList.add(hit ? 'search-hit' : 'search-hidden');
      if (hit) hits++;
    });

    const help = document.getElementById('scheduleSearchHelp');
    if (!help) return;

    if (!q) {
      help.textContent = 'Matching schedule cells will be highlighted below.';
      return;
    }

    help.textContent = hits
      ? `${hits} matching schedule ${hits === 1 ? 'cell' : 'cells'} found.`
      : 'No match found. Check the complete team code from the official draw results.';

    if (hits) {
      const firstHit = document.querySelector('.guide-match.search-hit');
      if (firstHit) {
        setTimeout(() => {
          firstHit.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
          firstHit.classList.add('search-flash');
          setTimeout(() => firstHit.classList.remove('search-flash'), 1800);
        }, 80);
      }
    }
  });
})();


/* ---- Extracted script block ---- */


(function(){
  const isMobile = window.matchMedia('(max-width: 800px), (pointer: coarse)').matches;

  document.querySelectorAll('a.sponsor-link[href]').forEach(link => {
    if (isMobile) {
      link.removeAttribute('target');
      link.setAttribute('rel','noopener noreferrer');
    }

    link.addEventListener('click', function(event){
      const url = this.getAttribute('href');
      if (!url || url === '#') return;

      if (isMobile) {
        event.preventDefault();
        window.location.assign(url);
      }
    }, {passive:false});
  });
})();


/* ---- Extracted script block ---- */


(function(){
  const overlay = document.getElementById('mobileQuickNavOverlay');
  const openButton = document.getElementById('mobileQuickNavOpen');
  const closeButton = document.getElementById('mobileQuickNavClose');
  const linksContainer = document.getElementById('mobileQuickNavLinks');
  const searchInput = document.getElementById('mobileQuickNavSearch');
  const desktopLinks = Array.from(document.querySelectorAll('.side a[data-target]'));

  if (!overlay || !openButton || !linksContainer) return;

  desktopLinks.forEach((originalLink, index) => {
    const link = originalLink.cloneNode(true);
    link.dataset.originalQuickLink = String(index);
    linksContainer.appendChild(link);
  });

  function openSheet(){
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    setTimeout(() => searchInput?.focus(), 240);
  }

  function closeSheet(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    if (searchInput) {
      searchInput.value='';
      linksContainer.querySelectorAll('a').forEach(link => link.classList.remove('filtered-out'));
    }
  }

  openButton.addEventListener('click', openSheet);
  closeButton?.addEventListener('click', closeSheet);
  overlay.addEventListener('click', event => {
    if (event.target === overlay) closeSheet();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) closeSheet();
  });

  linksContainer.addEventListener('click', event => {
    const clicked = event.target.closest('a[data-original-quick-link]');
    if (!clicked) return;
    event.preventDefault();

    const original = desktopLinks[Number(clicked.dataset.originalQuickLink)];
    closeSheet();

    if (original) {
      setTimeout(() => original.click(), 180);
    }
  });

  searchInput?.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    linksContainer.querySelectorAll('a').forEach(link => {
      link.classList.toggle('filtered-out', Boolean(query) && !link.textContent.toLowerCase().includes(query));
    });
  });
})();
