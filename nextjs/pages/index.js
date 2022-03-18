import React, {useState} from 'react';
import { Grid, Typography, TextField, InputAdornment, Switch, FormGroup, FormControlLabel, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add'

export default function Index() {
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down('sm'));
  const [websiteChek, setWebsiteChek] = useState(false)
  const [iOSChek, setiOSChek] = useState(false)
  const [androidChek, setandroidChek] = useState(false)
  const [softwareChek, setSoftwareChek] = useState(false)


  return (
    <Grid container direction='column' sx={{marginTop: '8em', marginBottom: '8em'}}>
      <Grid item style={{marginLeft: '2em'}}>
        <Typography variant='h1'>Projects</Typography>
      </Grid>
      <Grid item>
        <TextField InputProps={{endAdornment: <InputAdornment position='end'><AddIcon color='primary'/></InputAdornment>}} sx={{marginLeft: '2em', width: '35em'}} placeholder='Search project details or create a new entry.' />
      </Grid>
      <Grid item sx={{marginLeft:'2em', marginTop:'1.5em'}}>
        <FormGroup row>
          <FormControlLabel control={<Switch checked={websiteChek} color='primary' onChange={()=> setWebsiteChek(!websiteChek)} />} label='Websites' labelPlacement='start' />
          <FormControlLabel control={<Switch checked={iOSChek} color='primary' onChange={()=> setiOSChek(!iOSChek)} />} label='iOS Apps' labelPlacement='start' />
          <FormControlLabel control={<Switch checked={androidChek} color='primary' onChange={()=> setandroidChek(!androidChek)} />} label='Android Apps' labelPlacement='start' />
          <FormControlLabel control={<Switch checked={softwareChek} color='primary' onChange={()=> setSoftwareChek(!softwareChek)} />} label='Custom Software' labelPlacement='start' />
        </FormGroup>
      </Grid>
    </Grid>
  );
}
