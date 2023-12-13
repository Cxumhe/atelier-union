
window.onload = function () {
    for(let a of document.querySelectorAll("article > a picture")) {
        let photoMove = a.querySelector("img");
        // console.log(photoMove);
        photoMove.addEventListener("mouseover", () => {
            a.children[0].srcset = a.children[0].srcset.replace("_480w.jpg", ".gif");
            a.children[1].srcset = a.children[1].srcset.replace("_800w.jpg", ".gif");
            photoMove.src = photoMove.src.replace("jpg", "gif");
        })
        photoMove.addEventListener("mouseout", () => {
            a.children[0].srcset = a.children[0].srcset.replace(".gif", "_480w.jpg");
            a.children[1].srcset = a.children[1].srcset.replace(".gif", "_800w.jpg");
            photoMove.src = photoMove.src.replace("gif", "jpg");
        })
    }

}