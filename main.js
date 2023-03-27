// 対象となるtagを取得
let get_tag
let isEscape = true;
let distance

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
        let next = {X:0,Y:0}
        if (tagAbsoluteX < e.clientX) {
            next.X = e.clientX + distance
            next.Y = next.X * a + b
        } else {
            next.X = e.clientX - distance
            next.Y = next.X * a + b
        }

        inToTheScreen(next)

        tag.style.position = 'fixed';
        tag.style.left = next.X + (Math.random() - 0.5) * 500 + 'px';
        tag.style.top = next.Y + (Math.random() - 0.5) * 300 + 'px';
    }
}

const inToTheScreen = (next) => {
    console.log(window.innerWidth, window.innerHeight)
    console.log(next)
    if (next.X < 0) {
        next.X = window.innerWidth * 0.1 * Math.random()
    } else if (next.X > window.innerWidth) {
        next.X = window.innerWidth - window.innerWidth * 0.1 * Math.random()
    }
    if (next.Y < 0) {
        next.Y = window.innerHeight * 0.1 * Math.random()
    } else if (next.Y > window.innerHeight) {
        next.Y = window.innerHeight - window.innerHeight * 0.1 * Math.random()
    }
    console.log(next)
    return next
}

const main = () => {
    set_tag()

    document.addEventListener('mousemove', function (e) {
        chrome.storage.local.get(["isEscape"]).then((result) => {
            isEscape = result.isEscape
        });
        if (!isEscape) {
            distance = 10
            set_tag()
            for (let i = 0; i < get_tag.length; i++) {
                let tag = get_tag[i];
                set_potision(tag, distance, e)
            }
        }
    });
    
    for (let i = 0; i < get_tag.length; i++) {
        let tag = get_tag[i];
        tag.addEventListener('mouseover', (e) => {
            chrome.storage.local.get(["isEscape"]).then((result) => {
                isEscape = result.isEscape
            });
            if (isEscape) {
                distance = -10
                set_tag()
                set_potision(tag, distance, e)
            }
        })
    };
}

main()

let dom_num = document.getElementsByTagName("*").length;
let pre_dom_num;

setInterval(() => {
    pre_dom_num = dom_num;
    dom_num = document.getElementsByTagName("*").length;
    if (dom_num > pre_dom_num) {
        main();
    }
}, 1000);