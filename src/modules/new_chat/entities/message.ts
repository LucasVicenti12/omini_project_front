// @ts-ignore
import * as CryptoJS from "crypto-js";

export type Message = {
  uuid: string | null;
  chatSessionUUID: string;
  content: TextContent | FileContent | ImageContent | string;
  attachMessage: Message | null;
  dateTimeMessage: string | null;
  sendUserUUID: string;
  whoSend: WhoSend | null
};
export type WhoSend = {
  isMe: boolean;
  username: string;
};
export type TextContent = {
  text: string;
};
export type FileContent = {
  text: string;
  file: string;
  fileType: string;
};
export type ImageContent = {
  text: string;
  image: string | null;
};
export type UserMessage = {
  uuid: string;
  login: string;
  passwordUser: null;
  email: string;
  avatar: string;
  altAvatar: string;
  name: string;
  surname: string;
};

const key: string = "lucao"; // create environment variable

export const encodeMessage = (
  content: TextContent | FileContent | ImageContent | string
): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(content), key).toString();
};

export const decodeMessage = (
  content: string
): TextContent | FileContent | ImageContent | string => {
  const bytes = CryptoJS.AES.decrypt(content, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
