/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  StackNavigator,
  NavigatorIOS
} from 'react-native';


import LocalizedStrings from 'react-native-localization';



export default class App extends Component<{}> {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: HomeScreen,
          title: 'Home',
          passProps: {index: 1},
        }}
        style={{flex: 1}}
      />
    );
  }
}

//Screen components..........................
class HomeScreen extends React.Component {

  constructor(){
    super();
    this.state={
      welcomeButtonText : heading.welcome,
      blowButtonText : heading.blow,
      createButtonText : heading.create,
      FoodButtonText : heading.food,
    }
  }

  render() {
    return (
      <View style={{justifyContent:'space-around', flex:1}}>
      <View style={styles.container}>

        <WordButton
          title= {this.state.welcomeButtonText}
          onPressProp={()=> this.openDetailScreenWithTitle(heading.welcome, 1)}
        />
        <WordButton
          title= {this.state.blowButtonText}
          onPressProp={()=> this.openDetailScreenWithTitle(heading.blow, 2)}
        />
        <WordButton
          title= {this.state.createButtonText}
          onPressProp={()=> this.openDetailScreenWithTitle(heading.create, 3)}
        />
        <WordButton
          title= {this.state.FoodButtonText}
          onPressProp={()=> this.openDetailScreenWithTitle(heading.food, 4)}
        />

      </View>

      <View style={{backgroundColor: '#dddddd'}}>

        <WordButton
            title='Change language'
          onPressProp={()=>
            this.changeLanguageButtonTapped()
          }
        />

      </View>
      </View>
    );
  }

  openDetailScreenWithTitle(title, indexOfWord) {
    this.props.navigator.push({
      component: DetailScreen,
      title: title,
      passProps: {
        indexOfWord: indexOfWord,
      },
      leftButtonTitle: 'Back',
      onLeftButtonPress : ()=>this.props.navigator.pop(),
    });

  }

  changeLanguageButtonTapped() {
    Alert.alert(
      'Choose a language',
      '',
      [
        {text: 'English', onPress: () => {
          heading.setLanguage('en');
          content.setLanguage('en');
          this.refreshLanguage();
        }},
        {text: 'Hindi', onPress: () => {
          heading.setLanguage('hi');
          content.setLanguage('hi');
          this.refreshLanguage();
        }},
        {text: 'Spanish', onPress: () => {
          heading.setLanguage('es');
          content.setLanguage('es');
          this.refreshLanguage();
        }},
      ],
      { cancelable: true }
    )
  }

  refreshLanguage() {
    this.setState({
      welcomeButtonText: heading.welcome,
      blowButtonText : heading.blow,
      createButtonText : heading.create,
      FoodButtonText : heading.food,
     })
  }
}

class DetailScreen extends React.Component {

  getContent() {
    if (this.props.indexOfWord == 1) {
      return(
        content.welcome
      )
    } else if (this.props.indexOfWord == 2) {
      return(
        content.blow
      )
    } else if (this.props.indexOfWord == 3) {
      return(
        content.create
      )
    } else if (this.props.indexOfWord == 4) {
      return(
        content.food
      )
    }
  }

  render() {
    return (

      <View style={styles.container}>

        <Text style={{flex:1, marginTop: 90}}>
          {this.getContent()}
        </Text>

      </View>
    )
  }
}

//Custom Button..........................
class WordButton extends Component {
  render() {
    return (
      <Button
        onPress={this.props.onPressProp}
        title={this.props.title}
        color="#841584"
        />
    );
  }
}

//Locatized Strings..........................
let heading = new LocalizedStrings({

  en:{
    welcome:"Welcome",
    blow:"Blow",
    create:"Create",
    food:"Food"
  },
  "es": {
    welcome:"Bienvenido",
    blow:"soplar",
    create:"crear",
    food:"comida"
  },
  "hi": {
    welcome:"स्वागत हे",
    blow:"फुंक मारा",
    create:"सर्जन करना",
    food:"भोजन"
  },
});

let content = new LocalizedStrings({

  en:{
    welcome:"He was given a hero's welcome when he returned home after winning the race.\nHe offered a warm welcome to the stranger.",
    blow:"I blew the candle out.\nA cold wind was blowing.",
    create:"We don't want to create any new problems.\nGod created the heaven and the earth.",
    food:"He ate the food and washed the dishes.\nShe went out to buy some food."
  },
  "es": {
    welcome:"Recibió una bienvenida de héroe cuando regresó a casa después de ganar la carrera.\nOfreció una cálida bienvenida al extraño.",
    blow:"Apagué la vela.\nUn viento frío soplaba.",
    create:"No queremos crear ningún problema nuevo.\nDios creó el cielo y la tierra.",
    food:"Él comió la comida y lavó los platos.\nElla salió a comprar algo de comida."
  },
  "hi": {
    welcome:"दौड़ जीतने के बाद जब वह घर लौट आए तो उन्हें नायक का स्वागत किया गया।\nउन्होंने अजनबी के लिए गर्मजोशी से स्वागत किया।",
    blow:"मैं मोमबत्ती बाहर उड़ा दिया।\nएक ठंडी हवा बह रही थी।",
    create:"हम कोई नई समस्याएं नहीं बनाना चाहते हैं।\nभगवान ने स्वर्ग और पृथ्वी का निर्माण किया।",
    food:"उसने खाना खाया और बर्तन धोया।\nवह कुछ खाना खरीदने के लिए बाहर गई।"
  },
});

//Styles..........................
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
