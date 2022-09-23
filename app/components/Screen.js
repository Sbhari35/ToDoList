import React from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import Constants from "expo-constants";

import colors from "../configs/colors";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS == "android" ? Constants.statusBarHeight : 0,
    backgroundColor: colors.background,
    flex: 1,
  },
});

export default Screen;
