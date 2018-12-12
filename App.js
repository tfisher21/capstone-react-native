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
import PostShow from "./screens/PostsShowScreen";
import PostCreate from "./screens/PostCreateScreen";

const PostsStack = createStackNavigator({
  PostIndex: Posts,
  PostShow: PostShow,
  PostCreate: PostCreate
});

const AuthStack = createStackNavigator({ Login: LoginScreen });

const AppStack = createBottomTabNavigator({
  Posts: PostsStack,
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
