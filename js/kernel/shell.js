import commands from "../commands/index.js";
import {parse} from "./parser.js";
import {History} from "./history.js";

export class Shell{

constructor(){

this.currentDirectory="/home/noxen";

this.history=new History();

this.terminal=document.getElementById("terminal");

this.newPrompt();

}

print(text=""){

const div=document.createElement("div");

div.className="line";

div.textContent=text;

this.terminal.appendChild(div);

this.scroll();

}

scroll(){

this.terminal.scrollTop=this.terminal.scrollHeight;

}

newPrompt(){

const line=document.createElement("div");

line.className="line";

const prompt=document.createElement("span");

prompt.className="prompt";

prompt.textContent="noxen@serpent:"+this.currentDirectory+"$ ";

const input=document.createElement("input");

input.className="input";

input.autocomplete="off";

input.spellcheck=false;

line.appendChild(prompt);

line.appendChild(input);

this.terminal.appendChild(line);

input.focus();

input.addEventListener("keydown",(e)=>this.key(e,input));

this.scroll();

}

key(e,input){

if(e.key==="Enter"){

const text=input.value;

input.disabled=true;

this.history.add(text);

const parsed=parse(text);

if(parsed){

const cmd=commands[parsed.command];

if(cmd){

cmd(this,parsed.args);

}else{

this.print(parsed.command+": command not found");

}

}

this.newPrompt();

}

if(e.key==="ArrowUp"){

e.preventDefault();

input.value=this.history.previous();

}

if(e.key==="ArrowDown"){

e.preventDefault();

input.value=this.history.next();

}

}

}
