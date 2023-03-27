// body内にストーカー用のdivを挿入
var new_ele = document.createElement("div");
new_ele.id = 'stalker';
document.body.appendChild(new_ele);

// マウスストーカー用のdivを取得
const stalker = document.getElementById('stalker');
console.log(stalker)

// 対象となるtagを取得
// const get_tag = document.querySelectorAll('body a');
let get_tag
const set_tag = () => {
    get_tag = Array.from(document.getElementsByTagName('a'));
    const get_button_tag = Array.from(document.getElementsByTagName('button'));
    get_tag.push(...get_button_tag);
    for (let i = 0; i < get_tag.length; i++) {
        let tag = get_tag[i];

        // tagにidとclassを付与
        tag.id = 'stalker' + i;
        tag.classList.add("stalker");
    }
}
const set_potision = (tag, distance, e) => {

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

    // マウスと要素の距離
    const l = Math.sqrt((tagAbsoluteX - e.clientX) ** 2 + (tagAbsoluteY - e.clientY) ** 2);
    if (l < 4000) {
        // ポインタを挟んで反対側へ
        const a = (tagAbsoluteY - e.clientY) / (tagAbsoluteX - e.clientX)
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
        tag.style.left = nextX + (Math.random() - 0.5) * 500 + 'px';
        tag.style.top = nextY + (Math.random() - 0.5) * 300 + 'px';
    }

}
set_tag()

let isEscape = true;
let distance

document.addEventListener('mousemove', function (e) {
    chrome.storage.local.get(["isEscape"]).then((result) => {
        isEscape = result.isEscape
    });
    console.log(isEscape)
    console.log("isEscape")
    if (!isEscape) {
        distance = 10
        set_tag()
        for (let i = 0; i < get_tag.length; i++) {
            let tag = get_tag[i];
            set_potision(tag, distance, e)
        }
    }
});

//マウスに追従させる処理
document.addEventListener('mousemove', function (e) {
    stalker.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});

for (let i = 0; i < get_tag.length; i++) {
    let tag = get_tag[i];
    tag.addEventListener('mouseover', (e) => {
        chrome.storage.local.get(["isEscape"]).then((result) => {
            isEscape = result.isEscape
        });
        console.log(isEscape)
        console.log("isEscape")
        if (isEscape) {
            distance = -10
            set_tag()
            set_potision(tag, distance, e)
        }
    })
};