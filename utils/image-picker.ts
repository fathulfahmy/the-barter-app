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
    base64: true,
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

export const getImagePickerBase64Image = (asset: ImagePicker.ImagePickerAsset) => {
  return `data:image/jpeg;base64,${asset.base64}`;
};
