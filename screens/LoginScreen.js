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
      <View style={{ flex: 1, justifyContent: "flex-start", margin: 30 }}>
        <Text style={{ color: "orange" }} h1>
          Login to
        </Text>
        <Text style={{ marginBottom: 25, color: "gray" }} h1>
          Actualize.Social
        </Text>
        <Input
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          containerStyle={{
            borderWidth: 1,
            borderBottomWidth: 0,
            borderColor: "gray"
          }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          label="Email Address"
          labelStyle={{ opacity: 0.7, color: "gray" }}
        />
        <Input
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          containerStyle={{
            borderWidth: 1,
            borderColor: "gray"
          }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          label="Password"
          labelStyle={{ opacity: 0.7, color: "gray" }}
        />
        <Button
          title="Login"
          buttonStyle={{
            marginTop: 25,
            width: "50%",
            borderRadius: 0,
            backgroundColor: "orange"
          }}
          onPress={() => this.loginUser()}
        />
        <Text> {this.state.errors} </Text>
      </View>
    );
  }
}

export default LoginScreen;
