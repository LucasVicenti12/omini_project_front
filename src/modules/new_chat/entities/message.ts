// @ts-ignore
import * as CryptoJS from "crypto-js";

export type Message = {
    uuid: string | null,
    chatSessionUUID: string;
    content: TextContent | FileContent | ImageContent | string;
    attachMessage: Message | null;
    dateTimeMessage: string | null;
    sendUserUUID: string;
};

type TextContent = {
    text: string;
};

type FileContent = {
    text: string;
    file: string;
    fileType: string;
};

type ImageContent = {
    text: string;
    image: string;
};

const key: string = "lucao"; // create environment variable

export const encodeMessage = (content: TextContent | FileContent | ImageContent | string): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(content), key).toString();
};

export const decodeMessage = (content: string): TextContent | FileContent | ImageContent | string => {
    const bytes = CryptoJS.AES.decrypt(content, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};