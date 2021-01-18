
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import ListItem from "./ListItem";
import ListInput from "./ListInput";
import AsyncStorage from '@react-native-async-storage/async-storage';

const List = () => {

  useEffect(() =>{
    getData();
  }, [])

  const [listName, setListName] = useState([]);
  
  const getData = async () =>{
    const list = await AsyncStorage.getItem('list');
    if(list !== null)
      setListName(JSON.parse(list));
    
    await AsyncStorage.removeItem('list');
  }

  const saveData = async (list) =>{
    try{
      await AsyncStorage.setItem('list', JSON.stringify(list));
    } catch(error){
      console.log(error);
    }
  }

  const [isAddMode, setIsAddMode] = useState(false);

  const addListHandler = (newList) => {
    setListName((currentListNames) => [
      ...currentListNames,
      { key: Math.random().toString(), value: newList },
    ]);
    setIsAddMode(false);

    saveData(listName);
  };
  
  const deleteListHandler = (listID) => {
    setListName((currentListNames) =>{
      return currentListNames.filter((list) => list.key !== listID)
    });
  };

  const cancelHandler = () => setIsAddMode(false);

  return (
    <View >
    <Button title="Add list item" onPress={() => setIsAddMode(true)}/>
      <ListInput onAdd={addListHandler} visible={isAddMode} onCancel={cancelHandler}/>
      <FlatList
        data={listName}
        renderItem={(itemData) => (
          <ListItem
            title={itemData.item.value}
            id={itemData.item.key}
            onDelete={deleteListHandler}
          />
        )}
      />
      
    </View>
  );
}

export default List;
