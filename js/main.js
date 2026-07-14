import {Shell} from "./kernel/shell.js";

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("boot-screen").style.display="none";

document.getElementById("desktop").style.display="block";

new Shell();

},1800);

});
