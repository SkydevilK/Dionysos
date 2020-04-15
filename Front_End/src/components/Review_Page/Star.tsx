import React from "react";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rating: {
      display: "inline-block",
      float: "right",
      position: "relative"
    }
  })
);

export default function Star() {
  const [value, setValue] = React.useState<number | null>(2);
  const classes = useStyles();

  return (
    <div className={classes.rating}>
      <Box
        display="inline"
        // component="fieldset"
        borderColor="transparent"
        marginTop="10px"
        marginBottom="10px"
      >
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          size="large"
        />
      </Box>
    </div>
  );
}
