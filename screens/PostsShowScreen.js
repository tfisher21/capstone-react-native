import React, { Component } from "react";
import { Dimensions, FlatList, ScrollView, View, Image } from "react-native";
import {
  Card,
  Text,
  ListItem,
  Button,
  Icon,
  Tile
} from "react-native-elements";
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
    const dimensions = Dimensions.get("window");
    const imageHeight = Math.round((dimensions.width * 9) / 16);
    const imageWidth = dimensions.width;
    return (
      <ScrollView stickyHeaderIndices={[1]}>
        <Image
          source={require("../assets/jsheader.jpg")}
          style={{ height: imageHeight, width: imageWidth }}
        />
        <View style={{ backgroundColor: "white" }}>
          <Text h1>{this.state.post.title}</Text>
        </View>
        <View>
          <Text style={{ color: "gray" }}>{this.state.post.user}</Text>
          <Text>{this.state.post.content}</Text>
        </View>
      </ScrollView>
    );
  }
}

export default withNavigation(PostShow);
