import React, { Component } from "react";
import { View } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import { withNavigation } from "react-navigation";
import axios from "axios";
import moment from "moment";
import styles from "../components/StyleSheet";
import Post from "../components/ListPost";

class NewComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      errors: ""
    };
  }

  // publishComment() {
  //   var params = {
  //     content: this.state.content
  //   };
  //   axios
  //     .post("http://capstone.tyler.fish/api/posts", params)
  //     .then(response => {})
  //     .catch(errors => {
  //       console.log(errors.message);
  //       this.setState({ errors: errors.message });
  //     });
  // }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ marginTop: 25, color: "#86939e" }} h4>
          New Post
        </Text>
        <Input
          multiline={true}
          autoCapitalize="none"
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
        <Text>{this.state.errors}</Text>
        <Button title="Publish" onPress={this.props.publishComment} />
      </View>
    );
  }
}

export default withNavigation(NewComment);
