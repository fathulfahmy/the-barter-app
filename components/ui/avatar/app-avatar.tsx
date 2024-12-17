import { Avatar, AvatarImageProps, AvatarTextProps } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";
import { User } from "@/types/api";
import { formatAvatarName } from "@/utils/format";

export type AppAvatarProps = {
  user: User | undefined | null;
  size?: number;
} & Omit<AvatarImageProps, "source"> &
  Omit<AvatarTextProps, "label">;

export const AppAvatar: React.FC<AppAvatarProps> = ({ user, size, ...props }) => {
  const { fonts } = useAppTheme();

  const avatarSize = size ?? fonts.bodyMedium.fontSize * 2;

  return user?.avatar ? (
    <Avatar.Image source={{ uri: user.avatar.uri }} size={avatarSize} {...props} />
  ) : (
    <Avatar.Text label={formatAvatarName(user?.name)} size={avatarSize} {...props} />
  );
};
