import * as React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { isEqual } from "lodash";
import {
  Grid,
  Popover,
  Tooltip,
  Button,
  TextField,
  IconButton,
  NativeSelect,
} from "@mui/material";
import {
  SearchRounded,
  SearchOffRounded,
  ArrowDownward,
  ArrowUpward,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Select from "../controlls/Select";
import Checkbox from "../controlls/Checkbox";

const useStyles: Function = makeStyles({
  table: {
    minWidth: 650,
  },
  stickyLeft: {
    position: "sticky",
    left: 0,
    background: "white",
    boxShadow: "2px 2px 2px grey",
    zIndex: 1,
  },
  stickyRight: {
    position: "sticky",
    right: 0,
    background: "white",
    boxShadow: "2px 2px 2px grey",
  },
  nonSticky: {
    position: "static",
  },
  stickyLeftHeader: {
    left: 0,
    background: "white",
    boxShadow: "2px 2px 2px grey",
    zIndex: 10,
  },
});
const CusTable = styled(Table)(
  ({ theme }) => `
      border-radius: 15;
      width:100% ;
   
`
);
const CusTableRow = styled(TableRow)(
  ({ theme }) => `
     height:40px
`
);
// function getInitSearchValue(columns) {
//   let searchObj: object = {};
//   filter(columns, (col) => col.filter !== undefined).map((post) => {
//     searchObj[post.id] = '';
//     return null;
//   });

//   return searchObj;
// }
function Tables(props) {
  const classes = useStyles();
  const {
    columns,
    tableData,
    pageNumber,
    onChangePage,
    total,
    pageSize,
    searchFields,
    onTableSearch,
    showPagination = true,
  } = props;

  // let initalSearchFields: object = getInitSearchValue(columns);

  const [page, setPage] = React.useState(0);
  const [totalRecord, setTotalRecord] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dataSource, setdataSource] = React.useState([]);

  const [isOpen, setisOpen] = React.useState({});
  const [anchor, setAnchor] = React.useState({});
  const [initSearchValues] = React.useState({ ...searchFields });
  const [searchValues, setsearchValues] = React.useState({
    ...searchFields,
  });
  const [searchStatus, setsearchStatus] = React.useState(false);

  const [sortColumnId, setsortColumnId] = React.useState(null);
  const [sortStatus, setsortStatus] = React.useState(false);
  const [sortField, setsortField] = React.useState({
    sortField: null,
    direction: "DESC",
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    onChangePage(newPage, rowsPerPage);
  };
  React.useEffect(() => {
    setPage(pageNumber);
    setTotalRecord(total);
    setRowsPerPage(pageSize);
    setdataSource(tableData);
  }, [pageNumber, total, pageSize, tableData]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChangePage(page, +event.target.value);
    setPage(0);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id) => {
    setAnchor({
      [id]: event.currentTarget,
    });
    setisOpen({
      [id]: Boolean(
        event.currentTarget && Object.keys(event.currentTarget).length === 0
          ? null
          : event.currentTarget
      ),
    });
  };
  const handleClickSort = (id, sortDirction) => {
    setsortColumnId(id);
    setsortField({
      sortField: id,
      direction: sortDirction,
    });
    setsortStatus(!sortStatus);
    setTimeout(() => {
      setsortColumnId(id);
      setsortStatus(!sortStatus);
    }, 300);
    onTableSearch(searchValues, {
      sortField: id,
      direction: sortDirction,
    });
    // sortDirction === 'DESC' ? setsortStatus(false) : setsortStatus(true);
  };

  const handleClose = (id) => {
    setAnchor({
      [id]: null,
    });
    setisOpen({
      [id]: false,
    });
  };
  const onChangePopover = (e) => {
    console.log(e);
    const { value, name } = e.target;
    console.log("search===>", value);
    let serachData: Object = searchFields;
    serachData[name] = value;
    setsearchValues({
      ...searchValues,
      [name]: value,
    });
    onTableSearch(serachData, sortField);
    getTableSearchStatus(serachData);
  };

  const onCloseField = (id) => {
    let updateValue: Object = searchValues;
    updateValue[id] = "";
    setsearchValues({
      ...searchValues,
      [id]: "",
    });
    onTableSearch(updateValue, sortField);
    getTableSearchStatus(updateValue);
    handleClose(id);
  };
  const onClearField = (id) => {
    let updateValue: Object = searchValues;
    updateValue[id] = "";
    setsearchValues({
      ...searchValues,
      [id]: "",
    });
    onTableSearch(updateValue, sortField);
    getTableSearchStatus(updateValue);
    // handleClose(id);
  };

  const getColumnSearchStatus = (id) => {
    let columnValue: string = searchValues[id];

    let searchStatus: boolean = columnValue !== "" ? true : false;
    return searchStatus;
  };

  const getTableSearchStatus = (values) => {
    let status: boolean = !isEqual(initSearchValues, values);
    setsearchStatus(status);
  };

  // const onSearchField = () => {
  //   onTableSearch('searchValues',, sortField);
  // };

  const resetAllSearch = () => {
    setsearchValues({
      ...initSearchValues,
    });
    getTableSearchStatus(initSearchValues);
    onTableSearch({ ...initSearchValues }, sortField);
  };

  return (
    <>
      {searchStatus && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <IconButton onClick={resetAllSearch}>
            <SearchOffRounded />
          </IconButton>
        </div>
      )}
      <TableContainer sx={{ maxHeight: 600 }}>
        <CusTable size="small" stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow></TableRow>
            <TableRow>
              {columns.map((column, index) => {
                return (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      width: column.width,
                    }}
                    className={
                      column.fixed
                        ? column.fixed === "right"
                          ? classes.stickyRight
                          : classes.stickyLeft
                        : classes.nonSticky
                    }
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                      }}
                    >
                      {column.sort && (
                        <div
                          style={{
                            width: "25px",
                          }}
                        >
                          <Tooltip
                            title={sortStatus ? "Descending" : "Ascending"}
                          >
                            <div
                              aria-describedby={column.id}
                              onClick={() =>
                                handleClickSort(
                                  column.id,
                                  !sortStatus ? "ASC" : "DESC"
                                )
                              }
                              style={{
                                border: "none",
                                width: "100%",
                                backgroundColor: "#f2f5f9",
                                // marginLeft: '-5px',
                                marginTop: "3px",
                              }}
                            >
                              {column.id === sortColumnId ? (
                                sortStatus ? (
                                  <ArrowUpward
                                    style={{
                                      color: "#88dab6",
                                      fontSize: "18px",
                                    }}
                                  />
                                ) : (
                                  <ArrowDownward
                                    style={{
                                      color: "#88dab6",
                                      fontSize: "18px",
                                    }}
                                  />
                                )
                              ) : (
                                <ArrowDownward
                                  style={{
                                    color: "#88dab6",
                                    fontSize: "18px",
                                  }}
                                />
                              )}
                            </div>
                          </Tooltip>
                        </div>
                      )}
                      <Grid container>
                        <Grid
                          item
                          xs={column.filter ? 10 : 12}
                          style={{ textAlign: "left" }}
                        >
                          {column.label}
                        </Grid>
                        {column.filter ? (
                          <Grid item xs={2}>
                            <Tooltip title="Search">
                              <button
                                aria-describedby={column.id}
                                onClick={(event) =>
                                  handleClick(event, column.id)
                                }
                                style={{
                                  border: "none",
                                  width: "80%",
                                  backgroundColor: "#f2f5f9",
                                  marginLeft: "5px",
                                  marginTop: "3px",
                                }}
                              >
                                <SearchRounded
                                  style={{
                                    color: getColumnSearchStatus(column.id)
                                      ? "red"
                                      : "#88dab6",
                                    fontSize: "18px",
                                  }}
                                />
                              </button>
                            </Tooltip>
                          </Grid>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      <Popover
                        id={column.id}
                        open={
                          isOpen[column.id] === undefined
                            ? null
                            : isOpen[column.id]
                        }
                        anchorEl={anchor[column.id]}
                        onClose={() => handleClose(column.id)}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              margin: "5px",
                            }}
                          >
                            {column.searchFieldType === "boolean" ? (
                              <Checkbox
                                name={column.id}
                                label={column.label}
                                value={searchValues[column.id]}
                                onChange={(e) => onChangePopover(e)}
                              />
                            ) : column.searchFieldType === "select" ? (
                              <Select
                                width="138px"
                                name={column.id}
                                label={column.label}
                                value={searchValues[column.id]}
                                onChange={(value) => onChangePopover(value)}
                                options={column.selectOption}
                                // error={errors.gender}
                              />
                            ) : column.searchFieldType === "date" ? (
                              <div>
                                <LocalizationProvider
                                  dateAdapter={AdapterDateFns}
                                >
                                  <DesktopDatePicker
                                    inputFormat="yyyy-MM-dd"
                                    value={
                                      searchValues[column.id] === undefined ||
                                      searchValues[column.id] === ""
                                        ? null
                                        : searchValues[column.id]
                                    }
                                    onChange={(value) =>
                                      onChangePopover({
                                        target: {
                                          name: column.id,
                                          value: value === null ? "" : value,
                                        },
                                      })
                                    }
                                    renderInput={(params) => (
                                      <TextField {...params} size="small" />
                                    )}
                                  />
                                </LocalizationProvider>
                              </div>
                            ) : (
                              <TextField
                                id="outlined-size-small"
                                size="small"
                                name={column.id}
                                placeholder={column.label}
                                value={searchValues[column.id]}
                                onChange={(e) => onChangePopover(e)}
                              />
                            )}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              margin: "5px",
                            }}
                          >
                            {/* <Button
                              size="small"
                              variant="contained"
                              endIcon={<SearchRounded />}
                              style={{ height: '25px', width: '47%' }}
                              onClick={() => onSearchField()}
                            >
                              Search
                            </Button> */}
                            <Button
                              style={{
                                height: "25px",
                                width: "47%",
                              }}
                              size="small"
                              variant="outlined"
                              onClick={() => onClearField(column.id)}
                            >
                              Clear
                            </Button>
                            <Button
                              style={{
                                height: "25px",
                                width: "47%",
                              }}
                              size="small"
                              variant="outlined"
                              onClick={() => onCloseField(column.id)}
                            >
                              Close
                            </Button>
                          </div>
                        </div>
                      </Popover>
                    </Box>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSource.map((row) => {
              return (
                <CusTableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={`${column.id}_${index}`}
                        align={column.align}
                        className={
                          column.fixed
                            ? column.fixed === "right"
                              ? classes.stickyRight
                              : classes.stickyLeft
                            : classes.nonSticky
                        }
                      >
                        {column.render ? column.render(row) : value}
                      </TableCell>
                    );
                  })}
                </CusTableRow>
              );
            })}
          </TableBody>
        </CusTable>
      </TableContainer>

      {showPagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={totalRecord}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
}
Tables.propTypes = {
  columns: PropTypes.array.isRequired,
  tableData: PropTypes.array.isRequired,
  pageNumber: PropTypes.number,
  onChangePage: PropTypes.func,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  onTableSearch: PropTypes.func,
  searchFields: PropTypes.object,
  showPagination: PropTypes.bool,
};
export default Tables;
