import FeedPage from '../containers/pages/Feed/Feed';
import LoginPage from '../containers/pages/Login/Login';
import ManageListPage from '../containers/pages/ManageList/ManageList';
import ProfilePage from '../containers/pages/Profile/Profile';
import RegisterPage from '../containers/pages/Register/Register';

const components = {
  feed: {
    path: "/",
    page: FeedPage
  },
  login: {
    path: "/",
    page: LoginPage
  },
  register: {
    path: "/register",
    page: RegisterPage
  },
  profile: {
    path: "/profile/:id",
    page: ProfilePage
  },
  list: {
    path: "/list",
    page: ManageListPage
  }
};

const roles = {
  GUEST: [
    components.login,
    components.register
  ],
  USER: [
    components.feed,
    components.profile,
    components.list
  ]
}

export default roles;