import React, { useRef, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";

import colors from "../configs/colors";
import IconButton from "./IconButton";

function AddListModal({ onAdd }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState();

  let textInput = useRef(null);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={styles.addButton}>
          <Text>{"Add List"}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        onShow={() => {
          textInput.focus();
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <TextInput
                  placeholder="Add content"
                  style={styles.textInput}
                  ref={(input) => {
                    textInput = input;
                  }}
                  onChangeText={(v) => setContent(v)}
                  cursorColor={colors.primary}
                />
                <TouchableOpacity>
                  <IconButton
                    name="checkmark"
                    onPress={() => {
                      if (content) onAdd(content);
                      setModalVisible(!modalVisible);
                      setContent();
                    }}
                    color={colors.primary}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 0.5,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
});

export default AddListModal;
