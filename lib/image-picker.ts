import { Platform } from "react-native";

import * as ImagePicker from "expo-image-picker";

export const getImagePickerPermission = async (useCamera: boolean = false) => {
  const permission = useCamera
    ? await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    alert(`${useCamera ? "Camera permission is required" : "Library permission is required"}`);
    return;
  }
};

export const getImagePickerResult = async ({
  useCamera = false,
  options,
}: {
  useCamera?: boolean;
  options?: ImagePicker.ImagePickerOptions;
} = {}) => {
  let result = null;

  const imagePickerOptions: ImagePicker.ImagePickerOptions = {
    quality: 1,
    ...options,
  };

  if (useCamera) {
    await ImagePicker.requestCameraPermissionsAsync();
    result = await ImagePicker.launchCameraAsync(imagePickerOptions);
  } else {
    result = await ImagePicker.launchImageLibraryAsync(imagePickerOptions);
  }

  return result;
};

export const getImagePickerFile = (result: ImagePicker.ImagePickerSuccessResult) => {
  const asset = result.assets?.[0];

  return Platform.OS === "web"
    ? asset.file
    : {
        uri: asset.uri,
        name: asset.fileName ?? "image.jpg",
        type: asset.type ?? "image/jpeg",
      };
};

export const getImagePickerMultipleFile = (result: ImagePicker.ImagePickerSuccessResult) => {
  return result.assets
    .map((asset) =>
      Platform.OS === "web"
        ? asset.file
        : {
            uri: asset.uri,
            name: asset.fileName ?? "image.jpg",
            type: asset.type ?? "image/jpeg",
          },
    )
    .filter((file): file is File | { uri: string; name: string; type: string } => Boolean(file));
};
