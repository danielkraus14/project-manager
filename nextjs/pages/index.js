import React from 'react';
import { Grid, Typography } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';

const useStyles = makeStyles(theme =>({}));

export default function Index() {
  const classes = useStyles();
  const theme = useTheme();


  return (
    <Grid container direction='column' style={{marginTop: '8em', marginBottom: '8em'}}>
      <Grid item>
        <Typography variant='h1'>Projects</Typography>
      </Grid>
    </Grid>
  );
}
