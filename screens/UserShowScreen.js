import React, { Component } from "react";
import { View, Text } from "react-native";
import { withNavigation } from "react-navigation";

class UserShow extends Component {
  render() {
    return (
      <View>
        <Text>UserShow</Text>
      </View>
    );
  }
}

export default withNavigation(UserShow);
