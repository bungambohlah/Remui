import * as React from 'react';

import * as PropTypes from 'prop-types';

import {
  withStyles,
  Theme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Hidden,
  Divider,
  Tooltip,
} from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MenuIcon from '@material-ui/icons/Menu';

import CookieBanner from './CookieBanner';
import { UserContext, UserContextConsumer } from './App';

const drawerWidth = 240;

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbarMixin: theme.mixins.toolbar,
  toolbar: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
  },
  contentTitle: {
    flex: 1,
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  contentContainer: theme.typography.body1,
});

interface IProps {
  classes: any;
  theme: Theme;
  navigation: JSX.Element;
  appTitle: JSX.Element;
  contentTitle: string;
  cookieBannerContent: JSX.Element;
  onCloseCallbackChanged: (callback: () => void) => void;
}

interface IState {
  open: boolean;
}

export class Desktop extends React.Component<IProps, IState> {
  public static propTypes: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false,
    };
    this.props.onCloseCallbackChanged(() => {
      this.setState({
        open: false,
      });
    });
  }

  private handleDrawerToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  private handleProfileClick = (userContext: UserContext) => () => {
    if (userContext.user.isAnonymous) {
      userContext.login();
    } else {
      userContext.logout();
    }
  };

  public render() {
    const {
      classes,
      theme,
      children,
      navigation,
      appTitle,
      contentTitle,
      cookieBannerContent,
    } = this.props;

    const { handleDrawerToggle, handleProfileClick } = this;

    const drawer = (
      <div>
        <Toolbar className={classes.toolbar}>
          <Typography variant="title" color="inherit" component="h1" noWrap>
            {appTitle}
          </Typography>
        </Toolbar>
        <Divider />
        {navigation}
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Tooltip title="Navigation">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                className={classes.navIconHide}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Typography
              className={classes.contentTitle}
              align="center"
              variant="title"
              component="h2"
              color="inherit"
              noWrap
            >
              {contentTitle}
            </Typography>
            <UserContextConsumer>
              {(userContext: UserContext) => (
                <Tooltip title="User Profile">
                  <IconButton
                    color="inherit"
                    aria-label="profile"
                    onClick={handleProfileClick(userContext)}
                  >
                    {userContext.user.isAnonymous ? (
                      <PersonOutlineIcon />
                    ) : (
                      <PersonIcon />
                    )}
                  </IconButton>
                </Tooltip>
              )}
            </UserContextConsumer>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.open}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbarMixin} />
          <div className={classes.contentContainer}>{children}</div>
        </main>
        <CookieBanner>{cookieBannerContent}</CookieBanner>
      </div>
    );
  }
}

Desktop.propTypes = {
  appTitle: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Desktop);
