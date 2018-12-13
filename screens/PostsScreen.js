import React, { Component } from "react";
import { FlatList, ScrollView, View, Text, Image } from "react-native";
import { withNavigation } from "react-navigation";
import {
  Card,
  ListItem,
  Button,
  Icon,
  ButtonGroup
} from "react-native-elements";
import axios from "axios";
import styles from "../components/StyleSheet";
import Post from "../components/ListPost";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      allPosts: [],
      cohortPosts: [],
      cohortView: true,
      cohortPostsCount: null,
      allPostsCount: null
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    axios.get("http://capstone.tyler.fish/api/posts").then(response => {
      const postsData = response.data;
      this.setState({
        allPosts: postsData,
        allPostsCount: response.data.length
      });

      axios
        .get("http://capstone.tyler.fish/api/posts", {
          params: {
            sort_by_cohort: true
          }
        })
        .then(response => {
          this.setState({
            cohortPosts: response.data,
            cohortPostsCount: response.data.length
          });
        });
    });
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  render() {
    const newPost = this.props.navigation.getParam("newPost", false);
    if (newPost) {
      axios.get("http://capstone.tyler.fish/api/posts").then(response => {
        const postsData = response.data;
        this.setState({
          allPosts: postsData,
          allPostsCount: response.data.length
        });

        axios
          .get("http://capstone.tyler.fish/api/posts", {
            params: {
              sort_by_cohort: true
            }
          })
          .then(response => {
            this.setState({
              cohortPosts: response.data,
              cohortPostsCount: response.data.length
            });
          });
      });
    }

    const buttons = [
      "Cohort Posts (" + this.state.cohortPostsCount + ")",
      "All Posts (" + this.state.allPostsCount + ")"
    ];
    const { selectedIndex } = this.state;

    let postView = this.state.cohortPosts;
    if (this.state.selectedIndex === 1) {
      postView = this.state.allPosts;
    }

    return (
      <View style={{ flex: 1 }}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          buttonStyle={{ borderRadius: 20 }}
          containerStyle={{ borderWidth: 0 }}
          innerBorderStyle={{ width: 0 }}
        />
        <FlatList
          style={{ width: "100%" }}
          data={postView}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => {
            return <Post post={item} />;
          }}
        />
        <Icon
          raised
          name="edit"
          iconStyle={{ textAlign: "right" }}
          type="entypo"
          onPress={() => {
            this.props.navigation.navigate("PostCreate");
          }}
          containerStyle={{ position: "absolute", bottom: 0, right: 0 }}
        />
      </View>
    );
  }
}

export default Posts;
