export type CommandArguments = {
    key: string;
    args: string[];
};

const COMMAND_SYMBOL = "!";

export const getCommandArguments = (
    message: string,
): CommandArguments | null => {
    const tokens = message.split(" ");

    if (tokens.length === 0) return null;

    const firstToken = tokens[0];

    if (!firstToken.startsWith(COMMAND_SYMBOL)) {
        return null;
    }

    const key = firstToken.toLowerCase().replace("!", "");
    const args = tokens.slice(1);
    return { key, args };
};