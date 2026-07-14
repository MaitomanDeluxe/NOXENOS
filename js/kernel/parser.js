export function parse(input) {

    input = input.trim();

    if (!input)
        return null;

    const parts = input.split(/\s+/);

    return {

        command: parts[0],

        args: parts.slice(1)

    };

}
