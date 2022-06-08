import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { BsCloudUpload } from 'react-icons/bs';
// import Button from './Button';
import { Typography, Grid, Button, Chip } from '@mui/material';
import { isEqual } from 'lodash';
import AutocompleteSelect from '../../../components/atoms/controlls/AutocompleteSelect';
import Select from '../../../components/atoms/controlls/Select';
const style = {
  //   height: '65%',
  //   width: '100%'
};

let defaultCols = [

  'empId',
  'first name',
  'last name',
  'email',
  'contact no',
  'gender',
  'designation name',
  'nic',
  'address',
  'company location',
  'employment Type',
  'business Unit',
  'role'

];

let defaultColChildren = [
  'empId',
  'first name',
  'last name',
  'email',
  'contact no',
  'gender',
  'designation name',
  'nic',
  'address',
  'company location',
  'employment Type',
  'business Unit',
  'role',

];

let ChildrenTemp = [
  { label: 'empId', key: 'empId' },
  { label: 'first name', key: 'firstName' },
  { label: 'last name', key: 'lastName' },
  { label: 'email', key: 'email' },
  { label: 'contact no', key: 'contactNo' },
  { label: 'gender', key: 'gender' },
  { label: 'designation name', key: 'designationName' },
  { label: 'nic', key: 'nic' },
  { label: 'address', key: 'address' },
  { label: 'company location', key: 'CompanyLocation' },
  { label: 'employment Type', key: 'employmentType' },
  { label: 'business Unit', key: 'businessUnit' },
  { label: 'role', key: 'role' },




];

let data = [
  { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
  { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
  { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' }
];

const CsvUpload = (props) => {
  const {
    setFile,
    onSaveFile,
    setErr,
    mockData,
    responseStatus,
    setOpenImport
  } = props;

  const ref = useRef(null);

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [csvErr, setcsvErr] = useState('');
  const [csvfile, setcsvFile] = useState<any>();
  const [companyBranchesData, setcompanyBranchesData] = useState([]);

  const toLowerCase = (array) => {
    const lower = array.map((element) => {
      return element.toLowerCase();
    });

    return lower;
  };


  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter((x) => x).length > 0) {
          list.push(obj);
        }
      }
    }
    if (isEqual(toLowerCase(headers), toLowerCase(defaultCols))) {
      const columns = headers.map((c) => ({
        name: c,
        selector: c
      }));

      setData(list);
      setColumns(columns);
      setcsvErr('');
      setErr('');
    } else {
      const columns = defaultCols.map((c) => ({
        name: c,
        selector: c
      }));

      setColumns(columns);

      setData([
        {
          Address: '',
          empId:'',
          firstName:'',
          lastName:'',
          email:'',
          contactNo:'',
          gender:'',
          designationName:'',
          nic:'',
          address:'',
          CompanyLocation:'',
          employmentType:'',
          businessUnit:'',
        }
      ]);
      setErr('CSV file you uploaded missing required columns or wrong order');
      setcsvErr(
        'CSV file you uploaded missing required columns or wrong order'
      );
    }


    // prepare columns list from headers
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    setFile(file);
    setcsvFile(file);

    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, {});

      processData(data);
    };
    reader.readAsBinaryString(file);
  };
 

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >


        <Button
        
          startIcon={
            <BsCloudUpload
              style={{
                fontWeight: '600'
              }}
              size={18}
            />
          }
        >
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            ref={ref}
            onChange={handleFileUpload}
          ></input>
        </Button>
        <div style={{ width: '50%' }}>
          <Grid container>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
              <Button
                style={{
                  height: '35px',
                  marginLeft: '57px'
                  // marginTop: '10px'
                }}

                onClick={onSaveFile}
                variant="contained"
                component="label"
              >
                Save
              </Button>
            </Grid>

          </Grid>
        </div>
      </div>

      <div
        style={{
          width: '100%',
          height: '80%'
        }}
      >
        <DataTable
          style={style}
          pagination
          paginationPerPage={8}
          highlightOnHover
          columns={columns}
          data={data}
        />
        {csvErr && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Chip
              color="error"
              size="small"
              icon={<ErrorOutlineIcon />}
              label={csvErr}
              style={{
                marginBottom: '6px',
                padding: '13px 10px'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvUpload;
