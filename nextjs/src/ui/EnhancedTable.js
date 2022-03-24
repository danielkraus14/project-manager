import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button, InputAdornment, Menu, MenuItem, Snackbar, TextField, Chip, Grid } from '@mui/material';
import { styled, useTheme} from "@mui/material/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&.Mui-focusVisible": {
    backgroundColor: '#fff',
  },
  ":hover":{
    backgroundColor: '#fff',
  },
}));

const StyledSpan = styled('span')(({theme})=> ({
  color: theme.palette.common.cian,
  fontWeight: 400,
  fontSize: '2rem'
}))

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'date',
    label: 'Date',
  },
  {
    id: 'service',
    label: 'Services',
  },
  {
    id: 'features',
    label: 'Features',
  },
  {
    id: 'complexity',
    label: 'Complexity',
  },
  {
    id: 'platforms',
    label: 'Platforms'
  },
  {
    id: 'users',
    label: 'Users'
  },
  {
    id: 'total',
    label: 'Total'
  }
];

{/*-- TABLEHEAD --*/}
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

{/*-- TOOLBAR --*/}
const EnhancedTableToolbar = (props) => {
  const theme = useTheme();
  const { numSelected, selected, setSelected } = props;
  const [alert, setAlert] = React.useState({open: false, message: "The project has been deleted correctly", backgroundColor: theme.palette.secondary.light})
  const [undo, setUndo] = React.useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);

  const handleClickTotalFilter = (e)=>{
    setAnchorEl(e.currentTarget);
    setOpenMenu(true)
  };

  const onCloseTotalFilter =()=>{
    setAnchorEl(null)
    setOpenMenu(false)
  };


  const onDelete = ()=>{

    const newRows = [...props.rows];
    const selectedRows = newRows.filter(row => selected.includes(row.name))

    selectedRows.map(row => (row.search=false));
    props.setRows(newRows);
    props.setSelected([])

    setUndo(selectedRows)
    setAlert({...alert, open:true})
    
  };

  const onUndo = ()=>{
    const newRows = [...props.rows];
    const redo = [...undo]
    redo.map(row => (row.search = true))
    Array.prototype.push.apply(newRows, ...redo)

    props.setRows(newRows)
    setUndo([]);
    setAlert({...alert, open: false})
  };

  const handleTotalFilter = (event)=>{
    props.setFilterPrice(event.target.value)

    if(event.target.value !== ''){
      const newRows = [...props.rows];
      newRows.map(row => eval( `${event.target.value} ${props.totalFilter === '=' ? '===' : props.totalFilter} ${row.total.slice(1, row.total.length)}`)
      ?
      (row.search = true)
      :
      (row.search = false)
      )
      props.setRows(newRows)
    } else{
      const newRows = [...props.rows];
      newRows.map(row => row.search=true)

      props.setRows(newRows)
    }

  };

  const handleFilterChange = (operator)=>{

    if(props.filterPrice !== ''){
      const newRows = [...props.rows];
      newRows.map(row => eval( `${props.filterPrice} ${operator === '=' ? '===' : operator} ${row.total.slice(1, row.total.length)}`)
      ?
      (row.search = true)
      :
      (row.search = false)
      )
      props.setRows(newRows)
    };
  };

  return (
         <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : 
          <Typography
              sx={{ flex: '1 1 100%' }}
              color="inherit"
              variant="subtitle1"
              component="div"
            ></Typography>
          }

          {numSelected > 0 ? (
            <Tooltip title="Delete" >
              <IconButton onClick={onDelete}>
                <DeleteIcon color='secondary'/>
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list" placement='right-end'>
              <IconButton onClick={handleClickTotalFilter}>
                <FilterListIcon color='secondary' fontSize='large' />
              </IconButton>
            </Tooltip>
          )}
          <Snackbar 
            open={alert.open}
            message={alert.message}
            anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
            ContentProps={{
              style:{
                backgroundColor: alert.backgroundColor
              }
            }}
            action={(<Button variant='contained' color='secondary' onClick={onUndo}>Undo X</Button>)}
            onClose={(event, reason)=> {
              if(reason === 'clickaway'){
                setAlert({...alert, open:false});
                const newRows = [...props.rows];
                const names = [...undo.map(row => row.name)];
                props.setRows(newRows.filter(row => !names.includes(row.name)))
              }
          }}
          />
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            open={openMenu}
            onClose={onCloseTotalFilter}
            elevation={0}
            sx={{zIndex: 1302}}
            keepMounted
            value={props.filterPrice}
            onChange={handleTotalFilter}
          >
            <StyledMenuItem>
              <TextField variant='standard' placeholder='Enter a price to filter  ' InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>),
                endAdornment: (
                  <InputAdornment 
                    onClick={
                      ()=> {props.setTotalFilter(props.totalFilter === '>' ? '<' : props.totalFilter === '<' ? '=' : '>');
                      
                      handleFilterChange(props.totalFilter === '>' ? '<' : props.totalFilter === '<' ? '=' : '>')
                      }
                    }

                    position='end'
                    sx={{cursor: 'pointer'}}
                  >
                    <StyledSpan>
                      {props.totalFilter}
                    </StyledSpan>
                  </InputAdornment>
                )
              }} />
            </StyledMenuItem>
          </Menu>
        </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
{/*-- TABLE --*/}
export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterPrice, setFilterPrice] = React.useState('')
  const [totalFilter, setTotalFilter] = React.useState('>');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    props.setPage(0);
  };

 

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    props.page > 0 ? Math.max(0, (1 + props.page) * rowsPerPage - props.rows.length) : 0;

    const switchFilters = ()=>{
      const {websiteChecked, androidChecked, iOSChecked, customSoftwareChecked } = props;

      const websiteFiltered = props.rows.filter(row => websiteChecked ? row.service === 'Website' : null);
      const androidFiltered = props.rows.filter(row => androidChecked ? row.platforms.includes('Android') : null);
      const iOSFiltered = props.rows.filter(row => iOSChecked ? row.platforms.includes('iOS') : null);
      const customSoftwareFiltered = props.rows.filter(row => customSoftwareChecked ? row.service === 'Custom Software' : null);

      if(!websiteChecked && !androidChecked && !iOSChecked && !customSoftwareChecked){
        return props.rows
      } else{
        let newRows = websiteFiltered.concat(androidFiltered.filter(item => websiteFiltered.indexOf(item) < 0));

        let newRows2 = newRows.concat(iOSFiltered.filter(item => newRows.indexOf(item) < 0));

        let newRows3 = newRows2.concat(customSoftwareFiltered.filter(item => newRows2.indexOf(item) < 0));

        return newRows3;
      }
    };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} elevation={0} >
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          rows={props.rows}
          setRows={props.setRows}
          selected={selected}
          setSelected={setSelected}
          filterPrice={filterPrice}
          setFilterPrice={setFilterPrice}
          totalFilter={totalFilter}
          setTotalFilter={setTotalFilter}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(switchFilters().filter(row => row.search), getComparator(order, orderBy))
                .slice(props.page * rowsPerPage, props.page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="secondary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.service}</TableCell>
                      <TableCell align="center" sx={{maxWidth: '5em'}}>{row.features}</TableCell>
                      <TableCell align="center">{row.complexity}</TableCell>
                      <TableCell align="center">{row.platforms}</TableCell>
                      <TableCell align="center">{row.users}</TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={switchFilters().filter(row=> row.search).length}
          rowsPerPage={rowsPerPage}
          page={props.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Grid container justifyContent='flex-end' sx={{marginTop: '1.5em'}}>
          <Grid item>
            {filterPrice !== '' ? (<Chip variant="outlined" color="secondary" label={totalFilter === '>' ? `Less than $${filterPrice}` : totalFilter === '<' ? `Greater than $${filterPrice}` : `Equal to $${filterPrice}` } onDelete={()=> {
              setFilterPrice('');
              const newRows = [...props.rows]
              newRows.map(row => row.search=true)
              props.setRows(newRows)  
            }} icon={<AttachMoneyIcon />} />) : null}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}