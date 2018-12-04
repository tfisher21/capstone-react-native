import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import axios from "axios";

class User extends Component {
  render() {
    const fullName = this.props.user.first_name + " " + this.props.user.last_name;
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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/api/users").then(response => {
      const usersData = response.data;
      this.setState({ users: usersData });
    });
  }

  renderItem(item) {}

  render() {
    return (
      <View style={styles.container}>
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
