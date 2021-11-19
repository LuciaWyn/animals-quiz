import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Button } from 'react-native';

export default function App() {
  const shuffleArray = (array) =>{
    let i = array.length-1;
    for(i; i>0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  const [animals, anim] = useState(shuffleArray([{id:0, name:'dog', emoji: '🐶'}, {id:1, name:'cat', emoji: '🐱'},{id:2, name:'mouse',emoji:'🐭'},{id:3, name:'monkey', emoji: '🐒'}, {id: 4, name:'elephant', emoji:'🐘'}, {id:5, name:'camel', emoji:'🐫'},{id:6, name:'camel', emoji:'🐪'},
  {id:7,name:'deer',emoji:'🦌'}, {id:8, name:'badger', emoji:'🦡'}, {id:9, name:'bee', emoji:'🐝'},{id:10, name:'ant', emoji:'🐜'}]));
  const questionno = 8;
  const [start, strt] = useState(0);
  const [rightanswers, ras] = useState(0);
  const [through,thrw] = useState(1);
  const [quizmode, qm] = useState(true);
  const [emojii, emj] = useState(animals[start].emoji);
  const [answer, ans] = useState('');
  const [rightanswer, ra] = useState(animals[start].name);
  const [answersmode, am] = useState(false);
  const answering = (a, r, n) =>{
    n = parseInt(n);
    let nn = 0;
    if(n < (animals.length-1)){
      nn = n+1;
    }
    strt(start=>nn);
    emj(emojii=>animals[nn].emoji);
    ra(rightanswer=>animals[nn].name);
    if(a === r){
      ras(rightanswers=>rightanswers+1);
    }
    thrw(through=>through+1);
    if(through === questionno){
      alert('quiz ended!');
      qm(false);
      am(true);
    }
    ans("")
  }
  return (
    <View>
      <Modal visible={quizmode}>
        <View style={styles.container}>
          <Text>Score: {rightanswers}/{questionno}</Text>
          <Text style={styles.quiz}>{emojii}</Text>
          <Text>Which animal is this?</Text>
          <TextInput style={styles.animaltxt} placeholder='animal' onChangeText={ans} value={answer.toString()}></TextInput>
          <Button title='Select Answer' onPress={()=>{answering(answer, rightanswer, start)}}></Button>
          <StatusBar style="auto" />
        </View>
      </Modal>
      <Modal visible={answersmode}>
        <View style={styles.container}>
          <Text>Score: {rightanswers}/{questionno}</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quiz:{
    fontSize: 75,
  },
  animaltxt:{
    borderWidth: 2,
    width: '70%',
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  }
});
