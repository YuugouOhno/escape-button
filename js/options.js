// 未定義を定義
const undefined = void(0);

// checkboxを取得
let checkbox = document.getElementById("check");
let mode1 = document.getElementById("mode1");
let mode2 = document.getElementById("mode2");
let background = document.getElementById("background");
let isEscape;

// isEscapeが未定義ならtrueに(main.jsでのstrageへの初期登録が間に合っていない時)
if (isEscape === undefined) {
    isEscape = false;
}

// 最初にoption_pageが開いた際のボタンの状態を設定する
chrome.storage.local.get(["isEscape"]).then((result) => {
    isEscape = result.isEscape; // strageからisEscapeを取得
    checkbox.checked = !isEscape; // checkboxにチェックを入れる
    setBackground(isEscape)
});

// textがクリックされた際の処理
const setMode = (mode) => {
    if (mode === "mode1" && isEscape === true) {
        checkbox.checked = !isEscape;
        setIsEscape()
    } else if (mode === "mode2" && isEscape === false) {
        checkbox.checked = !isEscape;
        setIsEscape()
    }
}

// isEscapeを反転させる
const setIsEscape = () => {
    chrome.storage.local.get(["isEscape"]).then((result) => {
        isEscape = result.isEscape
        chrome.storage.local.set({ "isEscape": !isEscape }).then(() => {
            checkbox.checked = isEscape;
        });
    });
    setBackground(isEscape)
}

// ボタンの背景色を切り替える
const setBackground = (isEscape) => {
    if (isEscape) {
        background.className = 'background-purple';
    } else {
        background.className = 'background-pink';
    }
}

// checkboxとラベルのクリックイベント
mode1.addEventListener('click', ()=> {
    setMode("mode1")
});
mode2.addEventListener('click', () => {
    setMode("mode2")
});
checkbox.addEventListener(`change`, () => {
    setIsEscape()
})