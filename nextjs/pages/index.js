import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  InputLabel,
  Switch,
  FormGroup,
  FormControlLabel,
  useMediaQuery,
  Dialog,
  DialogContent,
  RadioGroup,
  useRadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FilterListIcon from "@mui/icons-material/FilterList";
import { format } from "date-fns";
import EnhancedTable from "../src/ui/EnhancedTable";

function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total,
  search
) {
  return { name, date, service, features, complexity, platforms, users, total, search };
}
const useStyles = makeStyles((theme) => ({}));

const StyledFormControlLabel = styled((props) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  ".MuiFormControlLabel-label": {
    fontWeight: checked ? 700 : 300,
    color: checked ? theme.palette.secondary.main : theme.palette.primary.main,
  },
  ".MuiFormControlLabel-root": {
    marginRight: 0,
  },
}));

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  "&.Mui-focused": {
    color: theme.palette.secondary.main,
  },
}));
const StyledRadio = styled(Radio)(({ theme }) => ({
  "&.Mui-checked": {
    color: theme.palette.common.cian,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#fff",
  borderRadius: 50,
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
  },
}));

const StyledButtonCancel = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.cian,
  color: theme.palette.secondary.main,
  borderRadius: 50,
  textTransform: "none",
  "&:hover": {
    color: "#fff",
  },
  marginRight: "2em",
}));

