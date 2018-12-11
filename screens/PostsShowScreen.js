import React, { Component } from "react";
import { FlatList, ScrollView, View, Text, Image } from "react-native";
import { Card, ListItem, Button, Icon, Tile } from "react-native-elements";
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
    const request = "http://capstone.tyler.fish/api/posts/" + postId;
    axios.get(request).then(response => {
      const postData = response.data;
      this.setState({ post: postData });
    });
  }

  render() {
    return (
      <Tile
        imageSrc={require("../assets/jsheader.jpg")}
        title={this.state.post.title}
        titleStyle={{ textAlign: "center" }}
        contentContainerStyle={{ height: "70%" }}
        containerStyle={{ height: "100%" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start"
          }}
        >
          <Text style={{ color: "gray" }}>{this.state.post.user}</Text>
          <Text>Caption</Text>
        </View>
      </Tile>
    );
  }
}

export default withNavigation(PostShow);
