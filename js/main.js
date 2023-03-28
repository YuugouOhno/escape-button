// 対象となるtagを取得
let tags, isEscape, distance, dom_num

// 対象のタグを全て取得する
const setTag = () => {
    tags = Array.from(document.getElementsByTagName('a'));
    const get_button_tag = Array.from(document.getElementsByTagName('button'));
    tags.push(...get_button_tag);
    for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];

        // tagにidとclassを付与
        tag.id = 'stalker' + i;
        tag.classList.add("stalker");
    }
}

// 要素の中心部分の絶対座標を取得
const getTagAbsolute = (tag) => {
    // 要素の座標とサイズを取得
    const rect = tag.getBoundingClientRect();

    // 要素の中心部分の座標を計算
    const tagCenter = {x:rect.left + (rect.width / 2), y:rect.top + (rect.height / 2)}

    // 現在のビューポートの左上隅の座標を取得
    const viewportLeft = window.pageXOffset;
    const viewportTop = window.pageYOffset;

    // 要素の中心部分の絶対座標を計算
    const tagAbsolute = { x: viewportLeft + tagCenter.x, y: viewportTop + tagCenter.y }
    return tagAbsolute;
}

// タグの移動位置を指定
const setPotision = (tag, distance, e) => {
    // 要素の中心部分の絶対座標を取得
    const tagAbsolute = getTagAbsolute(tag);

    // マウスと要素の距離
    const l = Math.sqrt((tagAbsolute.x - e.clientX) ** 2 + (tagAbsolute.y - e.clientY) ** 2);
    if (l < 4000) {
        // 移動先の座標
        let next = { x: 0, y: 0 }

        const a = (tagAbsolute.y - e.clientY) / (tagAbsolute.x - e.clientX)
        const b = (tagAbsolute.y - a * tagAbsolute.x)

        // 移動先の決定(ポインタに近づく or 離れる)
        if (tagAbsolute.x < e.clientX) {
            next.x = e.clientX + distance
            next.y = next.x * a + b
        } else {
            next.x = e.clientX - distance
            next.y = next.x * a + b
        }

        // スクリーンの外に出そうなら中に戻す
        inToTheScreen(next)

        tag.style.position = 'fixed';
        tag.style.left = next.x + (Math.random() - 0.5) * 500 + 'px';
        tag.style.top = next.y + (Math.random() - 0.5) * 300 + 'px';
    }
}

const inToTheScreen = (next) => {
    if (next.x < 0) {
        next.x = window.innerWidth * 0.1 * Math.random()
    } else if (next.x > window.innerWidth) {
        next.x = window.innerWidth - window.innerWidth * 0.1 * Math.random()
    }
    if (next.y < 0) {
        next.y = window.innerHeight * 0.1 * Math.random()
    } else if (next.y > window.innerHeight) {
        next.y = window.innerHeight - window.innerHeight * 0.1 * Math.random()
    }
    return next
}

const main = () => {
    setTag() // ページに読み込まれている対象のタグを取得

    // モテる際の処理、マウスが動くとタグがよってくる
    document.addEventListener('mousemove', function (e) {
        // ストレージからモードの状態を取得
        chrome.storage.local.get(["isEscape"]).then((result) => {
            isEscape = result.isEscape
        });

        // モテるモードの時
        if (!isEscape) {
            distance = 10 //　setPotisionでマウス方向に移動させるための変数
            setTag()
            for (let i = 0; i < tags.length; i++) {
                let tag = tags[i];
                setPotision(tag, distance, e) // タグの移動位置を指定
            }
        }
    });

    // 煽られる際の処理、タグにホバーすると逃げられる
    for (let i = 0; i < tags.length; i++) {
        let tag = tags[i];
        // それぞれのタグに対してホバーで発火
        tag.addEventListener('mouseover', (e) => {
            // ストレージからモードの状態を取得
            chrome.storage.local.get(["isEscape"]).then((result) => {
                isEscape = result.isEscape
            });
            // 煽られるモードの時
            if (isEscape) {
                distance = -10 //　setPotisionでマウスと逆方向に移動させるための変数
                setTag()
                setPotision(tag, distance, e) // タグの移動位置を指定
            }
        })
    };

    // 初期状態のDOMをカウント
    dom_num = document.getElementsByTagName("*").length;
}

main()

// 無限スクロールなど、後から読み込まれ直すDOMに対応
setInterval(() => {
    const pre_dom_num = dom_num;
    dom_num = document.getElementsByTagName("*").length;
    if (dom_num > pre_dom_num) { // 初期とDOMの数が異なるとき
        main();
    }
}, 1000);