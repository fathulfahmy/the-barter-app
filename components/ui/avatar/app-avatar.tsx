import { Avatar, AvatarImageProps, AvatarTextProps } from "react-native-paper";

import { useAppTheme } from "@/lib/react-native-paper";
import { formatAvatarName } from "@/utils/format";

export type AppAvatarProps = {
  uri: string | undefined;
  name?: string | undefined | null;
  size?: number;
} & Omit<AvatarImageProps, "source"> &
  Omit<AvatarTextProps, "label">;

export const AppAvatar: React.FC<AppAvatarProps> = ({ uri, name, size, ...props }) => {
  const { fonts } = useAppTheme();

  const avatarSize = size ?? fonts.bodyMedium.fontSize * 2;

  return uri ? (
    <Avatar.Image source={{ uri }} size={avatarSize} {...props} />
  ) : (
    <Avatar.Text label={formatAvatarName(name)} size={avatarSize} {...props} />
  );
};
