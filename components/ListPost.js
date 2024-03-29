import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import styles from "./StyleSheet.js";

class Post extends Component {
  render() {
    let content = this.props.post.content;
    if (content.length > 80) {
      content = content.slice(0, 77) + "...";
    }
    return (
      <Card
        title={this.props.post.title}
        titleStyle={{ color: "orange" }}
        image={require("../assets/jsheader.jpg")}
        style={{ margin: 0, padding: 0 }}
      >
        <Text style={{ marginBottom: 10, color: "gray" }}>{content}</Text>
        <Button
          icon={<Icon name="list" color="white" />}
          iconRight={true}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            backgroundColor: "#9e9e9e"
          }}
          title={
            "Full Post + Comments (" +
            this.props.post.comments.length.toString() +
            ")"
          }
          onPress={() => {
            this.props.navigation.navigate("PostShow", {
              postId: this.props.post.id
            });
          }}
        />
        <Text
          style={{
            marginTop: 2,
            textAlign: "right",
            fontSize: 12,
            color: "gray"
          }}
        >
          {this.props.post.author}
        </Text>
      </Card>
    );
  }
}

export default withNavigation(Post);
