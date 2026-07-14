import { Shell } from "./kernel/shell.js";

window.addEventListener("load", () => {

    const boot = document.getElementById("boot-screen");
    const desktop = document.getElementById("desktop");

    desktop.style.display = "none";

    setTimeout(() => {

        boot.remove();      // 起動画面を完全削除
        desktop.style.display = "block";

        new Shell();

    }, 1800);

});
