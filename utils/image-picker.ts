import * as ImagePicker from "expo-image-picker";

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
