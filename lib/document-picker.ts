import { Platform } from "react-native";

import * as DocumentPicker from "expo-document-picker";

/* ======================================== PICK DOCUMENT */
export const getDocumentPickerResult = async ({
  options,
}: {
  options?: DocumentPicker.DocumentPickerOptions;
} = {}) => {
  let result = null;

  const documentPickerOptions: DocumentPicker.DocumentPickerOptions = {
    copyToCacheDirectory: true,
    ...options,
  };

  result = await DocumentPicker.getDocumentAsync(documentPickerOptions);

  return result;
};

/* ======================================== PARSE ASSET TO FILE (SINGLE) */
export const getDocumentPickerFile = (result: DocumentPicker.DocumentPickerSuccessResult) => {
  const asset = result.assets?.[0];

  return Platform.OS === "web"
    ? asset.file
    : {
        uri: asset.uri,
        name: asset.name ?? "document.pdf",
        type: asset.mimeType ?? "application/pdf",
      };
};

/* ======================================== PARSE ASSET TO FILE (MULTIPLE) */
export const getDocumentPickerMultipleFile = (result: DocumentPicker.DocumentPickerSuccessResult) => {
  return result.assets
    .map((asset) =>
      Platform.OS === "web"
        ? asset.file
        : {
            uri: asset.uri,
            name: asset.name ?? "document.pdf",
            type: asset.mimeType ?? "application/pdf",
          },
    )
    .filter((file): file is File | { uri: string; name: string; type: string } => Boolean(file));
};
