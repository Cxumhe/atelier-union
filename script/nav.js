const navToggle = document.querySelector(".navToggle input");
const navul = document.querySelector(".navul");
const nav = document.querySelector("nav");

const spans = document.querySelectorAll(".navToggle span");

const themeToggle = document.querySelector(".navul input");
const html = document.querySelector("html");


const logo = document.querySelector("nav header a img");

navToggle.addEventListener("change", () => {
    navul.style.transition = ".2s";

    if(navToggle.checked) {
        navul.style.height = "auto";
        // 解构赋值
        const { height } = navul.getBoundingClientRect();
        navul.style.height = 0;
        // 强行渲染一次，否则直接渲染最终状态，随便读一个数值
        navul.offsetHeight;
        navul.style.height = height + "px";


        for(let span of spans) {
            span.style.top = 18.26 + 'px';
        }
        spans[0].style.transform = 'rotate(135deg)';
        spans[1].style.transform = 'rotate(135deg)';
        spans[2].style.transform = 'rotate(45deg)';
    } else {
        navul.style.transition = ".2s";
        navul.style.height = 0;
        for(let span of spans) {
            span.style.transform = 'none';
        }
        spans[0].style.top = 8.26 + 'px';
        spans[1].style.top = 18.26 + 'px';
        spans[2].style.top = 28.26 + 'px';
    }
    navul.addEventListener("transitionend", transitionEndHandler, { once: true });
})

    // 过渡结束后删除transition
function transitionEndHandler() {
    navul.style.transition = "";
}


window.onresize = function() {
    // console.log(document.body.clientWidth);
    if(document.body.clientWidth >= '678') {
        navul.style.height = 'auto';
    } else {
        navul.style.height = 0;
        for(let span of spans) {
            span.style.transform = 'none';
        }
        spans[0].style.top = 8.26 + 'px';
        spans[1].style.top = 18.26 + 'px';
        spans[2].style.top = 28.26 + 'px';
    }
}

function themeChange() {
    function changeDarkTheme() {
        if(html.getAttribute('data-theme') !== 'dark') {
            html.setAttribute('data-theme', 'dark');
            logo.src = logo.src.replace('.svg', '_white.svg');
        }
    }

    function changeLightTheme() {
        if(html.getAttribute('data-theme') !== 'white') {
            html.setAttribute('data-theme', 'white');
            logo.src = logo.src.replace('_white.svg', '.svg');
        }
    }

    themeToggle.addEventListener("change", () => {
        if(html.getAttribute('data-theme') === 'white') {
            changeDarkTheme();
        } else {
            changeLightTheme();
        }
    })

    const themeMedia = window.matchMedia("(prefers-color-scheme: light)");

    if(themeMedia.matches) {
        changeLightTheme();
    } else {
        changeDarkTheme();
    }

    themeMedia.addEventListener("change", (e) => {
        if(e.matches) {
            changeLightTheme();
        } else {
            changeDarkTheme();
        }
    })
}

themeChange();