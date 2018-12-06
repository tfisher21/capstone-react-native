import React, { Component } from "react";
import { View } from "react-native";
import { Text, Input } from "react-native-elements";
import { createStackNavigator, createAppContainer } from "react-navigation";
import axios from "axios";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    function onPressLearnMore() {
      console.log("Button Pressed");
    }

    return (
      <View>
        <Text h4>Login to Actualize.Social</Text>
        <Input placeholder="email" />
        <Input placeholder="password" />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Login: {
    screen: LoginScreen
  }
});

export default createAppContainer(AppNavigator);
