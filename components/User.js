import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import { ListItem } from "react-native-elements";
import styles from "./StyleSheet.js";

class User extends Component {
  render() {
    const fullName =
      this.props.user.first_name + " " + this.props.user.last_name;
    let cohortName = "No Cohort";
    if (this.props.user.cohort != undefined) {
      cohortName = this.props.user.cohort.name;
    }
    return (
      <ListItem
        leftAvatar={{
          size: "small",
          rounded: true,
          borderWidth: 1,
          borderColor: "#9e9e9e",
          source: this.props.user.avatar && { uri: this.props.user.avatar }
        }}
        title={fullName}
        titleStyle={{ color: "#ff9800" }}
        subtitle={cohortName}
        subtitleStyle={{ color: "#9e9e9e" }}
        chevron={true}
        bottomDivider={true}
        onPress={() =>
          this.props.navigation.navigate("UserShow", {
            userId: this.props.user.id
          })
        }
      />
    );
  }
}

export default withNavigation(User);
