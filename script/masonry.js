const divContainer = document.querySelector(".masonry");
const imgWidth = 250;
// const imgNumber = 30;


//针对不同网页获取照片
const url = new URL(location.href);
const index = url.pathname.lastIndexOf("/");
// const indexEnd = url.pathname.indexOf(".");
const indexEnd = url.pathname.length;
const imgDate = url.pathname.slice(index + 1, indexEnd).replace("_", ".");

fetch(`../image/gallery/${imgDate}/info.json`)
    .then((Response) => Response.json())
    .then((json) => {
        const info = json;
        // console.log(info);
        return info;
    })
    .then(createImgs)
    .then(preview);

// 加入图片
function createImgs(info) {

    for(let i = 1; i <= info.imgNumber; i++) {
        let src = '../image/gallery/' + imgDate + '/compressed/IMG_ (' + i + ').jpg';
        let img = document.createElement("img");
        let alt = '';
        img.alt = alt;
        img.src = src;
        img.style.width = imgWidth + 'px';
        img.onload = setPositions;
        divContainer.appendChild(img);
    }
}

// createImgs();

// 计算一共有多少列，以及每一列之间的间隙
function cal() {
    let containerWidth = divContainer.clientWidth;  //容器宽度
    
    let columns = Math.floor(containerWidth / imgWidth);
    let spaceNumber = columns + 1;
    let leftSpace = containerWidth - columns * imgWidth;

    let gapSpace = leftSpace / spaceNumber;

    return {
        space: gapSpace,
        columns: columns,
    };

}

// 设置每张图的坐标
function setPositions() {
    let info = cal();
    let nextTops = new Array(info.columns);

    nextTops.fill(0);
    for(let i = 0; i < divContainer.children.length; i++) {
        let img = divContainer.children[i];

        let minTop = Math.min.apply(null, nextTops);
        img.style.top = minTop + 'px';

        let index = nextTops.indexOf(minTop); //使用的是第几列的top值

        nextTops[index] += img.height + info.space;

        let left = (index + 1) * info.space + index * imgWidth;
        img.style.left = left + 'px';
    }
    // 循环结束需要设置容器的高度，不然容器是坍塌的.
    let max = Math.max.apply(null, nextTops);
    divContainer.style.height = max + 'px';
}

let timerId = null;
window.onresize = function() {
    if(timerId) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(setPositions, 300);
}


// 图片预览功能实现
function preview() {
    for(let img of document.querySelectorAll(".masonry img")) {
        img.addEventListener("click", () => {
        let container = document.createElement("div");
        container.classList.add("preview-container");
        container.onclick = function() {
            container.remove();
        }
        // 创建预览图片
        let innerImg = document.createElement("img");
        innerImg.src = img.src.replace("/compressed", "");

        container.onwheel = function (e) {
            e.preventDefault();
            const width = getComputedStyle(innerImg).width.slice(0, -2);
            const height = getComputedStyle(innerImg).height.slice(0, -2);
            
            if(e.deltaY > 0) {
                innerImg.style.width = parseInt(width) * 1.2 + "px";
                innerImg.style.height = parseInt(height) * 1.2 + "px";
            } else if (e.deltaY < 0 && width > 200) {
                innerImg.style.width = parseInt(width) * 0.8 + "px";
                innerImg.style.height = parseInt(height) * 0.8 + "px";
            }
        }



        // 将图片添加到预览器中
        container.appendChild(innerImg);

        document.body.appendChild(container);
        })
    }
}


