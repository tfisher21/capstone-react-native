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
          source: require("../assets/tahani.jpg")
        }}
        title={fullName}
        subtitle={cohortName}
        subtitleStyle={{ color: "gray" }}
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
