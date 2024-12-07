import { ChatUserstate } from "tmi.js";
import { Log } from "../utils";
import { prototype } from "events";

export const AccessLevel = {
    STREAMER: 4,
    MOD: 3,
    VIP: 2,
    SUBSCRIBER: 1,
    USER: 0,
};

const getAccessLevel = (chatUser: ChatUserstate, channelId: string) => {
    if (`#${chatUser.username}` === channelId) return AccessLevel.STREAMER;
    if (chatUser.mod) return AccessLevel.MOD;
    if (chatUser.vip !== undefined) return AccessLevel.VIP;
    if (chatUser.subscriber) return AccessLevel.SUBSCRIBER;
    return AccessLevel.USER;
};

export type User = {
    name: string;
    id: string;
    displayName: string;
    accessLevel: number;
    channelId: string;
};

export const getUser = (
    chatUser: ChatUserstate,
    channelId: string,
): User | null => {
    const name = chatUser.username;
    const id = chatUser["user-id"];
    const displayName = chatUser["display-name"];

    if (name === undefined || id === undefined || displayName === undefined) {
        Log.warn(
            `IllegalState: Username "${name}", ID "${id}", DisplayName "${displayName}"`,
        );
        return null;
    }

    const accessLevel = getAccessLevel(chatUser, channelId);
    return { name, id, displayName, accessLevel, channelId };
};

export const mentionUser = (user: User, message: string) => {
    return `@${user.displayName} ${message}`
}