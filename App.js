import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { createStackNavigator, createAppContainer } from "react-navigation";
import axios from "axios";
import Users from "./src/Users";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: ""
    };
    this.loginUser = this.loginUser.bind(this);
  }

  loginUser() {
    var params = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post("http://localhost:3000/api/sessions", params)
      .then(response => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        AsyncStorage.setItem("jwt", response.data.jwt);
        this.props.navigation.navigate("Details");
      })
      .catch(errors => {
        console.log(errors.message);
        this.setState({ errors: errors.message });
      });
  }

  render() {
    return (
      <View>
        <Text h4>Login to Actualize.Social</Text>
        <Input
          placeholder="email"
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          valuse={this.state.email}
        />
        <Input
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          valuse={this.state.password}
        />
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
          onPress={() => this.loginUser()}
        />
        <Text> {this.state.errors} </Text>
      </View>
    );
  }
}

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Users />;
  }
}

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);
