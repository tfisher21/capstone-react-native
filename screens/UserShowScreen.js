import React, { Component } from "react";
import { View, FlatList, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import {
  Text,
  Divider,
  Avatar,
  Icon,
  Card,
  Button
} from "react-native-elements";
import axios from "axios";

class UserShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      user: {},
      error: ""
    };
  }

  componentDidMount() {
    this.setState({
      userId: this.props.navigation.getParam("userId")
    });
    const userId = this.props.navigation.getParam("userId");
    const request = "http://capstone.tyler.fish/api/users/" + userId;
    axios
      .get(request)
      .then(response => {
        const user = response.data;
        this.setState({ user: user });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const fullName =
      this.state.user.first_name + " " + this.state.user.last_name;
    let employment = "Available for hire!";
    if (this.state.user.post_cohort_employer) {
      employment = this.state.user.post_cohort_employer;
    }

    let cohortName = "No Cohort";
    if (this.state.user.cohort != undefined) {
      cohortName = this.state.user.cohort.name;
    }

    return (
      <View
        style={{
          marginTop: 50,
          marginBottom: 25,
          flex: 1,
          alignItems: "center"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            maxHeight: 25
          }}
        >
          <Icon
            name="linkedin-square"
            type="font-awesome"
            containerStyle={{ paddingRight: 2 }}
          />
          <Icon
            name="github-square"
            type="font-awesome"
            containerStyle={{ paddingLeft: 2 }}
          />
        </View>
        <Avatar
          size="xlarge"
          rounded={true}
          source={require("../assets/tahani.jpg")}
        />
        <Text h2>{fullName}</Text>
        <Text style={{ fontSize: 16 }}>
          Member of
          <Text style={{ fontStyle: "italic" }}> {cohortName}</Text>
        </Text>
        <View style={{ height: 10 }} />
        <Text>{this.state.user.email}</Text>
        <Text style={{ color: "red" }}>{employment}</Text>
        <ScrollView>
          <FlatList
            style={{ width: "100%" }}
            data={this.state.user.posts}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => {
              return <Post post={item} />;
            }}
          />
        </ScrollView>
      </View>
    );
  }
}

export default withNavigation(UserShow);

class Post extends Component {
  render() {
    let content = this.props.post.content;
    if (content.length > 80) {
      content = content.slice(0, 77) + "...";
    }
    return (
      <Card
        title={this.props.post.title}
        image={require("../assets/jsheader.jpg")}
      >
        <Text style={{ marginBottom: 10 }}>{content}</Text>
        <Button
          icon={<Icon name="list" color="#ffffff" />}
          iconRight={true}
          backgroundColor="#03A9F4"
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title={"Full Post"}
          onPress={() => {
            this.props.navigation.navigate("PostShow", {
              postId: this.props.post.id
            });
          }}
        />
      </Card>
    );
  }
}
