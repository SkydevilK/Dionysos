import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import brown from "@material-ui/core/colors/brown";
import { getWineListByType } from "../../../stores/wine_info/actions/wineInfo";
// Redux
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarSecondary: {
      // justifyContent: "center",
      position: "relative",
      marginLeft: 120
    },
    toolbarLink: {
      fontSize: 20,
      color: "#ffffff",
      padding: theme.spacing(4),
      flexShrink: 0,
      fontFamily: "S-CoreDream-8Heavy"
    }
  })
);

const sections = [
  { title: "Home", url: "/ranking" },
  { title: "와인 리스트", url: "/list" },
  { title: "와인 리뷰", url: "/wineReview" },
  { title: "Smart Search", url: "/smartSearch" }
];

export default function Section() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onWineList = async () => {
    console.log("onWineList");
    await dispatch(getWineListByType("KOR_UP"));
  };
  return (
    <React.Fragment>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map(section => (
          <Link
            color="inherit"
            key={section.title}
            to={section.url}
            // onClick={onWineList}
            className={classes.toolbarLink}
            style={{ textDecoration: "none", color: "#000000" }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}
