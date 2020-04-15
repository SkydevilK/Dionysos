import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Rating } from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";
import "../../index.css";

interface WineInfo {
  wid: number;
  nameKor: string;
  nameEng: string;
  type: string;
  info: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    cardMedia: {
      // width: '100%',
      // maxHeight: 'auto',
      width: "70px",
      //paddingTop: '56.25%', // 16:9
      position: "relative",
      marginLeft: "40%",
      height: "230px"
    },
    cardContent: {
      flexGrow: 1
    },
    typography: {
      fontFamily: "S-CoreDream-8Heavy"
    }
  })
);

function WineInfo(wine: WineInfo) {
  const classes = useStyles();

  const [checked] = React.useState(true);

  return (
    <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
      <Grid item xs={12} sm={6} md={4}>
        <Link to={`/detail/${wine.wid}`} style={{ textDecoration: "none" }}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={`http://i02a303.p.ssafy.io:8090/WineProject/Wine/${wine.nameEng}.gif`}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography className={classes.typography}>
                {wine.nameKor}
              </Typography>
              <Typography className={classes.typography}>
                {wine.nameEng}
              </Typography>
              <br />
              <Typography>
                <em className={`tag type ${wine.type}`}> {wine.type}</em>
              </Typography>
              <br />
              <Typography>{wine.info.substring(0, 80)}...</Typography>
            </CardContent>

            {/* <Button size="small" color="primary">
                        View
      </Button> */}
          </Card>
        </Link>
      </Grid>
    </Slide>
  );
}

export default WineInfo;
