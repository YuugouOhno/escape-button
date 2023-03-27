const all_a = document.getElementsByTagName('a');
const all_button = document.getElementsByTagName('button');
for (let i = 0; i < all_a.length; i++) {
    console.log(all_a[i].text);
}

// for (let i = 0; i < all_a.length; i++) {
//     let a = all_a[i];
//     a.addEventListener('mouseover', () => {
//         // console.log(i, "is hoverd")
//         // a.style.transform = 'translate(100px,100px)';
//         // a.style.setProperty('transform', 'translate(100px, 100px)', 'important');
//         a.style.cssText = 'transform: translate(30%, 30%)';
//         // a.style.zIndex = '999';
//         // a.style.position = 'fixed';
//         setTimeout(() => {
//             a.style.transform = 'initial';
//             a.style.zIndex = 'initial';
//         }, 200);
//     })
// }
for (let i = 0; i < all_button.length; i++) {
    let button = all_button[i];
    button.addEventListener('mouseout', () => {
        // console.log(i, "is hoverd")
        // button.style.transform = 'translate(100px,100px)';
        a.style.zIndex = '999';
        setTimeout(() => {
            button.style.transform = 'initial';
            a.style.zIndex = 'initial';
        }, 200);
    })
}

const all_p = document.querySelectorAll('body p');
for (let i = 0; i < all_p.length; i++) {
    let p = all_p[i];
    p.addEventListener('mouseover', () => {
        // console.log(i, "is hoverd")
        // p.style.transform = 'translate(5px,5px)';
        a.style.zIndex = '999';
        setTimeout(() => {
            p.style.transform = 'initial';
            a.style.zIndex = 'initial';
        }, 200);
    })
}