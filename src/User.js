import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";

export default class User extends Component {
  render() {
    const fullName =
      this.props.user.first_name + " " + this.props.user.last_name;
    return (
      <ListItem
        title={fullName}
        subtitle={this.props.user.email}
        subtitleStyle={{ color: "gray" }}
        chevron={true}
        bottomDivider={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 25,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  userList: {
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 1
  },
  userName: {}
});
