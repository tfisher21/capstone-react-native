import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
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
    return (
      <View>
        <Text>Login to Actualize.Social</Text>
        <TextInput
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          placeholder="email"
          placeholderColor="gray"
          style={{ borderBottomWidth: 1 }}
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
