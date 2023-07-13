import React, { useEffect ,useMemo,useState} from "react";
import commonService from "sevices/commonService";
import { MaterialReactTable } from 'material-react-table';
import {
    Box,
    IconButton,
    Tooltip,
    Dialog,
    AppBar,
    Toolbar,
    Typography,
    Button,

    FormHelperText,
    Grid,
    Container,
    InputLabel,
    OutlinedInput,
    Stack
  } from '@mui/material';
  import CloseIcon from '@mui/icons-material/Close';
  import { Delete, Edit } from '@mui/icons-material';
  import Slide from '@mui/material/Slide';
  import AnimateButton from 'components/@extended/AnimateButton';
// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const UserList=()=>{
    const [data,setData]=useState([]);
    useEffect(()=>{
        commonService.onGet().then((res)=>{
            setData(res.data);
        }).catch((err)=>{
            console.log(err);
       });
    },[]);
    const columns = useMemo(
        () => [
          {
            accessorKey: 'firstname', //access nested data with dot notation
            header: 'First Name',
            size: 150,
          },
          {
            accessorKey: 'lastname',
            header: 'Last Name',
            size: 150,
          },
          {
            accessorKey: 'email', //normal accessorKey
            header: 'Email',
            size: 200,
          },
          {
            accessorKey: 'company',
            header: 'Company',
            size: 150,
          },
        ],
      );
      const [modal,setModal]=useState(false);
      const [editdata,setEditdata]=useState([]);
      const handleDeleteRow=(row)=>{
     
       console.log(row);
      }
      const handleEditRow=(row)=>{
        setModal(true);
        setEditdata(row.original)
      }
      const handleClose=()=>{
        setModal(false);
      }
   

return (
    <>
    <MaterialReactTable columns={columns} data={data}
    enableEditing 
     renderRowActions={({ row }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton onClick={()=>handleEditRow(row)}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => handleDeleteRow(row)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>)}/>

        <Dialog
        fullScreen
        open={modal}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Update User
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Formik
            initialValues={{
                firstname: editdata.firstname,
                lastname: editdata.lastname,
                email:  editdata.email,
                company:  editdata.company,
              }}
              validationSchema={Yup.object().shape({
              
                firstname: Yup.string().max(255).required('Firstname is required'),
                lastname: Yup.string().max(255).required('Lastname is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                company: Yup.string().max(255).required('Company is required'),
              })}
              >
                
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting,values }) => (
           <form noValidate onSubmit={handleSubmit}>
            <Container fixed >
           <Grid container spacing={3} marginTop={2}>
             <Grid item xs={12} md={6}>
               <Stack spacing={1}>
                 <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                 <OutlinedInput
                   id="firstname-login"
                   type="firstname"
                   value={values.firstname}
                   name="firstname"
                   onBlur={handleBlur}
                   onChange={handleChange}
                   placeholder="John"
                   fullWidth
                   error={Boolean(errors.firstname)}
                 />
                 {errors.firstname && (
                   <FormHelperText error id="helper-text-firstname-signup">
                     {errors.firstname}
                   </FormHelperText>
                 )}
               </Stack>
             </Grid>
             <Grid item xs={12} md={6}>
               <Stack spacing={1}>
                 <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                 <OutlinedInput
                   fullWidth
                   error={Boolean(errors.lastname)}
                   id="lastname-signup"
                   type="lastname"
                   value={values.lastname}
                   name="lastname"
                   onBlur={handleBlur}
                   onChange={handleChange}
                   placeholder="Doe"
                   inputProps={{}}
                 />
                 {errors.lastname && (
                   <FormHelperText error id="helper-text-lastname-signup">
                     {errors.lastname}
                   </FormHelperText>
                 )}
               </Stack>
             </Grid>
             <Grid item xs={12} md={6}>
               <Stack spacing={1}>
                 <InputLabel htmlFor="company-signup">Company</InputLabel>
                 <OutlinedInput
                   fullWidth
                   error={Boolean( errors.company)}
                   id="company-signup"
                   value={values.company}
                   name="company"
                   onBlur={handleBlur}
                   onChange={handleChange}
                   placeholder="Demo Inc."
                   inputProps={{}}
                 />
                 { errors.company && (
                   <FormHelperText error id="helper-text-company-signup">
                     {errors.company}
                   </FormHelperText>
                 )}
               </Stack>
             </Grid>
             <Grid item xs={12} md={6}>
               <Stack spacing={1}>
                 <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                 <OutlinedInput
                   fullWidth
                   error={Boolean(errors.email)}
                   id="email-login"
                   type="email"
                   value={values.email}
                   name="email"
                   onBlur={handleBlur}
                   onChange={handleChange}
                   placeholder="demo@company.com"
                   inputProps={{}}
                 />
                 {errors.email && (
                   <FormHelperText error id="helper-text-email-signup">
                     {errors.email}
                   </FormHelperText>
                 )}
               </Stack>
             </Grid>
             {errors.submit && (
               <Grid item xs={12}>
                 <FormHelperText error>{errors.submit}</FormHelperText>
               </Grid>
             )}
           
             <Grid item xs={12} md={2} >
               <AnimateButton>
                 <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                   Upadte Account
                 </Button>
               </AnimateButton>
             </Grid>
           </Grid>
           </Container>
         </form>
        )}
              </Formik>
      </Dialog>
    </>
)
}
export default UserList;