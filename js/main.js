import {Shell} from "./kernel/shell.js";

window.addEventListener("load",()=>{

    const desktop=document.getElementById("desktop");

    desktop.style.display="block";

    const shell=new Shell();

    setTimeout(()=>{

        shell.boot();

    },1200);

});
