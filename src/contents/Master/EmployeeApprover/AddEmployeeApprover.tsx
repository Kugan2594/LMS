import { ButtonBase, Card, CardHeader, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Modal, Paper, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Checkbox from "src/components/atoms/controlls/Checkbox";
import Input from "src/components/atoms/controlls/Input";
import { Form, useForm } from "src/components/atoms/Forms/useForm";
import { PageTitleWrapper } from "src/components/organism";
import PageTitle from "src/components/organism/PageTitle";
import { NOTIFICATION_TYPE } from "src/util/Notification";
import { FORM_VALIDATION, spaceValidation } from "src/util/ValidationMeassage";
import { IEmployeeApprover } from "./EmployeeApprover.interface";
import { allocateApprover, DeallocateApprover, getApprovers } from "./serviceEmployeeApprover";
import { Button as TransferBtn } from '@mui/material';
import Modals from "src/components/atoms/Modals";
import { RiArrowRightSLine } from "react-icons/ri";
import Button from 'src/components/atoms/controlls/Button';
import AutocompleteSelect from "src/components/atoms/controlls/AutocompleteSelect";
let disabledBtn = {
  border: '1px solid #00b761',
  width: '120px',
  background: 'rgb(255 255 255)',
  color: 'rgb(0 0 0)'
};
let activeBtn = {
  width: 120,
  background: '#00B761',
  color: '#000'
};
let activeBtnTwo = {
  width: 120,
  background: '#e71b1bc2',
  color: '#000',
  border: 'none'
};

let initialFValues: IEmployeeApprover = {
  id: 0,
  name: ""
};

function not(a: readonly object[], b: readonly object[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly object[], b: readonly object[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a: readonly object[], b: readonly object[]) {
  return [...a, ...not(b, a)];
}

function AddEmployeeApprover(props: any) {   

  const [employeeId, setEmployeeId] = useState([]);
  const [action, setaction] = useState(localStorage.getItem('action'));
  const [checked, setChecked] = React.useState<readonly object[]>([]);
  const [left, setLeft] = React.useState<readonly object[]>([]);
  const [right, setRight] = React.useState<readonly object[]>([]);
  const [selected, setSelected] = React.useState<readonly object[]>([]);
  const [selectedLeft, setSelectedLeft] = React.useState<readonly object[]>([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [approverData, setapproverData] = useState([]);
  const { reloadTable, handleError } = props;
  const [open, setOpen] = useState(false); 
  let navigate = useNavigate();
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const [alert, setalert] = useState({
    type: '',
    msg: ''
  });

  const WrapperContainer = styled(Paper)(
    ({ theme }) => `
      margin: ${theme.spacing(3)};  
      padding: ${theme.spacing(2)};  
  `
  );
  const validate = (fieldValues = values) => {

  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  }: any = useForm(initialFValues, true, validate);


  useEffect(() => {
    console.log('action', action);
    if (action === 'edit') {
      let data = JSON.parse(localStorage.getItem('editData'));
      console.log('data', data);
      setValues(data);
    }

    getApproverData();
  }, []);


  const handleClose = () => {
    setOpen(false);
    getApproverData();
  };

  const getApproverData = () => {
    let data: any = [];
    getApprovers(0, 10).then(
      (res: []) => {
        console.log('res', res);

        let datas= res.map((post:any)=>{
          return{
            id:post.id,
            name:post.employee.firstName
          }
        })

        setLeft(datas);
        
      },
      (error) => {
        console.log(error);
        setLeft([]);
       
      }
    );
  };

  const handleSubmit = () => {
    let employeeApprover = [];
    console.log('selectedLeft', selectedLeft);
    console.log('selected======>>', selected);
    selectedLeft.map((post: any) => {
      employeeApprover.push({
        id: post.id,
        name: post.employee.firstName
      });
    });

    

    let data = {
      id:id,
      name: name
    };
    console.log('name', data);
    AddEmployeeApproverAssign(data,'right');
  };

  const handleSubmitLeft = (rightData) => {
    let name = [];
    console.log('rightData======>>', rightChecked);
    rightChecked.map((post: any) => {
      name.push({
        id: post.id,
        name: post.employee.firstName
      });
    });

    let data = {
      id:id,
      name: name
    };
    console.log('name', data);
    AddEmployeeApproverAssign(data,'left');
  };

  const AddEmployeeApproverAssign = (data, type) => {
    if (type === 'right') {
      allocateApprover(data).then(
        (res: any) => {
          console.log(res);

          if (type === 'right') {
            getApproverData();

            setalert({
              type: NOTIFICATION_TYPE.success,
              msg: res.data.message
            });
          }

          setOpen(false);
        },
        (error) => {
          console.log('error------->', error);

          setalert({
            type: NOTIFICATION_TYPE.error,
            msg: error.data.message
          });
          getApproverData();
          setOpen(false);
          handleClose();
        }
      );
    } else {
      DeallocateApprover(data).then(
        (res: any) => {
          console.log(res);

          getApproverData();
          setalert({
            type: NOTIFICATION_TYPE.success,
            msg: 'employee approver deallocation successfully'
          });

          setOpen(false);
        },
        (error) => {
          console.log('error------->', error);
          setalert({
            type: NOTIFICATION_TYPE.error,
            msg: error.data.message
          });
          getApproverData();
          setOpen(false);
          handleClose();
        }
      );
    }
  };

  
  const onChangeSelect = (e) => {
    handleInputChange(e);
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    console.log('e.target', e.target);

    console.log('hit', name, value);
  };

    const handleToggle = (value: any) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    };

    const numberOfChecked = (items: readonly object[]) =>
      intersection(checked, items).length;

    const handleToggleAll = (items: readonly object[]) => () => {
      if (numberOfChecked(items) === items.length) {
        setChecked(not(checked, items));
      } else {
        setChecked(union(checked, items));
      }
    };

    const handleCheckedRight = () => {
      setOpen(true);
      setSelectedLeft(leftChecked);
      console.log(right.concat(leftChecked));
      setRight(right.concat(leftChecked))
      setSelected(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
      handleSubmitLeft(not(right, rightChecked));
    };

   
    const onReset = () => {
      setLeft([]);
      setRight([]);
      setSelected([]);
      resetForm();
    };

    const customList = (title: React.ReactNode, items: readonly object[]) => (
      <Card>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={handleToggleAll(items)}
              checked={
                numberOfChecked(items) === items.length && items.length !== 0
              }
              indeterminate={
                numberOfChecked(items) !== items.length &&
                numberOfChecked(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{
                'aria-label': 'all items selected'
              }}
            />
          }
          title={title}
          subheader={`${numberOfChecked(items)}/${items.length} selected`}
        />
        <Divider />
        <List
          sx={{
            width: 400,
            height: 230,
            bgcolor: 'background.paper',
            overflow: 'auto'
          }}
          dense
          component="div"
          role="list"
        >
          {items.map((value: any) => {
            const labelId = value.id;

            return (
              <ListItem
                key={value.id}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId
                    }}
                  />
                </ListItemIcon>
                <div>
                  <ListItemText id={labelId} primary={`${value.name}`} />
                </div>
              </ListItem>
            );
          })}
          <ListItem />
        </List>
      </Card>
    );

    const handleAlertClose = () => {
      setalert({
        type: '',
        msg: ''
      });
    };
  
    const handleClickBack = () => {
      navigate('/employeeApprover');
    };

    return (
      <div>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>{customList('Approvers', left)}</Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <TransferBtn
                sx={{ my: 0.5 }}
                style={leftChecked.length === 0 ? disabledBtn : activeBtn}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                Allocate &gt;
              </TransferBtn>
              <TransferBtn
                sx={{ my: 0.5 }}
                style={
                  rightChecked.length === 0 ? disabledBtn : activeBtnTwo
                }
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt; Deallocate
              </TransferBtn>
              <Button
                  size="small"
                  type="submit"
                  text={'Submit'}
                  onClick={handleSubmit}
                />
            </Grid>
          </Grid>
          <Grid item>{customList('Chosen', right)}</Grid>
        </Grid>

        

      </div>
    );
  }
export default AddEmployeeApprover;

