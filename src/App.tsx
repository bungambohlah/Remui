import React from 'react';

import * as PropTypes from 'prop-types';

import { withStyles, Theme, Slide, Typography } from '@material-ui/core';

import { CookiesProvider } from 'react-cookie';

import HomeIcon from '@material-ui/icons/Home';
import InboxIcon from '@material-ui/icons/Inbox';

import Navigation, { NavigationProvider, INavigationItem } from './Navigation';

import {
  BrowserRouter as RouterProvider,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Desktop from './Desktop';

interface IUser {
  isAnonymous: boolean;
  username: string;
}

interface IState {
  user: IUser;
  item?: INavigationItem;
  items: INavigationItem[];
  closeDrawer: () => void;
}

/**
 * provided user context
 */
export class UserContext {
  public get user() {
    return this.app ? this.app.state.user : ANONYMOUS_USER;
  }

  constructor(private app?: App) {}

  login(): void {
    if (this.app) {
      this.app.setState({
        user: REGISTERED_USER,
        // setup routes for registered users
        items: new Array<INavigationItem>()
          .concat(PUBLIC_ROUTES)
          .concat(PRIVATE_ROUTES),
      });
    }
  }

  logout(): void {
    if (this.app) {
      this.app.setState({
        user: ANONYMOUS_USER,
        // setup routes for anonymous users
        items: new Array<INavigationItem>().concat(PUBLIC_ROUTES),
      });
    }
  }
}

const { Provider, Consumer } = React.createContext<UserContext>(
  new UserContext()
);

// contents...

const HomeContent = () => (
  <Slide in direction="left">
    <div>
      <Typography variant="h6" component="h3" paragraph>
        <UserContextConsumer>
          {(context: UserContext) => (
            <React.Fragment>
              Welcome {context.user.isAnonymous ? null : context.user.username}
            </React.Fragment>
          )}
        </UserContextConsumer>
      </Typography>
      <Typography variant="body1" component="p">
        Hello Home
      </Typography>
    </div>
  </Slide>
);
const InboxContent = () => (
  <Slide in direction="left">
    <div>
      <Typography variant="h6" component="h3" paragraph>
        Recently Received Messages
      </Typography>
      <Typography variant="body1" component="p">
        Hello Inbox
      </Typography>
    </div>
  </Slide>
);

// redirect home with navigation event
const RedirectHome = (props: any) => () => {
  props.onNavigation(props.home);
  return <Redirect to="/home" />;
};

// users...

const ANONYMOUS_USER: IUser = { username: 'Anonymous User', isAnonymous: true };
const REGISTERED_USER: IUser = {
  username: 'Registered User',
  isAnonymous: false,
};

// general routes, accessible by all users
const PUBLIC_ROUTES: INavigationItem[] = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    route: <Route key="home" path="/home" component={HomeContent} />,
  },
];

// restricted routes, visible only to registered users
const PRIVATE_ROUTES: INavigationItem[] = [
  {
    title: 'Inbox',
    icon: <InboxIcon />,
    route: <Route key="inbox" path="/inbox" component={InboxContent} />,
  },
];

// app styles
const styles = (theme: Theme) => ({});

/**
 * App Component
 */
export class App extends React.Component<any, IState> {
  public static propTypes: any;

  private readonly appTitle = document.title;

  constructor(props: any) {
    super(props);
    const items = new Array<INavigationItem>().concat(PUBLIC_ROUTES);
    const item = items.find(
      (item) => item.route.props.path === window.location.pathname
    );
    this.state = {
      user: ANONYMOUS_USER,
      item,
      items,
      closeDrawer: () => {},
    };
    document.title = item ? `${this.appTitle} 🔹 ${item.title}` : this.appTitle;
  }

  private readonly handleNavigation = (item: INavigationItem) => {
    console.log('navigate', item);
    document.title = item ? `${this.appTitle} 🔹 ${item.title}` : this.appTitle;
    this.state.closeDrawer();
    this.setState({
      item,
    });
  };

  private readonly handleCloseDrawerCallbackChanged = (
    closeDrawer: () => void
  ) => {
    this.setState({
      closeDrawer,
    });
  };

  public render() {
    const { appTitle } = this;
    const { item, items } = this.state;
    const navigation = <Navigation onNavigation={this.handleNavigation} />;
    return (
      <Provider value={new UserContext(this)}>
        <CookiesProvider>
          <NavigationProvider navigation={{ items }}>
            <RouterProvider>
              <Desktop
                appTitle={appTitle}
                contentTitle={item ? item.title : ''}
                cookieBannerContent={
                  <Typography color="inherit" variant="body2" component="div">
                    <strong>This site uses cookies.</strong>
                  </Typography>
                }
                navigation={navigation}
                onCloseCallbackChanged={this.handleCloseDrawerCallbackChanged}
              >
                <Switch>
                  {items.map((item) => item.route)}
                  <Route
                    component={RedirectHome({
                      home: this.state.items[0],
                      onNavigation: this.handleNavigation,
                    })}
                  />
                </Switch>
              </Desktop>
            </RouterProvider>
          </NavigationProvider>
        </CookiesProvider>
      </Provider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export const UserContextConsumer = Consumer;

export default withStyles(styles, { withTheme: true })(App);
