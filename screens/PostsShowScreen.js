import React, { Component } from "react";
import { FlatList, View, Text, Image } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import axios from "axios";
import styles from "../components/StyleSheet";
import Post from "../components/ListPost";

class PostShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {}
    };
  }

  componentDidMount() {
    const postId = this.props.navigation.getParam("postId");
    const request = "http://localhost:3000/api/posts/" + postId;
    axios.get(request).then(response => {
      const postData = response.data;
      this.setState({ post: postData });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/jsheader.jpg")}
          style={{ flex: 1, alignItems: "baseline" }}
          resizeMode="contain"
        />
        <Text>{this.state.post.title}</Text>
      </View>
    );
  }
}

export default withNavigation(PostShow);
