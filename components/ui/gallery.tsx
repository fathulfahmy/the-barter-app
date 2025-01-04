import React from "react";
import { Image, ImageStyle, ScrollView, ScrollViewProps, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type GalleryProps = ScrollViewProps & {
  uris: string[] | null | undefined;
  renderOverlay?: (index: number) => React.ReactNode;
  imageStyle?: StyleProp<ImageStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  overlayContainerStyle?: StyleProp<ViewStyle>;
};

export const Gallery: React.FC<GalleryProps> = ({
  uris,
  renderOverlay,
  imageStyle,
  contentContainerStyle,
  imageContainerStyle,
  overlayContainerStyle,
  ...props
}) => {
  if (!uris) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      {...props}
    >
      {uris.map((uri, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{ uri }} style={[styles.image, imageStyle]} />
          {renderOverlay && (
            <View style={[styles.overlayContainer, overlayContainerStyle]}>{renderOverlay(index)}</View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  image: {
    width: 150,
    height: 150,
  },
  imageContainer: {
    position: "relative",
  },
  overlayContainer: {
    position: "absolute",
  },
});
