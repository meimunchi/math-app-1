import React from 'react';
import { Text, View ,Button,FlatList} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { styles } from '../styles';
//import { NavigationContainer } from '@react-navigation/native';
import email from 'react-native-email';
export default function Results({route,navigation}) {
    //const test = navigation.getParam(corr);
    const {total} = route.params;
    const {totalCorrect} = route.params;
    console.log(totalCorrect);
    
    const {res} = route.params;
    console.log(res);
  return (
    <View>
      <Text>RESULTS </Text>
      <Text>Number Correct out of {total} : {totalCorrect}</Text>
      <ResultsDisplay results={res}  />
      <SendEmail></SendEmail>
      <TouchableHighlight style={styles.button} title="Go to Menu Page"
      onPress={() => navigation.navigate('Home')}>
        <Text>Return Home</Text>
      </TouchableHighlight>
    </View>
  );
}
export function SendEmail(){
  handleEmail = ()=>{
    const to = ['dbz6828@gmail.com'] // string or array of email addresses
        email(to, {
            subject: 'TEST MATH APP',
            body: 'HOHOJOJO'
        }).catch(console.error)
  }
  return(
    <View>
      <TouchableHighlight style={styles.button} title="Send Email"
      onPress={this.handleEmail}>
        <Text>Send Email</Text>
      </TouchableHighlight>
    </View>
  );
}
export function ResultsDisplay({results}){
  console.log(results);
  return(
    <View>
      <FlatList data={results}
      renderItem={({item})=><Item item={item}/>}/>
    </View>
  );
}
function Item({ item }) {
  return (
    <View >
      <Text >{item.type} : {item.numCorr} / {item.numTotal} </Text>
    </View>
  );
}
