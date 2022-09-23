import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

import Screen from "../components/Screen";
import colors from "../configs/colors";
import routes from "../utility/routes";
import IconButton from "../components/IconButton";
import storage from "../utility/storage";

function ToDoListScreen({ navigation }) {
  const [toDoLists, setToDoLists] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getAllToDoList = async () => {
    const data = await storage.getAll();
    setToDoLists(data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllToDoList();
  }, []);

  useEffect(() => {
    const willFocusSubscription = navigation.addListener("focus", () => {
      getAllToDoList();
    });

    return willFocusSubscription;
  }, []);

  const removeToDoList = async (key) => {
    const data = [...toDoLists];
    const result = await storage.remove(key.toString());
    if (!result) return;
    else {
      const newData = data.filter((d) => d.key !== key);
      setToDoLists(newData);
    }
  };

  return (
    <Screen>
      {!isLoading && (
        <>
          <Text style={styles.appTitle}>{"To Do List"}</Text>
          <ScrollView>
            {toDoLists &&
              toDoLists.map((toDoList) => (
                <TouchableNativeFeedback
                  key={toDoList.key}
                  onPress={() =>
                    navigation.navigate(routes.TO_DO_DETAILS, {
                      toDoList: toDoList,
                    })
                  }
                >
                  <View style={styles.dataContainer}>
                    <View>
                      <Text style={styles.dataTitle}>
                        {toDoList.value.title
                          ? toDoList.value.title
                          : toDoList.value.list[0].todo}
                      </Text>
                      <Text style={styles.dataDate}>
                        {moment(new Date(toDoList.key), "YYYYMMDD").fromNow()}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeToDoList(toDoList.key)}
                    >
                      <MaterialIcons name="delete" size={28} color="tomato" />
                    </TouchableOpacity>
                  </View>
                </TouchableNativeFeedback>
              ))}
          </ScrollView>
        </>
      )}

      <IconButton
        name="add-outline"
        onPress={() => navigation.navigate(routes.TO_DO_DETAILS)}
        size={30}
        color={colors.white}
        style={styles.addButton}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  appTitle: {
    fontSize: 50,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  dataContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dataTitle: {
    fontSize: 16,
  },
  dataDate: {
    marginTop: 10,
    color: colors.gray,
    fontSize: 12,
  },
  addButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});

export default ToDoListScreen;
