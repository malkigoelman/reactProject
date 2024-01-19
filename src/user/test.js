import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { GridColumn, FormInput, Button, Divider, Form, Grid, Segment, } from 'semantic-ui-react'
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import * as actions from "../store/action";


const SiginTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup
    .object({
      Username: yup.string().required(),
      Password: yup.string().required(),
      Name: yup.string().required(),
      Email: yup.string().email().required(),
      Phone: yup.number().positive().integer().min(7).required(),
      Tz: yup.number().positive().integer().min(8)
    })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    axios.post('http://localhost:8080/api/user/sighin', { Username: data.Username, Password: data.Password, Name: data.Name, Email: data.Email, Phone: data.Phone, Tz: data.Tz })
      .then((responser) => {
        alert("hi");
        dispatch({ type: actions.SET_USER, user: responser?.data });
        // Swal.fire({
        //   title: "Good ",
        //   text: "נוספת בהצלחה",
        //   icon: "success"
        // });
        navigate("/homepage")
      }).catch((i) => {
        alert("oops")
      })
  }
  return (
    <>
      <Segment>
        <Grid columns={6} relaxed='very' stackable>
          <GridColumn>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                icon='user'
                iconPosition='left'
                label='Username'
                placeholder='Username'
              />
              <FormInput
                icon='lock'
                iconPosition='left'
                label='Password'
                type='password'
              />
              <FormInput
                placeholder="name"
                iconPosition='left'
                label='Name'
                type='Name'
              />
              <FormInput
                icon='mail'
                iconPosition='left'
                label='Email'
                type='Email'
              />
              <FormInput
                icon='phone'
                iconPosition='left'
                label='Phone'
                type='Phone'
              />
              <FormInput
                icon='phone'
                iconPosition='left'
                label='Tz'
                type='Tz'
              />


              <Button type="submit" content="Sigin up" primary/>
            </Form>
          </GridColumn>
          <GridColumn verticalAlign='middle'>
            {/* <Button content='Login' icon='signup' size='big' onClick={() => navigate('/sigin')} /> */}
          </GridColumn>
        </Grid>

        <Divider vertical>Or</Divider>
      </Segment>
    </>)
}

export default SiginTest;