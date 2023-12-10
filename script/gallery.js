

window.onload = function() {
    for(let a of document.querySelectorAll("article > a")) {
        let photoMove = a.firstElementChild;
        let url = a.href;
        // console.log(url);

        const index = url.indexOf("pages");
        const indexEnd = url.lastIndexOf(".");
        let src = url.slice(index + 6, indexEnd).replace("_", ".");
        photoMove.addEventListener("mouseover", () => {
            photoMove.src = '../image/gallery/' + src + '/cover.gif';
        })
        photoMove.addEventListener("mouseout", () => {
            photoMove.src = '../image/gallery/' + src + '/cover.jpg';
        })
    }

}