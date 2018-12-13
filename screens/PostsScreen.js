import React, { Component } from "react";
import { FlatList, View, Text, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import axios from "axios";
import styles from "../components/StyleSheet";
import Post from "../components/ListPost";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios.get("http://capstone.tyler.fish/api/posts").then(response => {
      const postsData = response.data;
      this.setState({ posts: postsData });
    });
  }

  render() {
    const newPost = this.props.navigation.getParam("newPost", false);
    if (newPost) {
      axios.get("http://capstone.tyler.fish/api/posts").then(response => {
        const postsData = response.data;
        this.setState({ posts: postsData });
      });
    }
    return (
      <View style={{ flex: 1 }}>
        <Text>{newPost}</Text>
        <FlatList
          style={{ width: "100%" }}
          data={this.state.posts}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => {
            return <Post post={item} />;
          }}
        />
        <Icon
          raised
          name="edit"
          iconStyle={{ textAlign: "right" }}
          type="entypo"
          onPress={() => {
            this.props.navigation.navigate("PostCreate");
          }}
          containerStyle={{ position: "absolute", bottom: 0, right: 0 }}
        />
      </View>
    );
  }
}

export default Posts;
