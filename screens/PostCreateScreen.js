import React, { Component } from "react";
import { Dimensions, FlatList, ScrollView, View, Image } from "react-native";
import {
  Card,
  Text,
  ListItem,
  Button,
  Icon,
  Tile
} from "react-native-elements";
import { withNavigation } from "react-navigation";
import axios from "axios";
import moment from "moment";
import styles from "../components/StyleSheet";
import Post from "../components/ListPost";

class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <Text h1>Post Create</Text>
      </View>
    );
  }
}

export default withNavigation(PostCreate);
