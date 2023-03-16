const all_a = document.querySelectorAll('body a');
for (let i = 0; i < all_a.length; i++) {
    let a = all_a[i];
    a.addEventListener('mouseover', () => {
        console.log(i, "is hoverd")
        a.style.transform = 'translate(100px,100px)';
        setTimeout(() => {
            a.style.transform = 'initial';
        }, 200);
    })
}

const all_p = document.querySelectorAll('body p');
for (let i = 0; i < all_p.length; i++) {
    let p = all_p[i];
    p.addEventListener('mouseover', () => {
        console.log(i, "is hoverd")
        p.style.transform = 'translate(5px,5px)';
        setTimeout(() => {
            p.style.transform = 'initial';
        }, 200);
    })
}