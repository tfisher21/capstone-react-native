import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import styles from "./StyleSheet.js";

export default class Post extends Component {
  render() {
    return (
      <Card
        title={this.props.post.title}
        image={require("../assets/jsheader.jpg")}
      >
        <Text style={{ marginBottom: 10 }}>{this.props.post.content}</Text>
        <Button
          icon={<Icon name="list" color="#ffffff" />}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title={
            "Comments (" + this.props.post.comments.length.toString() + ")"
          }
          onClick={this.props.navigation.navigate("PostShow", {
            postId: this.props.post.post_id
          })}
        />
      </Card>
    );
  }
}
