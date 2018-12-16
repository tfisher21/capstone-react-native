import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";
import User from "../components/User";
import styles from "../components/StyleSheet";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get("http://capstone.tyler.fish/api/users").then(response => {
      const usersData = response.data;
      this.setState({ users: usersData });
    });
  }

  render() {
    return (
      <View
      // style={styles.container}
      >
        <FlatList
          style={{ width: "100%" }}
          data={this.state.users}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => {
            return <User user={item} />;
          }}
        />
      </View>
    );
  }
}
