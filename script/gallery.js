
window.onload = function () {
    for(let a of document.querySelectorAll("article > a picture")) {
        let photoMove = a.querySelector("img");
        // console.log(photoMove);
        photoMove.addEventListener("mouseover", () => {
            a.children[0].srcset = a.children[0].srcset.replace("_480w.webp", "GIF.webp");
            a.children[1].srcset = a.children[1].srcset.replace("_800w.webp", "GIF.webp");
            photoMove.src = photoMove.src.replace(".webp", "GIF.webp");
        })
        photoMove.addEventListener("mouseout", () => {
            a.children[0].srcset = a.children[0].srcset.replace("GIF.webp", "_480w.webp");
            a.children[1].srcset = a.children[1].srcset.replace("GIF.webp", "_800w.webp");
            photoMove.src = photoMove.src.replace("GIF.webp", ".webp");
        })
    }

}