window.bossIsComing = function(){
  let div = document.createElement('div');
  div.className = 'yetiBoss';

  let h1 = document.createElement('h1');
  let titles = ['Increase Node.js performance', 'NPM: UI library comparisons', 'Upgrading React version and it\'s dependencies', 'Next.JS Boilerplate']
  h1.textContent = titles[Math.floor(Math.random() * titles.length)];

  let img = document.createElement('img');
  let srcs = ['images/code.png', 'images/chart.png'];
  img.src = chrome.runtime.getURL(srcs[Math.floor(Math.random() * srcs.length)]);
  
  div.appendChild(h1);
  div.appendChild(img);

  document.body.appendChild(div)
}

window.bossIsAway = function(){
  let div = document.querySelector('.yetiBoss');
  div !== null && document.body.removeChild(div)
}