import AsyncStorage from "@react-native-async-storage/async-storage";

const store = async (value) => {
  try {
    const key = Date.now().toString();
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    const item = JSON.parse(value);

    if (!item) return null;

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

const getAll = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (!keys) return null;

    const value = await AsyncStorage.multiGet(keys);
    const items = value.map((result, i, item) => {
      const key = JSON.parse(item[i][0]);
      const value = JSON.parse(item[i][1]);
      return { key, value };
    });

    if (!items) return null;
    items.sort((a, b) => b.key - a.key);

    return items;
  } catch (error) {
    console.log(error);
  }
};

const update = async (key, value) => {
  try {
    const data = await AsyncStorage.getItem(key);
    const item = JSON.parse(data);

    if (item) {
      await AsyncStorage.removeItem(key);
    }

    store(value);
  } catch (error) {
    console.log(error);
  }
};

const remove = async (key) => {
  try {
    const item = await AsyncStorage.getItem(key);

    if (!item) return false;

    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default {
  store,
  get,
  getAll,
  update,
  remove,
};
