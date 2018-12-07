import React, { Component } from "react";
import { View } from "react-native";
import { Button, Text, Input } from "react-native-elements";
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

  loginUser() {}

  render() {
    return (
      <View>
        <Text h4>Login to Actualize.Social</Text>
        <Input placeholder="email" />
        <Input placeholder="password" />
        <Button
          title="Login"
          buttonStyle={{
            marginTop: 20,
            marginLeft: 300,
            width: 70,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 10
          }}
          onPress={this.loginUser}
        />
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
