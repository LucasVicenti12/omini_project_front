export type ChangeAvatarResponse = {
  changeAvatar: ChangeAvatar | null;
  error: string | null;
};

export type ChangeAvatar = {
  userUUID: string;
  avatar: string;
};
