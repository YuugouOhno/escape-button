const undefined = void(0);
let modeChange = document.getElementById("check01");
let isEscape;
if (isEscape === undefined) {
    isEscape = true;
}
chrome.storage.local.get(["isEscape"]).then((result) => {
    isEscape = result.isEscape;
    console.log("open")
    modeChange.checked = !isEscape;
});




modeChange.addEventListener(`change`, () => {
    console.log(1);
    chrome.storage.local.get(["isEscape"]).then((result) => {
        console.log(2);
        isEscape = result.isEscape
        chrome.storage.local.set({ "isEscape": !isEscape }).then(() => {
            console.log(3);
            modeChange.checked = isEscape;
        });
    });
})
