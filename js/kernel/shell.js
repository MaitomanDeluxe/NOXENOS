import commands from "../commands/index.js";
import { parse } from "./parser.js";
import { History } from "./history.js";

export class Shell {

    constructor() {

        this.currentDirectory = "/home/noxen";

        this.history = new History();

        this.terminal = document.getElementById("terminal");

        this.bootLogo = `
███╗   ██╗ ██████╗ ██╗  ██╗███████╗███╗   ██╗
████╗  ██║██╔═══██╗╚██╗██╔╝██╔════╝████╗  ██║
██╔██╗ ██║██║   ██║ ╚███╔╝ █████╗  ██╔██╗ ██║
██║╚██╗██║██║   ██║ ██╔██╗ ██╔══╝  ██║╚██╗██║
██║ ╚████║╚██████╔╝██╔╝ ██╗███████╗██║ ╚████║
╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝

NOXEN OS
Serpent in the Dark

Boot Complete.
`;

    }

    boot() {

        this.print(this.bootLogo);
        this.print("");
        this.newPrompt();

    }

    print(text = "") {

        const line = document.createElement("div");

        line.className = "line";

        line.textContent = text;

        this.terminal.appendChild(line);

        this.scroll();

    }

    scroll() {

        this.terminal.scrollTop = this.terminal.scrollHeight;

    }

    newPrompt() {

        const line = document.createElement("div");

        line.className = "line";

        const prompt = document.createElement("span");

        prompt.className = "prompt";

        prompt.textContent = `noxen@serpent:${this.currentDirectory}$ `;

        const input = document.createElement("input");

        input.className = "input";

        input.type = "text";

        input.autocomplete = "off";

        input.autocorrect = "off";

        input.autocapitalize = "off";

        input.spellcheck = false;

        line.appendChild(prompt);

        line.appendChild(input);

        this.terminal.appendChild(line);

        requestAnimationFrame(() => {

            input.focus();

        });

        this.terminal.onclick = () => {

            input.focus();

        };

        input.addEventListener("keydown", (e) => this.key(e, input));

        this.scroll();

    }

    key(e, input) {

        if (e.key === "ArrowUp") {

            e.preventDefault();

            input.value = this.history.previous();

            return;

        }

        if (e.key === "ArrowDown") {

            e.preventDefault();

            input.value = this.history.next();

            return;

        }

        if (e.key !== "Enter")
            return;

        const text = input.value.trim();

        input.disabled = true;

        this.history.add(text);

        if (text !== "") {

            const parsed = parse(text);

            if (parsed) {

                const cmd = commands[parsed.command];

                if (cmd) {

                    cmd(this, parsed.args);

                } else {

                    this.print(`${parsed.command}: command not found`);

                }

            }

        }

        this.newPrompt();

    }

}
