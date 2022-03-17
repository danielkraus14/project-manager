import { createTheme } from '@mui/material/styles';

const pmGreen = "#28F7B8";
const pmGrey = "#607d8b";
const pmCian = "#2FA5E0";

const theme = createTheme({
  palette: {
    common: {
      grey: pmGrey,
      green: pmGreen
    },
    primary: {
      main: pmGrey
    },
    secondary: {
      main: pmGreen
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
      color: pmGrey,
      lineHeight: 1.5
    },
    h3: {
      fontFamily: "Pacifico",
      fontSize: "2.5rem",
      color: pmGrey
    },
    h4: {
      fontFamily: "Raleway",
      fontSize: "1.75rem",
      color: pmGrey,
      fontWeight: 700
    },
    h6: {
      fontWeight: 500,
      fontFamily: "Raleway",
      color: pmGrey
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
      color: pmCian,
      fontWeight: 300
    },
    caption: {
      fontSize: "1rem",
      fontWeight: 300,
      color: pmCian
    },
    learnButton: {
      borderColor: pmGrey,
      borderWidth: 2,
      textTransform: "none",
      color: pmGrey,
      borderRadius: 50,
      fontFamily: "Roboto",
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: pmGrey,
        fontSize: "1rem"
      }
    },
    MuiInput: {
      root: {
        color: pmCian,
        fontWeight: 300
      },
      underline: {
        "&:before": {
          borderBottom: `2px solid ${pmGrey}`
        },
        "&:hover:not($disabled):not($focused):not($error):before": {
          borderBottom: `2px solid ${pmGrey}`
        }
      }
    }
  }
});

export default theme;
