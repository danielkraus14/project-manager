import { createTheme } from '@mui/material/styles';

const pmBlue = "#02354F";
const pmGray = "#607d8b";
const pmCian = "#87B0C4";

const theme = createTheme({
  palette: {
    common: {
      gray: pmGray,
      blue: pmBlue,
      cian: pmCian
    },
    primary: {
      main: pmGray
    },
    secondary: {
      main: pmBlue
    }
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      color: "white",
      fontSize: "1rem"
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      textTransform: "none",
      color: "white"
    },
    h1: {
      fontFamily: "Raleway",
      fontWeight: 700,
      fontSize: "2.5rem",
      color: pmGray,
      lineHeight: 1.5
    },
    h3: {
      fontFamily: "Pacifico",
      fontSize: "2.5rem",
      color: pmGray
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      color: pmGray,
      fontWeight: 700
    },
    h6: {
      fontWeight: 500,
      fontFamily: "Raleway",
      color: pmGray
    },
    subtitle1: {
      fontSize: "1.25rem",
      fontWeight: 300,
      color: pmCian
    },
    subtitle2: {
      color: "white",
      fontWeight: 300,
      fontSize: "1.25rem"
    },
    body1: {
      fontSize: "1.25rem",
      color: pmBlue,
      fontWeight: 300
    },
    caption: {
      fontSize: "1rem",
      fontWeight: 300,
      color: pmBlue
    },
  },
  components:{
    MuiFormControlLabel:{
      styleOverrides:{
        label:{
          color: pmGray,
          fontWeight: 700,
        },
        root:{
          marginLeft: 0,
          marginRight:0
        }, 
      }
    },
    MuiSelect:{
      styleOverrides:{
        icon:{
          fill: pmCian
        }
      }
    },
    MuiTableCell:{
      styleOverrides:{
        head:{
          fontSize: '1rem',
          color: pmGray,
          fontWeight: 700,
          borderColor: pmGray,
          borderWidth: 2
          },
          body:{
            borderColor: pmGray,
            color:pmBlue,
            borderWidth: 1.5
          }
      }
    },
    MuiTableSortLabel:{
      styleOverrides:{
        root:{
          "&.Mui-active": {
            color: pmCian,
          },
          ":hover":{
            color: pmCian
          }
        },
        icon:{
          fill: pmCian,
          ":hover":{
            fill: pmCian
          }
        },
      }
    }
  },
});

export default theme;
