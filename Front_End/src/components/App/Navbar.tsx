import React from "react";
import {
  fade,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Login from "../../../stores/login/components/FormPage";
import Section from "./Section";
import { logout } from "../../../stores/login/actions/login";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { getWineListByType } from "../../../stores/wine_info/actions/wineInfo";
// Redux
import { useSelector, useDispatch } from "react-redux";
import AfterSection from "./AfterSection";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    link: {
      margin: theme.spacing(1, 1.5)
    },

    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      height: 100
    },
    toolbar: {
      height: 100,
      paddingLeft: 100
    },
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      },
      fontSize: 40,
      fontFamily: "S-CoreDream-8Heavy"
    },
    sign: {
      marginLeft: "20px"
    },

    wine_img: {
      width: "48px",
      heigth: "48px",
      marginRight: "5px"
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    }
  })
);
export default function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const logoutFunction = () => {
    //e.preventDefault();

    window.location.href = "/ranking";
    sessionStorage.clear();
    localStorage.clear();
    logout();
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Link
          to="/myAccount"
          className={classes.link}
          style={{ textDecoration: "none", color: "#000000" }}
        >
          개인정보변경
        </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <img
            className={classes.wine_img}
            src="https://image.flaticon.com/icons/svg/1150/1150262.svg"
            alt="wine"
          />
          <Link to="/ranking">
            <Typography className={classes.title} variant="h6" noWrap>
              Dionysos
            </Typography>
          </Link>

          {(function() {
            if (!sessionStorage.getItem("userInfo")) {
              return <Section />;
            } else {
              return <AfterSection />;
            }
          })()}
          <div className={classes.grow} />

          {(function() {
            if (!sessionStorage.getItem("userInfo")) {
              return (
                <div className={classes.sign}>
                  <Button onClick={handleOpen} className={classes.link}>
                    Login
                  </Button>
                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500
                    }}
                  >
                    <Fade in={open}>
                      {/* <div className={classes.paper}> */}
                      <Login />
                      {/* </div> */}
                    </Fade>
                  </Modal>
                  <Button>
                    <Link
                      to="/signUp"
                      className={classes.link}
                      style={{ textDecoration: "none", color: "#000000" }}
                    >
                      SignUp{" "}
                    </Link>
                  </Button>
                </div>
              );
            } else {
              return (
                <div>
                  <div className={classes.sectionDesktop}>
                    <IconButton
                      edge="end"
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>

                    <Button onClick={logoutFunction} className={classes.link}>
                      Logout{" "}
                    </Button>
                  </div>
                </div>
              );
            }
          })()}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