export default function Index() {
  const theme = useTheme();
  const classes = useStyles();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesLG = useMediaQuery(theme.breakpoints.down("lg"));

  const platformsOptions = ["Web", "iOS", "Android"];
  const featuresOptions = [
    "Photo/Video",
    "GPS",
    "File Transfer",
    "Users/Authentication",
    "Biometrics",
    "Push Notifications",
  ];
  const websiteFeaturesOptions = ["Basic", "Interactive", "E-Commerce"];

  const [websiteChecked, setWebsiteChecked] = useState(false);
  const [iOSChecked, setiOSChecked] = useState(false);
  const [androidChecked, setAndroidChecked] = useState(false);
  const [customSoftwareChecked, setCustomSoftwareChecked] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState(null);
  const [total, setTotal] = useState("");
  const [totalIsFocused, setTotalIsFocused] = useState(false);
  const [service, setService] = useState(null);
  const [complexity, setComplexity] = useState(null);
  const [users, setUsers] = useState(null);
  const [platforms, setPlatforms] = useState([]);
  const [features, setFeatures] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const [rows, setRows] = useState([
    createData(
      "Elon Musk",
      "03/19/22",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500",
      true
    ),
    createData(
      "Bill Gates",
      "11/02/22",
      "Mobile App",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Android",
      "0-10",
      "$1600",
      true
    ),
    createData(
      "Steve Jobs",
      "01/13/22",
      "Custom Software",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Web Application",
      "10-100",
      "$1250",
      true
    ),
    createData(
      "Daniel",
      "03/25/22",
      "Mobile App",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "iOS",
      "10-100",
      "$1870",
      true
    ),
  ]);

  const handleSubmitNewProject = () => {
    setRows([
      ...rows,
      createData(
        name,
        format(date, "MM/dd/yy"),
        service,
        service === "Website" ? features : features.join(", "),
        service === "Website" ? "N/A" : complexity,
        service === "Website" ? "N/A" : platforms.join(", "),
        service === "Website" ? "N/A" : users,
        `$ ${total}`,
        true
      ),
    ]);

    setDialogOpen(false);
    console.log(rows);

    setName("");
    setDate(null);
    setService(null);
    setFeatures([]);
    setPlatforms([]);
    setComplexity(null);
    setUsers(null);
    setTotal("");
  };

  const handleSearch = (event) => {
    setPage(0)
    setSearch(event.target.value)

    const rowData = rows.map( row => Object.values(row).filter(option => option !== true && option !== false))
    const matches = rowData.map(row => row.map(option => option.toLowerCase().includes(event.target.value.toLowerCase())))

    const newRows = [...rows];
    matches.map((row,index)=> row.includes(true) ? newRows[index].search = true : newRows[index].search = false)

    setRows(newRows)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid
        container
        direction="column"
        sx={{ marginTop: "8em", marginBottom: "25em" }}
        alignItems={ matchesSM ? 'flex-start' : matchesMD ? 'center' : undefined}
      >
        <Grid item style={{ marginLeft: matchesSM ? '1em' : matchesMD ? 0 : "2em" }}>
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setDialogOpen(true)}
                  sx={{ cursor: "pointer" }}
                >
                  <AddIcon color="primary" style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
            sx={{ marginLeft: matchesSM ? '1em' : matchesMD ? 0 : "2em", width: matchesSM ? '20em' : matchesMD ? '25em' : "35em" }}
            placeholder="Search project details or create a new entry."
            value={search}
            onChange={handleSearch}
          />
        </Grid>
        <Grid item sx={{ marginLeft: "2em", marginTop: "1.5em" }}>
          <FormGroup row>
            <Grid container direction={matchesMD ? 'column' : undefined} alignContent={matchesSM ? 'flex-start' : matchesMD ? 'center' : undefined}>
              <Grid item sx={{marginTop: matchesMD ? '1.5em' : matchesSM ? '1em' : undefined}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={websiteChecked}
                      color="primary"
                      onChange={() => setWebsiteChecked(!websiteChecked)}
                    />
                  }
                  label="Websites"
                  labelPlacement={matchesMD ? "end" : "start"}
                  sx={{ marginRight: matchesLG ? '2em' : matchesMD ? 0 : '4em' }}
                />
              </Grid>
              <Grid item sx={{marginTop: matchesMD ? '1.5em' : matchesSM ? '1em' : undefined}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={iOSChecked}
                      color="primary"
                      onChange={() => setiOSChecked(!iOSChecked)}
                    />
                  }
                  label="iOS Apps"
                  labelPlacement={matchesMD ? "end" : "start"}
                  sx={{ marginRight: matchesMD ? 0 : matchesLG ? '2em' : '4em' }}
                  />
              </Grid>
              <Grid item sx={{marginTop: matchesMD ? '1.5em' : matchesSM ? '1em' : undefined}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={androidChecked}
                      color="primary"
                      onChange={() => setAndroidChecked(!androidChecked)}
                    />
                  }
                  label="Android Apps"
                  labelPlacement={matchesMD ? "end" : "start"}
                  sx={{ marginRight: matchesLG ? '2em' : matchesMD ? 0 : '4em' }}
                  />
              </Grid>
              <Grid item sx={{marginTop: matchesMD ? '1.5em' : matchesSM ? '1em' : undefined}}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={customSoftwareChecked}
                      color="primary"
                      onChange={() => setCustomSoftwareChecked(!customSoftwareChecked)}
                    />
                  }
                  label="Custom Software"
                  labelPlacement={matchesMD ? "end" : "start"}
                  sx={{ marginRight: matchesLG ? '2em' : matchesMD ? 0 : '4em' }}
                  />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>
        {/*--TABLE COMPONENT --*/}
        <Grid item sx={{mt: '3em', maxWidth:'100%'}}>
          <EnhancedTable 
            rows={rows}
            setRows={setRows}
            page={page}
            setPage={setPage}
            websiteChecked={websiteChecked}
            iOSChecked={iOSChecked}
            androidChecked={androidChecked}
            customSoftwareChecked={customSoftwareChecked}
          />
        </Grid>
        {/*--DIALOG COMPONENT --*/}
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          fullWidth
          maxWidth="lg"
          fullScreen={matchesMD}
        >
          <Grid container justifyContent="center" >
            <Grid item>
              <Typography variant="h1" gutterBottom>
                Add a new Project
              </Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid
              container
              justifyContent="space-between"
              alignContent="center"
              direction={matchesMD ? 'column' : 'row'}
            >
              <Grid item>
                <Grid item container direction="column" sm alignItems={ matchesMD ? "center" : undefined}>
                  <Grid item>
                    <TextField
                      variant="standard"
                      fullWidth
                      label="Name"
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      sx={{width: matchesMD ? 250 : undefined}}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  sx={{ marginTop: matchesMD ? '2em' : "5em" }}
                  alignItems={ matchesMD ? "center" : undefined}
                >
                  <Grid item align={matchesMD ? 'center' : undefined}>
                    <FormControl>
                      <StyledFormLabel id="services">
                        <h2>Services</h2>
                      </StyledFormLabel>
                      <RadioGroup
                        aria-labelledby="service"
                        value={service}
                        name="service"
                        onChange={(event) => {
                          setService(event.target.value);
                          setFeatures([]);
                        }}
                      >
                        <MyFormControlLabel
                          value="Website"
                          control={<StyledRadio />}
                          label="Website"
                        />
                        <MyFormControlLabel
                          value="Mobile App"
                          control={<StyledRadio />}
                          label="Mobile App"
                        />
                        <MyFormControlLabel
                          value="Custom Software"
                          control={<StyledRadio />}
                          label="Custom Software"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="column"
                  sx={{ marginTop: matchesMD ? '2em' : "5em" }}
                >
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="platforms-label">Platforms</InputLabel>
                    <Select
                      labelId="platforms-label"
                      sx={{ width: matchesMD ? 250 : "12em" }}
                      id="platforms-select"
                      value={platforms}
                      label="Platform"
                      multiple
                      onChange={(event) => setPlatforms(event.target.value)}
                      disabled={service === "Website"}
                    >
                      {platformsOptions.map((option) => (
                        <MenuItem value={option} key={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction="column" sm alignItems="center" sx={{marginTop: matchesMD ? '2em' : 0}}>
                  <Grid item>
                    <DatePicker
                      label="Select Date"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      sx={{width: matchesMD ? 250 : undefined}}
                      renderInput={(params) => (
                        <TextField variant="standard" {...params} />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      sx={{ marginTop: matchesMD ? '2em' : "5em" }}
                    >
                      <Grid item>
                        <FormControl>
                          <StyledFormLabel id="complexity">
                            <h2>Complexity</h2>
                          </StyledFormLabel>
                          <RadioGroup
                            aria-labelledby="complexity"
                            value={complexity}
                            name="complexity"
                            onChange={(event) =>
                              setComplexity(event.target.value)
                            }
                          >
                            <MyFormControlLabel
                              value="Low"
                              control={<StyledRadio />}
                              label="Low"
                              disabled={service === "Website"}
                            />
                            <MyFormControlLabel
                              value="Medium"
                              control={<StyledRadio />}
                              label="Medium"
                              disabled={service === "Website"}
                            />
                            <MyFormControlLabel
                              value="High"
                              control={<StyledRadio />}
                              label="High"
                              disabled={service === "Website"}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  item
                  container
                  direction="column"
                  sm
                  alignItems={ matchesMD ? 'center' : "flex-end"}
                >
                  <Grid item sx={{marginTop: matchesMD ? '2em' : 0}}>
                    <TextField
                      variant="standard"
                      sx={{width: matchesMD ? 250 : undefined}}
                      fullWidth
                      label="Total"
                      id="total"
                      value={total}
                      onFocus={() => setTotalIsFocused(true)}
                      onBlur={() =>
                        total === "" ? setTotalIsFocused(false) : null
                      }
                      onChange={(event) => setTotal(event.target.value)}
                      InputProps={{
                        startAdornment: totalIsFocused ? (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ) : null,
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      item
                      container
                      direction="column"
                      sx={{ marginTop: matchesMD ? '2em' : "5em" }}
                      alignItems={matchesMD ? 'center' : "flex-end"}
                    >
                      <Grid item>
                        <FormControl>
                          <StyledFormLabel id="users">
                            <h2>Users</h2>
                          </StyledFormLabel>
                          <RadioGroup
                            aria-labelledby="users"
                            value={users}
                            name="users"
                            onChange={(event) => setUsers(event.target.value)}
                          >
                            <MyFormControlLabel
                              value="0-10"
                              control={<StyledRadio />}
                              label="0-10"
                              disabled={service === "Website"}
                            />
                            <MyFormControlLabel
                              value="10-100"
                              control={<StyledRadio />}
                              label="10-100"
                              disabled={service === "Website"}
                            />
                            <MyFormControlLabel
                              value="100+"
                              control={<StyledRadio />}
                              label="100+"
                              disabled={service === "Website"}
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    direction="column"
                    sx={{ marginTop: matchesMD ? '2em' : "5em" }}
                  >
                    <FormControl variant="standard" fullWidth>
                      <InputLabel id="features-label">Features</InputLabel>
                      <Select
                        labelId="features-label"
                        id="features-select"
                        sx={{ width: matchesMD ? 250 : "12em" }}
                        value={features}
                        label="Features"
                        multiple={service !== "Website"}
                        onChange={(event) => setFeatures(event.target.value)}
                      >
                        {service === "Website"
                          ? websiteFeaturesOptions.map((option) => (
                              <MenuItem value={option} key={option}>
                                {option}
                              </MenuItem>
                            ))
                          : featuresOptions.map((option) => (
                              <MenuItem value={option} key={option}>
                                {option}
                              </MenuItem>
                            ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              sx={{ marginTop: matchesMD ? '4em' : "3em" }}
            >
              <Grid item>
                <StyledButtonCancel
                  variant="contained"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel X
                </StyledButtonCancel>
              </Grid>
              <Grid item>
                <StyledButton
                  variant="contained"
                  onClick={handleSubmitNewProject}
                  disabled={
                    service === "Website"
                      ? name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0
                      : name.length === 0 ||
                        total.length === 0 ||
                        features.length === 0 ||
                        users === null ||
                        complexity.length === 0 ||
                        platforms.length === 0 ||
                        service.length === 0
                  }
                >
                  Add Project +
                </StyledButton>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Grid>
    </LocalizationProvider>
  );
}
