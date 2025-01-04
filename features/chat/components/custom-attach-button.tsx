import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import { AttachButton, useMessageInputContext } from "stream-chat-expo";

export const CustomAttachButton = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { pickFile, uploadNewImage } = useMessageInputContext();

  const pickImageFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
      });
      if (!result.canceled) {
        result.assets.forEach((image) => {
          uploadNewImage({
            uri: image.uri,
          });
        });
      }
    } else {
      alert("Permission to photo library is required");
    }
  };

  const pickImageFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      if (!result.canceled) {
        uploadNewImage({
          uri: result.assets[0].uri,
        });
      }
    } else {
      alert("Permission to camera is required");
    }
  };

  const onPress = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    showActionSheetWithOptions(
      {
        cancelButtonIndex: 3,
        destructiveButtonIndex: 3,
        options: ["Photo Library", "Camera", "Files", "Cancel"],
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImageFromGallery();
            break;
          case 1:
            pickImageFromCamera();
            break;
          case 2:
            pickFile();
            break;
          default:
            break;
        }
      },
    );
  };

  return <AttachButton handleOnPress={onPress} />;
};
