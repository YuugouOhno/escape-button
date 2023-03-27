// console.log("stalker")

// body内にストーカー用のdivを挿入
var new_ele = document.createElement("div");
new_ele.id = 'stalker';
document.body.appendChild(new_ele);

// マウスストーカー用のdivを取得
const stalker = document.getElementById('stalker');
console.log(stalker)


// 対象となるtagを取得
const get_tag = document.querySelectorAll('body a');

for (let i = 0; i < get_tag.length; i++) {
    let tag = get_tag[i];

    // tagにidとclassを付与
    tag.id = 'stalker' + i;
    tag.classList.add("stalker");

    tag.style.position = "fixed"

    document.addEventListener('mousemove', function (e) {
        tag.style.transform = 'translate(' + (e.clientX-rect.left-window.scrollX) + 'px, ' + (e.clientY-rect.top-window.scrollY) + 'px)';
    });
}

// const stalker7 = document.getElementById('stalker7');

// document.addEventListener('mousemove', function (e) {
    
//     stalker7.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
// });

//マウスに追従させる処理 （リンクに吸い付いてる時は除外する）
document.addEventListener('mousemove', function (e) {
    
    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});