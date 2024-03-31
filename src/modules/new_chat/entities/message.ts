// @ts-ignore
import * as CryptoJS from "crypto-js";

export type Message = {
  chatSessionUUID: string;
  content: TextContent | FileContent | ImageContent;
  attachMessage: Message;
  dateTimeMessage: string;
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

export const encodeMessage = (message: Message): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(message), key).toString();
};

export const decodeMessage = (message: string): Message => {
  var bytes = CryptoJS.AES.decrypt(message, key);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};