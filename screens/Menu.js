import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TextInput, Keyboard } from 'react-native';
import { styles } from '../styles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';

export default function Menu({ navigation }) {
  const [problems, setProblems] = useState([
    { type: 'Add', number: '0', key: '1' },
    { type: 'Subtract', number: '0', key: '2' },
    { type: 'Multiply', number: '0', key: '3' },
    { type: 'Divide', number: '0', key: '4' }
  ]);
  const [total, setTotal] = useState(0);
  const [keyboardIsHidden, setKeyboardHidden] = useState(true);
  const error = (total > 500) ? 'Please choose less than 500 problems' : null;

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => { setKeyboardHidden(false); });
    Keyboard.addListener('keyboardDidHide', () => { setKeyboardHidden(true); });

    return(() => {
      Keyboard.removeListener('keyboardDidShow');
      Keyboard.removeListener('keyboardDidHide');
    });
  }, []);

  const updateProblems = (text, index) => {
    if (text === '') {
      text = '0';
    }
    problems[index].number = text;
    setProblems(problems);
  }

  const updateTotal = () => {
    let tempTotal = 0;
    problems.forEach((problem) => {
      tempTotal += parseInt(problem.number);
    });
    setTotal(tempTotal);
  }

  /* const resetProblems = () => {
    problems.forEach((problem) => {
      problem.number = '0';
    });
  }

  resetProblems(); */

  const completeMenuSelect = () => {
    // Only enables moving if keyboard is hidden so all problem numbers are properly processed
    if (!error && keyboardIsHidden && total > 0) {
      navigation.navigate('Problem', { problems, total });
    }
  }

  return (
    <View>
      <Text>{ error }</Text>
      <FlatList
        data={problems}
        renderItem={({item, index}) => (
          <View>
            <Text style = {styles.text}>{item.type}</Text>
            <TextInput style = {styles.text} keyboardType='numeric' 
            onChangeText={(text) => updateProblems(text, index)}
            onEndEditing={updateTotal}
            placeholder={problems[index].number}/>
          </View>
      )}/>
      { /* <TouchableHighlight style={styles.button} title="Go to Menu Page" 
      onPress={completeMenuSelect}>
        <Text>{ total } Go to Problems</Text>
        </TouchableHighlight> */ }
      <Button onPress={completeMenuSelect} title="Go to Problems"/>
    </View>
  );
}