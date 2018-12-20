import React, { Component } from "react";
import { View, FlatList, ScrollView, Linking } from "react-native";
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

  static navigationOptions = {
    title: "User",
    headerBackTitleStyle: {
      color: "#ff9800"
    }
  };

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

  coffeeInvite() {
    console.log("Coffee!");
    axios.get("http://capstone.tyler.fish/api/sms/send");
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
          marginTop: 10,
          // marginBottom: 25,
          flex: 1,
          alignItems: "center"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            maxHeight: 25,
            minHeight: 25,
            marginBottom: 5
          }}
        >
          <Icon
            name="linkedin-square"
            type="font-awesome"
            containerStyle={{ paddingRight: 2 }}
            color="#424242"
            onPress={() =>
              Linking.openURL("https://www.linkedin.com/in/tylerfisher1/")
            }
          />
          <Icon
            name="github-square"
            type="font-awesome"
            color="#424242"
            containerStyle={{ paddingLeft: 2 }}
            onPress={() => Linking.openURL("https://www.github.com/tfisher21")}
          />
        </View>
        <Avatar
          size="xlarge"
          rounded={true}
          source={{ uri: this.state.user.avatar }}
          containerStyle={{ borderWidth: 1, borderColor: "#9e9e9e" }}
        />
        <Text style={{ color: "#ff9800" }} h2>
          {fullName}
        </Text>
        <Text style={{ fontSize: 16, color: "#9e9e9e" }}>
          Member of
          <Text style={{ fontStyle: "italic", color: "#212121" }}>
            {" "}
            {cohortName}
          </Text>
        </Text>
        <View style={{ height: 10 }} />
        <Text style={{ color: "#9e9e9e" }}>{this.state.user.email}</Text>
        <Text style={{ color: "#212121" }}>{employment}</Text>
        <FlatList
          style={{ width: "100%" }}
          data={this.state.user.posts}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={({ item }) => {
            return <Post post={item} />;
          }}
        />
        <Icon
          raised
          reverse
          name="coffee"
          iconStyle={{ textAlign: "right" }}
          type="font-awesome"
          color="#ff9800"
          onPress={() => {
            this.props.navigation.navigate("CoffeeInvite");
          }}
          containerStyle={{ position: "absolute", right: 0 }}
        />
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
        titleStyle={{ color: "orange" }}
        image={require("../assets/jsheader.jpg")}
      >
        <Text style={{ marginBottom: 10, color: "gray" }}>{content}</Text>
        <Button
          icon={<Icon name="list" color="#ffffff" />}
          iconRight={true}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            backgroundColor: "#9e9e9e"
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
