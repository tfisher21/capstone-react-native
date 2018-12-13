import React, { Component } from "react";
import { Dimensions, FlatList, ScrollView, View, Image } from "react-native";
import {
  Card,
  Text,
  ListItem,
  Button,
  Icon,
  Tile,
  Input
} from "react-native-elements";
import { withNavigation } from "react-navigation";
import axios from "axios";
import moment from "moment";
import styles from "../components/StyleSheet";
import Post from "../components/ListPost";

class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      title: ""
    };
  }

  loginUser() {
    var params = {
      title: this.state.title,
      content: this.state.content
    };
    axios
      .post("http://capstone.tyler.fish/api/posts/create", params)
      .then(response => {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.jwt;
      })
      .catch(errors => {
        console.log(errors.message);
        this.setState({ errors: errors.message });
      });
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ marginTop: 25, color: "#86939e" }} h4>
          New Post
        </Text>
        <Input
          autoCapitalize="none"
          label="Title"
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: "#F0F0F0",
            borderRadius: 25
          }}
          containerStyle={{ marginBottom: 15 }}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <Input
          multiline={true}
          autoCapitalize="none"
          label="What are your thoughts?"
          inputContainerStyle={{
            borderBottomWidth: 0,
            backgroundColor: "#F0F0F0",
            borderRadius: 25,
            height: "80%"
          }}
          inputStyle={{
            height: "95%",
            // height: null,
            justifyContent: "flex-start"
          }}
          containerStyle={{ height: "70%" }}
          onChangeText={content => this.setState({ content })}
          value={this.state.content}
        />
        <Button title="Publish" onPress={() => this.publishPost()} />
      </View>
    );
  }
}

export default withNavigation(PostCreate);
