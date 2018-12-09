import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import axios from "axios";
import Users from "./screens/UsersScreen";
import LoginScreen from "./screens/LoginScreen";
import Posts from "./screens/PostsScreen";
import PostsShow from "./screens/PostsShowScreen";

const PostsStack = createSwitchNavigator({
  PostIndex: Posts,
  PostShow: PostsShow
});

const AuthStack = createStackNavigator({ Login: LoginScreen });

const AppStack = createBottomTabNavigator({
  Posts: Posts,
  Users: Users
});

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
