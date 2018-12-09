import React, { Component } from "react";
import { FlatList, View, Text, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import axios from "axios";
import styles from "../components/StyleSheet";
import Post from "../components/ListPost";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3000/api/posts").then(response => {
      const postsData = response.data;
      this.setState({ posts: postsData });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ width: "100%" }}
          data={this.state.posts}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => {
            return <Post post={item} />;
          }}
        />
      </View>
    );
  }
}
