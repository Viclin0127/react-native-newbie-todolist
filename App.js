import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from "./components/Task";

export default function App() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([])

  const onPressBtn = () =>{
    // when press the btn, not display the keyboard
    Keyboard.dismiss()
    setTodoList([...todoList, task])
    // clean the input field
    setTask(null);
  }

  const onPressRemove = index => {
    
    let newList = [...todoList]
    newList.splice(index, 1);
    setTodoList(newList);
  }

  const renderTodoList = () =>{
    return (
      todoList.map((item, index)=>{
        return (
          <TouchableOpacity key={index} onPress={()=>onPressRemove(index)}>
            <Task key={index} text={item}/>
          </TouchableOpacity> 
        )
      })
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {renderTodoList()}
        </View>
      </View>

      {/* Write  button */}
      <KeyboardAvoidingView 
        behavior={Platform.OS=="ios"? "padding":"height"} 
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={"Write a task"} value={task} onChangeText={text => setTask(text)}/>
        <TouchableOpacity onPress={onPressBtn}>
          <View style={styles.addWrapper}>
            <Text style={styles.addBtn}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED'
  },
  tasksWrapper:{
    padding: 80,
    paddingHorizontal: 20
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: "bold"
  },
  items:{
    marginTop: 30
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
    textAlign: "center"
  },
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addBtn: {}
});
