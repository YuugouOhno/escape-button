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
const get_tag = document.getElementsByTagName('a');

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
        const tagAbsoluteX = viewportLeft + centerX;
        const tagAbsoluteY = viewportTop + centerY;

        console.log(tag.text, tagAbsoluteX, tagAbsoluteY)

        const distance = 100

        // マウスと要素の距離
        const l = Math.sqrt((tagAbsoluteX - e.clientX) ** 2 + (tagAbsoluteY - e.clientY) ** 2);
        if (l < 4000) {
            // ポインタを挟んで反対側へ
            const a = (tagAbsoluteY - e.clientY)/(tagAbsoluteX - e.clientX)
            const b = (tagAbsoluteY - a * tagAbsoluteX)
            let nextX, nextY
            if (tagAbsoluteX < e.clientX) {
                nextX = e.clientX + distance
                nextY = nextX * a + b
            } else {
                nextX = e.clientX - distance
                nextY = nextX * a + b
            }
            
            tag.style.position = 'fixed';
            tag.style.left = nextX + 'px';
            tag.style.top = nextY + 'px';
            // tag.style.transform = 'translate(' + (e.clientX - rect.left) + 'px, ' + (e.clientY - rect.top) + 'px)';
            // tag.style.transform = 'translate(' + (e.clientX) + 'px, ' + (e.clientY) + 'px)';
        }
    }
});

//マウスに追従させる処理
document.addEventListener('mousemove', function (e) {
    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});