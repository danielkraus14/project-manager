import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

const CustomImg = styled('img')(({theme})=>({
  width: "20em",
  verticalAlign: "bottom",
  [theme.breakpoints.down("lg")]: {
    width: "18em"
  },
  [theme.breakpoints.down("md")]: {
    width: "12em"
  }
}))



export default function Footer(props) {
  const theme = useTheme();

  return (
    <footer>
      <Grid container style={{backgroundColor: theme.palette.common.gray}}>
        <Grid item style={{marginLeft:'2em'}} >
          <CustomImg
            alt="bricks building"
            src="/assets/footerAdornment.png"
          />
        </Grid>
      </Grid>
    </footer>
  );
}
