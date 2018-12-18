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
  Input
} from "react-native-elements";
import { withNavigation } from "react-navigation";
import axios from "axios";
import moment from "moment";
import styles from "../components/StyleSheet";
import Post from "../components/ListPost";

class PostShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      content: ""
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

  publishComment(content) {
    var params = {
      content: this.state.content,
      post_id: this.state.post.id
    };
    console.log(this.state.post.id);
    axios
      .post("http://capstone.tyler.fish/api/post_comments", params)
      .then(response => {
        this.setState({ content: "" });
        const request =
          "http://capstone.tyler.fish/api/posts/" + params.post_id;
        axios.get(request).then(response => {
          const postData = response.data;
          this.setState({ post: postData });
        });
      })
      .catch(errors => {
        console.log(errors.message);
        this.setState({ errors: errors.message });
      });
  }

  render() {
    const dimensions = Dimensions.get("window");
    const imageHeight = Math.round((dimensions.width * 9) / 16);
    const imageWidth = dimensions.width;

    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={40}>
        <ScrollView stickyHeaderIndices={[1]}>
          <Image
            source={require("../assets/jsheader.jpg")}
            style={{ height: imageHeight, width: imageWidth }}
          />
          <View>
            <ListItem
              title={this.state.post.title}
              titleStyle={{ fontSize: 28, color: "orange" }}
              subtitle={this.state.post.user}
              subtitleStyle={{ color: "gray" }}
              rightElement={
                <Icon
                  raised
                  reverse
                  name="message"
                  iconStyle={{ textAlign: "right", color: "white" }}
                  type="entypo"
                  // onPress={() => {}}
                  containerStyle={{
                    position: "absolute",
                    bottom: 0,
                    right: 0
                  }}
                  color="orange"
                />
              }
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              marginLeft: 10,
              marginRight: 10,
              paddingBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "gray"
            }}
          >
            <Text style={{ color: "gray" }}>{this.state.post.content}</Text>
          </View>
          <View style={{ margin: 10, flex: 1, justifyContent: "flex-start" }}>
            <Text style={{ color: "orange" }} h4>
              Comments
            </Text>
            <FlatList
              data={this.state.post.comments}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item }) => {
                const commentCreatedAt = moment(item.created_at);
                const commentCAFormat = commentCreatedAt.format(
                  "YYYY-MM-DD hh:mm a"
                );
                return (
                  <ListItem
                    title={item.content}
                    titleStyle={{ color: "gray" }}
                    subtitle={item.author + "\n" + commentCAFormat}
                    subtitleStyle={{ color: "#ffab40", textAlign: "right" }}
                    bottomDivider={true}
                  />
                );
              }}
            />
            <View
              style={{
                margin: 10,
                marginBottom: 50,
                flex: 1
              }}
            >
              <Input
                multiline={true}
                autoCapitalize="none"
                label="Anything to add?"
                labelStyle={{ opacity: 0.7, color: "gray" }}
                containerStyle={{
                  borderWidth: 1,
                  borderColor: "gray",
                  height: "100%",
                  alignSelf: "center"
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
                onPress={() => this.publishComment()}
                buttonStyle={{
                  width: "50%",
                  borderRadius: 0,
                  backgroundColor: "orange"
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default withNavigation(PostShow);
