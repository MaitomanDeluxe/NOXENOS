export class Shell{

constructor(){

this.print("NOXEN OS v1.0");

this.print("");

this.print("Type 'help' to begin.");

}

print(text){

const terminal=document.getElementById("terminal");

const line=document.createElement("div");

line.className="line";

line.innerHTML=text;

terminal.appendChild(line);

terminal.scrollTop=terminal.scrollHeight;

}

}
