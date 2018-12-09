import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import styles from "./StyleSheet.js";

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
