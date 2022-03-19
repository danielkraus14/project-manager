import React from "react";
import { useTheme, styled } from "@mui/material/styles";
import { Grid } from "@mui/material";

const CustomImg = styled('img')(({theme})=>({
  width: "15em",
  verticalAlign: "bottom",
  [theme.breakpoints.down("lg")]: {
    width: "12.5em"
  },
  [theme.breakpoints.down("md")]: {
    width: "10em"
  }
}))



export default function Footer(props) {
  const theme = useTheme();

  return (
    <footer>
      <Grid container style={{backgroundColor: theme.palette.common.gray}}>
        <Grid item style={{marginLeft:'0.5em'}} >
          <CustomImg
            alt="bricks building"
            src="/assets/footerAdornment.png"
          />
        </Grid>
      </Grid>
    </footer>
  );
}
