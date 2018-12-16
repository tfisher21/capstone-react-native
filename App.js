import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import axios from "axios";
import Users from "./screens/UsersScreen";
import UserShow from "./screens/UserShowScreen";
import LoginScreen from "./screens/LoginScreen";
import Posts from "./screens/PostsScreen";
import PostShow from "./screens/PostsShowScreen";
import PostCreate from "./screens/PostCreateScreen";
import CoffeeInvite from "./screens/CoffeeInvite";

const PostsStack = createStackNavigator({
  PostIndex: Posts,
  PostShow: PostShow,
  PostCreate: PostCreate,
  CoffeeInvite: CoffeeInvite
});

const UsersStack = createStackNavigator({
  UsersIndex: Users,
  UserShow: UserShow
});

const AuthStack = createStackNavigator({ Login: LoginScreen });

const AppStack = createBottomTabNavigator({
  Posts: PostsStack,
  Users: UsersStack
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
