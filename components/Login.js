import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const Login = (props) => {
  const [enteredUser, setEnteredUser] = useState("");

  const userInputHandler = (enteredText) => {
    setEnteredUser(enteredText);
  };

  const enterUserHandler = () => {
    setEnteredUser("");
    props.navigation.navigate('List');
  };
  return (
    
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={userInputHandler}
          value={enteredUser}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Log-in" onPress={enterUserHandler} style={styles.add} />
          </View>
        </View>
      </View>
    
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    width: "80%",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    padding: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    width: "60%",
  },
  button: {
    width: '40%',
  }
});

export default Login;
