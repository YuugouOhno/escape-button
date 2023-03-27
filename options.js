let modeChange = document.getElementById("check01");
let isEscape=true;
modeChange.addEventListener(`change`, () => {
    console.log(1);
    chrome.storage.local.get(["isEscape"]).then((result) => {
        console.log(2);
        isEscape = result.isEscape
        chrome.storage.local.set({ "isEscape": !isEscape }).then(() => {
            console.log(3);
        });
    });
})