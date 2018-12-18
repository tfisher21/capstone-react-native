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
      title: "",
      errors: ""
    };
  }

  publishPost() {
    var params = {
      title: this.state.title,
      content: this.state.content
    };
    axios
      .post("http://capstone.tyler.fish/api/posts", params)
      .then(response => {
        this.props.navigation.navigate("PostIndex", { newPost: true });
      })
      .catch(errors => {
        console.log(errors.message);
        this.setState({ errors: errors.message });
      });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "flex-start", margin: 30 }}>
        <Text style={{ marginBottom: 25, color: "orange" }} h1>
          {"New "}
          <Text style={{ color: "gray" }} h1>
            Post
          </Text>
        </Text>
        <Input
          autoCapitalize="none"
          label="Title"
          labelStyle={{ opacity: 0.7, color: "gray" }}
          containerStyle={{
            borderWidth: 1,
            borderBottomWidth: 0,
            borderColor: "gray"
          }}
          inputContainerStyle={{
            borderBottomWidth: 0
          }}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <Input
          multiline={true}
          autoCapitalize="none"
          label="What are your thoughts?"
          labelStyle={{ opacity: 0.7, color: "gray" }}
          containerStyle={{
            borderWidth: 1,
            borderColor: "gray",
            height: "60%"
          }}
          inputContainerStyle={{
            borderBottomWidth: 0,
            height: "95%"
          }}
          inputStyle={{
            height: "100%"
          }}
          onChangeText={content => this.setState({ content })}
          value={this.state.content}
        />
        <Text>{this.state.errors}</Text>
        <Button
          title="Publish"
          onPress={() => this.publishPost()}
          buttonStyle={{
            marginTop: 25,
            width: "50%",
            borderRadius: 0,
            backgroundColor: "orange"
          }}
        />
      </View>
    );
  }
}

export default withNavigation(PostCreate);
