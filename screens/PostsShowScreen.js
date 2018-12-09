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
      post: {},
      postID: null
    };
  }

  componentDidMount() {
    this.setState({ postID: this.props.navigation.getParam("postId") });
    const request = "http://localhost:3000/api/posts/" + this.state.postID;
    axios.get(request).then(response => {
      const postData = response.data;
      this.setState({ post: postData });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Card
          title={this.state.post.title}
          image={require("../assets/jsheader.jpg")}
        />
        <Text style={{ marginBottom: 10 }}>{this.state.post.content}</Text>
      </View>
    );
  }
}
