import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Screen from "../components/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../configs/colors";
import IconButton from "../components/IconButton";
import AddListModal from "../components/AddListModal";
import storage from "../utility/storage";
import routes from "../utility/routes";

const disableStyle = {
  textDecorationLine: "line-through",
  color: colors.disable,
};

function ToDoDetailListScreen({ navigation, route }) {
  const [toDoList, setToDoList] = useState({});
  const [isExistingData, setisExistingData] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (route.params) {
      const { toDoList } = route.params;
      setToDoList(toDoList.value);
      setisExistingData(true);
    } else {
      setisExistingData(false);
    }
  }, []);

  const addToDoListTitle = (value) => {
    if (value) setToDoList({ ...toDoList, title: value });
    else
      setToDoList((current) => {
        const { title, ...rest } = current;
        return rest;
      });
    setIsChanged(true);
  };

  const addToDoListLists = (value) => {
    setToDoList((current) => {
      if (!current.list) {
        return { ...current, list: [{ todo: value, isDone: false }] };
      } else {
        return {
          ...current,
          list: [...current.list, { todo: value, isDone: false }],
        };
      }
    });
    setIsChanged(true);
  };

  const checkToDoListList = (item) => {
    setToDoList((current) => {
      const list = current.list;
      const newList = list.map((l) => {
        if (l.todo === item.todo) {
          return { ...l, isDone: !l.isDone };
        }
        return l;
      });
      return {
        ...current,
        list: newList,
      };
    });
    setIsChanged(true);
  };

  const saveToDoList = async () => {
    if (Object.keys(toDoList).length !== 0) {
      if (isChanged) {
        if (isExistingData) {
          await storage.update(route.params.toDoList.key.toString(), toDoList);
        } else {
          await storage.store(toDoList);
        }
        ToastAndroid.show("Saved Successfully", ToastAndroid.SHORT);
      }
    }
    navigation.navigate(routes.TO_DO);
  };

  return (
    <Screen style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <IconButton name="chevron-back" onPress={saveToDoList} />
        {isChanged && <IconButton name="save-outline" onPress={saveToDoList} />}
      </View>
      <TextInput
        style={styles.title}
        cursorColor={colors.primary}
        placeholder="Title"
        onChangeText={addToDoListTitle}
        value={toDoList.title}
      />
      <View style={styles.horizontalLine} />
      {toDoList.list &&
        toDoList.list.map((item) => (
          <View
            style={{
              flexDirection: "row",
              paddingTop: 5,
              alignItems: "center",
            }}
            key={item.todo}
          >
            <TouchableOpacity onPress={() => checkToDoListList(item)}>
              <MaterialCommunityIcons
                name={
                  item.isDone
                    ? "checkbox-intermediate"
                    : "checkbox-blank-outline"
                }
                size={24}
                color={item.isDone ? colors.disable : colors.black}
              />
            </TouchableOpacity>
            <Text style={[item.isDone && disableStyle, { paddingLeft: 10 }]}>
              {item.todo}
            </Text>
          </View>
        ))}
      <AddListModal onAdd={addToDoListLists} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10 },
  title: {
    fontSize: 35,
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: colors.disable,
    marginTop: 20,
    marginBottom: 50,
  },
});

export default ToDoDetailListScreen;
