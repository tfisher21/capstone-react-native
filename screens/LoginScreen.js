import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import axios from "axios";
import styles from "../components/StyleSheet";

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
      .post("http://capstone.tyler.fish/api/sessions", params)
      .then(response => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
        AsyncStorage.setItem("jwt", response.data.jwt);
        this.props.navigation.navigate("App");
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
          value={this.state.email}
        />
        <Input
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
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

export default LoginScreen;
