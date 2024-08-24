// Navigation Bar

let menuIcon = document.querySelector('svg.icon');
let navigation = document.querySelector('nav');
let header = document.querySelector('header');

function toggleNav() {
  navigation.classList.toggle('toggle');
  header.classList.toggle('toggle');
}

menuIcon.addEventListener('click', toggleNav);

// Dark Mode Button
const storageKey = 'theme-preference';

const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  setPreference();
};

const getColorPreference = () => {
  if (localStorage.getItem(storageKey))
    return localStorage.getItem(storageKey);
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
};

const reflectPreference = () => {
  document.firstElementChild.setAttribute('data-theme', theme.value);

  const themeToggle = document.querySelector('#theme-toggle');
  if (themeToggle) {
    themeToggle.setAttribute('aria-label', theme.value);
  }

  if (theme.value === 'dark') {
    addDarkThemeCSS();
  } else {
    removeDarkThemeCSS();
  }
};

const addDarkThemeCSS = () => {
  const style = document.createElement('style');
  style.id = 'dark-theme-css';
  style.textContent = `
    nav {
      background-color: #000000;
      opacity: 0.8;
      border-bottom: 2px solid #c5c5c5;
    }

    nav a:hover {
      color: #bcbeff;
    }

    .i:hover {
      transition-property: background-color 1s, color 1s;
      transition-duration: 1s;
      background-color: rgb(84, 16, 148);
      color: rgb(214, 214, 214);
    }

    .h:hover {
      transition-property: color;
      transition-duration: 1s;
      color: #3f54bd;
    }

    body {
      color: #efeff0;
    }

    .main {
      background: #1d1f21;
    }

    .experience {
      background-color: #1d1f21;
    }

    .involve {
      background-color: #1d1f21;
    }

    .photography {
      background-color: #1d1f21;
    }

    .name:hover {
      color: #ffffff;
    }

    a:link {
      color: papayawhip;
    }

    a:visited {
      color: white;
    }

    .dd, .ff, .hh, .n, .p, .r {
      background-color: rgba(74, 66, 66, 0.705);
      padding: 10px;
      text-align: center;
    }

    svg.icon > line {
      stroke: white;
    }
  `;
  document.head.appendChild(style);
};

const removeDarkThemeCSS = () => {
  const style = document.createElement('style');
  style.id = 'dark-theme-css';
  style.textContent = `
    body {
    color:#000000;
    }

    .n, .r, .p {
        background-color: rgba(255, 255, 255, 0.405);
        padding:10px;
        text-align: center;
    }
    
    .dd, .ff, .hh {
        background-color: rgba(255, 255, 255, 0.405);
        padding:10px;
        text-align: center;
    }

    .main {
      /*background-image: url("images/bg1.jpeg");
      background-size: cover;*/
      background-color: #fdfeff;
    }
    
    .experience {
        background-color: #fdfeff;
    }
    
    .involve {
        background-color: #fdfeff;
    }
    
    .photography {
        background-color: #fdfeff;
    }
    .i:hover { /*NYU*/
      transition-property: background-color 1s, color 1s;
      transition-duration: 1s;
      background-color:blueviolet;
      color:white;
    }

    .h:hover{ /*name*/
        transition-property: color;
        transition-duration: 1s;
        color: #048ecf;
    }

    /* Links */
    a:link {
        color: #460000;
        text-decoration: none;
    }

    a:visited {
        color: #380000;
        text-decoration: none;
    }

    a:hover {
        color: black;
        text-decoration: none;
    }

    a:active {
        color: white;
        text-decoration: none;
    }

    nav{
      display:none;
      padding: 15px; 
      background-color: #ffffff;
      opacity: 0.8;
      border-bottom: 2px solid #606060;
    }

    nav > a {
      margin: 15px;
    }

    nav a:hover {
      font-size:larger;
      transition-property: font-size;
      transition-duration: 250ms;
      color: #000; 
    }

    svg.icon > line {
      stroke: black;
    }
    
      
  `;
  document.head.appendChild(style);
};

const theme = {
  value: getColorPreference(),
};

reflectPreference();

window.onload = () => {
  reflectPreference();
  document.querySelector('#theme-toggle').addEventListener('click', onClick);
};

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ({matches: isDark}) => {
  theme.value = isDark ? 'dark' : 'light';
  setPreference();
});
