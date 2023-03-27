// console.log("stalker")

// body内にストーカー用のdivを挿入
var new_ele = document.createElement("div");
new_ele.id = 'stalker';
document.body.appendChild(new_ele);

// マウスストーカー用のdivを取得
const stalker = document.getElementById('stalker');
console.log(stalker)

// 対象となるtagを取得
// const get_tag = document.querySelectorAll('body a');
let get_tag = Array.from(document.getElementsByTagName('a'));
const get_button_tag = Array.from(document.getElementsByTagName('button'));
get_tag.push(...get_button_tag);

for (let i = 0; i < get_tag.length; i++) {
    let tag = get_tag[i];

    // tagにidとclassを付与
    tag.id = 'stalker' + i;
    tag.classList.add("stalker");
}

document.addEventListener('mousemove', function (e) {
    for (let i = 0; i < get_tag.length; i++) {
        let tag = get_tag[i];
        // 要素の座標とサイズを取得
        const rect = tag.getBoundingClientRect();

        // 要素の中心部分のx座標を計算
        const centerX = rect.left + (rect.width / 2);

        // 要素の中心部分のy座標を計算
        const centerY = rect.top + (rect.height / 2);

        // 現在のビューポートの左上隅の座標を取得
        const viewportLeft = window.pageXOffset;
        const viewportTop = window.pageYOffset;

        // 要素の中心部分の絶対座標を計算
        const absoluteX = viewportLeft + centerX;
        const absoluteY = viewportTop + centerY;

        console.log(tag.text, absoluteX, absoluteY)

        // マウスと要素の距離
        const l = Math.sqrt((absoluteX - e.clientX) ** 2 + (absoluteY - e.clientY) ** 2);
        if (l < 4000) {
            // マウスと目標の座標を比較
            tag.style.position = 'fixed';
            tag.style.left = e.clientX+ 'px';
            tag.style.top = e.clientY+ 'px';
            // tag.style.transform = 'translate(' + (e.clientX - rect.left) + 'px, ' + (e.clientY - rect.top) + 'px)';
            // tag.style.transform = 'translate(' + (e.clientX) + 'px, ' + (e.clientY) + 'px)';
        }
    }
});

// const stalker7 = document.getElementById('stalker7');

// document.addEventListener('mousemove', function (e) {

//     stalker7.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
// });

//マウスに追従させる処理 （リンクに吸い付いてる時は除外する）
document.addEventListener('mousemove', function (e) {

    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});