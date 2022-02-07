import * as React from 'react';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  withStyles,
} from '@material-ui/core';

import { Route, NavLink } from 'react-router-dom';

export interface INavigationItem {
  title: string;
  icon: JSX.Element;
  route: Route;
}

export interface INavigationContext {
  items: INavigationItem[];
}

const { Provider, Consumer } = React.createContext<INavigationContext>({
  items: [],
});

const styles = (theme: Theme) => ({
  link: {
    textDecoration: 'inherit',
  },
  activeLink: {
    backgroundColor: theme.palette.action.selected,
    '& button': {
      backgroundColor: 'inherit',
    },
    '& button div h3': {
      fontWeight: 'bold',
    },
  },
});

export class NavigationProvider extends React.Component<any, any> {
  render() {
    const { navigation, children } = this.props;
    return <Provider value={navigation}>{children}</Provider>;
  }
}

export class Navigation extends React.Component<any, any> {
  private readonly handleNavigationClick = (item: INavigationItem) => () => {
    if (this.props.onNavigation) {
      this.props.onNavigation(item);
    }
  };

  public render() {
    const { classes } = this.props;
    return (
      <Consumer>
        {(navigation: INavigationContext) => (
          <List component="nav">
            {navigation.items.map((item, key) => (
              <NavLink
                key={key}
                to={item.route.props.path}
                className={classes.link}
                activeClassName={classes.activeLink}
              >
                <ListItem
                  button
                  dense
                  component="button"
                  onClick={this.handleNavigationClick(item)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    secondary={item.route.props.path}
                  />
                </ListItem>
              </NavLink>
            ))}
          </List>
        )}
      </Consumer>
    );
  }
}

export default withStyles(styles)(Navigation);
