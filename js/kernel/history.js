export class History {

    constructor() {
        this.items = [];
        this.index = 0;
    }

    add(command) {

        if (!command.trim()) return;

        this.items.push(command);
        this.index = this.items.length;
    }

    previous() {

        if (this.index > 0)
            this.index--;

        return this.items[this.index] ?? "";
    }

    next() {

        if (this.index < this.items.length)
            this.index++;

        return this.items[this.index] ?? "";
    }

}
