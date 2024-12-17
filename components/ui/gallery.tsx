import React from "react";
import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native";
import { ScrollView, StyleSheet } from "react-native";
import { ScrollViewProps } from "react-native";

type GalleryProps = ScrollViewProps & {
  containerStyle?: StyleProp<ViewStyle>;
  imageUris: string[];
  imageStyle?: StyleProp<ImageStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  renderOverlay?: (index: number) => React.ReactNode;
  overlayContainerStyle?: StyleProp<ViewStyle>;
};

export const Gallery: React.FC<GalleryProps> = ({
  containerStyle,
  imageUris,
  imageStyle,
  imageContainerStyle,
  renderOverlay,
  overlayContainerStyle,
  ...props
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, containerStyle]}
      {...props}
    >
      {imageUris.map((uri, index) => (
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
    top: 0,
    right: 0,
  },
});
