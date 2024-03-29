import React, { Component } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  View,
  Image,
  KeyboardAvoidingView
} from "react-native";
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

  static navigationOptions = {
    title: "New Post",
    headerBackTitleStyle: {
      color: "#ff9800"
    }
  };

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
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "flex-start",
          margin: 30
        }}
        behavior="padding"
        keyboardVerticalOffset={160}
      >
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
          inputStyle={{ color: "gray" }}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
          selectionColor="orange"
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
            height: "100%",
            color: "gray"
          }}
          onChangeText={content => this.setState({ content })}
          value={this.state.content}
          selectionColor="orange"
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
        <View style={{ height: 60 }} />
      </KeyboardAvoidingView>
    );
  }
}

export default withNavigation(PostCreate);
