import React, { Component } from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import { Icon } from "react-native-elements";
import axios from "axios";
import Users from "./screens/UsersScreen";
import UserShow from "./screens/UserShowScreen";
import LoginScreen from "./screens/LoginScreen";
import Posts from "./screens/PostsScreen";
import PostShow from "./screens/PostsShowScreen";
import PostCreate from "./screens/PostCreateScreen";
import CoffeeInvite from "./screens/CoffeeInvite";

const PostsStack = createStackNavigator(
  {
    PostIndex: Posts,
    PostShow: PostShow,
    PostCreate: PostCreate,
    CoffeeInvite: CoffeeInvite
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ff9800"
      }
    },
    headerBackTitleVisible: false
  }
);

const UsersStack = createStackNavigator(
  {
    UsersIndex: Users,
    UserShow: UserShow
  },
  {
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ff9800"
      }
    },
    headerBackTitleVisible: false
  }
);

const AuthStack = createStackNavigator({ Login: LoginScreen });

const AppStack = createBottomTabNavigator(
  {
    Posts: PostsStack,
    Users: UsersStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Posts") {
          iconName = `text-document${focused ? "" : "-inverted"}`;
        } else if (routeName === "Users") {
          iconName = `users`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Icon
            name={iconName}
            type="entypo"
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "#ff9800",
      inactiveTintColor: "gray",
      showLabel: false
    }
  }
);

const AppNavigator = createSwitchNavigator(
  {
    Login: AuthStack,
    App: AppStack
  },
  {
    initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);
