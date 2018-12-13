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
              titleStyle={{ fontSize: 28 }}
              subtitle={this.state.post.user}
              subtitleStyle={{ color: "gray" }}
              rightElement={
                <Icon
                  raised
                  name="message"
                  type="entypo"
                  //onPress={() => }
                />
              }
            />
          </View>
          <View
            style={{
              borderBottomWidth: "1px",
              borderBottomColor: "gray",
              paddingLeft: "3%",
              paddingRight: "3%",
              paddingBottom: "1%"
            }}
          >
            <Text>{this.state.post.content}</Text>
          </View>
          <View style={{ marginBottom: 100 }}>
            <Text style={{ paddingLeft: "3%" }} h4>
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
                    subtitle={item.author + "\n" + commentCAFormat}
                    subtitleStyle={{ color: "gray", textAlign: "right" }}
                    bottomDivider={true}
                  />
                );
              }}
            />
            <View style={{ marginTop: 25, flex: 1, alignItems: "center" }}>
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
              <Button title="Publish" onPress={() => this.publishComment()} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default withNavigation(PostShow);
