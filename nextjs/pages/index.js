import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Switch,
  FormGroup,
  FormControlLabel,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
  Dialog,
  DialogContent,
  RadioGroup,
  useRadioGroup,
  Radio,
  FormControl,
  FormLabel
} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { styled, useTheme } from "@mui/material/styles";
import {makeStyles} from '@mui/styles'
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FilterListIcon from "@mui/icons-material/FilterList";

function createData(
  name,
  date,
  service,
  features,
  complexity,
  platforms,
  users,
  total
) {
  return { name, date, service, features, complexity, platforms, users, total };
};
const useStyles = makeStyles((theme)=>({}));

const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': {
      fontWeight: checked ? 700 : 300,
      color: checked ? theme.palette.secondary.main : theme.palette.primary.main,
    },
    '.MuiFormControlLabel-root':{
      marginRight: 0
    }
    

  }),
);

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
};

const StyledFormLabel = styled(FormLabel)(({theme})=>({
  '&.Mui-focused':{
    color: theme.palette.secondary.main
  }
}));
const StyledRadio = styled(Radio)(({theme})=>({
  '&.Mui-checked':{
    color: theme.palette.secondary.main
  }
}));

export default function Index() {
  const theme = useTheme();
  const classes = useStyles();
  const matchesMD = useMediaQuery(theme.breakpoints.down("sm"));
  const [websiteChek, setWebsiteChek] = useState(false);
  const [iOSChek, setiOSChek] = useState(false);
  const [androidChek, setandroidChek] = useState(false);
  const [softwareChek, setSoftwareChek] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(null);
  const [total, setTotal] = useState('');
  const [totalIsFocused, setTotalIsFocused] = useState(false);
  const [service, setService] = useState(null);
  const [complexity, setComplexity] = useState(null);
  const [users, setUsers] = useState(null);

  const [rows, setRows] = useState([
    createData(
      "Elon Musk",
      "19/03/22",
      "Website",
      "E-Commerce",
      "N/A",
      "N/A",
      "N/A",
      "$1500"
    ),
    createData(
      "Bill Gates",
      "11/02/21",
      "Custom Software",
      "GPS, Push Notifications, Users/Authentication, File Transfer",
      "Medium",
      "Web Application",
      "0-10",
      "$1600"
    ),
    createData(
      "Steve Jobs",
      "13/01/19",
      "Custom Software",
      "Photo/Video, File Transfer, Users/Authentication",
      "Low",
      "Web Application",
      "10-100",
      "$1250"
    ),
  ]);


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid
        container
        direction="column"
        sx={{ marginTop: "8em", marginBottom: "3em" }}
      >
        <Grid item style={{ marginLeft: "2em" }}>
          <Typography variant="h1">Projects</Typography>
        </Grid>
        <Grid item>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={()=> setDialogOpen(true)} sx={{cursor: 'pointer'}} >
                  <AddIcon color="primary" style={{ fontSize: 30 }} />
                </InputAdornment>
              ),
            }}
            sx={{ marginLeft: "2em", width: "35em" }}
            placeholder="Search project details or create a new entry."
          />
        </Grid>
        <Grid item sx={{ marginLeft: "2em", marginTop: "1.5em" }}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={websiteChek}
                  color="primary"
                  onChange={() => setWebsiteChek(!websiteChek)}
                />
              }
              label="Websites"
              labelPlacement="start"
              sx={{marginRight: '5em'}}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={iOSChek}
                  color="primary"
                  onChange={() => setiOSChek(!iOSChek)}
                />
              }
              label="iOS Apps"
              labelPlacement="start"
              sx={{marginRight: '5em'}}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={androidChek}
                  color="primary"
                  onChange={() => setandroidChek(!androidChek)}
                />
              }
              label="Android Apps"
              labelPlacement="start"
              sx={{marginRight: '5em'}}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={softwareChek}
                  color="primary"
                  onChange={() => setSoftwareChek(!softwareChek)}
                />
              }
              label="Custom Software"
              labelPlacement="start"
              sx={{marginRight: '5em'}}
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          container
          justifyContent={"flex-end"}
          sx={{ marginTop: "3em" }}
        >
          <Grid item sx={{ marginRight: "2em" }}>
            <FilterListIcon sx={{ fontSize: 50 }} color="secondary" />
          </Grid>
        </Grid>
        <Grid item>
          <TableContainer component={Paper} elevation="0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Date</TableCell>
                  <TableCell align='center'>Services</TableCell>
                  <TableCell align='center'>Features</TableCell>
                  <TableCell align='center'>Complexity</TableCell>
                  <TableCell align='center'>Platforms</TableCell>
                  <TableCell align='center'>Users</TableCell>
                  <TableCell align='center'>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell align='center'>{row.name}</TableCell>
                    <TableCell align='center'>{row.date}</TableCell>
                    <TableCell align='center'>{row.service}</TableCell>
                    <TableCell sx={{maxWidth:'5em'}} align='center'>{row.features}</TableCell>
                    <TableCell align='center'>{row.complexity}</TableCell>
                    <TableCell align='center'>{row.platforms}</TableCell>
                    <TableCell align='center'>{row.users}</TableCell>
                    <TableCell align='center'>{row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Dialog open={dialogOpen} onClose={()=> setDialogOpen(false)} fullWidth maxWidth='lg' >
          <Grid container justifyContent='center'>
            <Grid item>
              <Typography variant='h1' gutterBottom>Add a new Project</Typography>
            </Grid>
          </Grid>
          <DialogContent>
            <Grid container justifyContent='space-between' alignContent='center'>
              <Grid item>
                <Grid item container direction='column' sm>
                  <Grid item>
                    <TextField variant='standard' fullWidth label='Name' id='name' value={name} onChange={(event)=> setName(event.target.value)} />
                  </Grid>
                </Grid>
                <Grid item container direction='column' sx={{marginTop: '5em'}}>
                  <Grid item>
                    <FormControl>
                      <StyledFormLabel id='services'><h2>Services</h2></StyledFormLabel>
                      <RadioGroup aria-labelledby="service" value={service} name='service' onChange={(event)=> setService(event.target.value)}>
                        <MyFormControlLabel value='website' control={<StyledRadio />} label='Website'/>
                        <MyFormControlLabel value='mobile-app' control={<StyledRadio />} label='Mobile App' />
                        <MyFormControlLabel value='custom-software' control={<StyledRadio />} label='Custom Software'/>
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction='column' sm alignItems='center'>
                  <Grid item>
                    <DatePicker label='Select Date' value={date} onChange={newDate => setDate(newDate)} renderInput={(params) => <TextField variant='standard' {...params}/>}/>
                  </Grid>
                  <Grid item>
                  <Grid item container direction='column' sx={{marginTop: '5em'}}>
                    <Grid item>
                      <FormControl>
                        <StyledFormLabel id='complexity'><h2>Complexity</h2></StyledFormLabel>
                        <RadioGroup aria-labelledby="complexity" value={complexity} name='complexity' onChange={(event)=> setComplexity(event.target.value)}>
                          <MyFormControlLabel value='low' control={<StyledRadio />} label='Low'/>
                          <MyFormControlLabel value='medium' control={<StyledRadio />} label='Medium' />
                          <MyFormControlLabel value='high' control={<StyledRadio />} label='High'/>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction='column' sm alignItems='flex-end'>
                  <Grid item>
                    <TextField variant='standard' fullWidth label='Total' id='total' value={total} onFocus={()=> setTotalIsFocused(true)} onBlur={()=> total === '' ? setTotalIsFocused(false) : null} onChange={(event)=> setTotal(event.target.value)} InputProps={{startAdornment: totalIsFocused ? (
                      <InputAdornment position='start'>
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ) : null}} />
                  </Grid>
                  <Grid item>
                    <Grid item container direction='column' sx={{marginTop: '5em'}} alignItems='flex-end'>
                    <Grid item>
                      <FormControl>
                        <StyledFormLabel id='users'><h2>Users</h2></StyledFormLabel>
                        <RadioGroup aria-labelledby="users" value={users} name='users' onChange={(event)=> setUsers(event.target.value)}>
                          <MyFormControlLabel value='0-10' control={<StyledRadio />} label='0-10'/>
                          <MyFormControlLabel value='10-100' control={<StyledRadio />} label='10-100' />
                          <MyFormControlLabel value='100+' control={<StyledRadio />} label='100+'/>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            
          </DialogContent>
        </Dialog>
      </Grid>
    </LocalizationProvider>
  );
}
