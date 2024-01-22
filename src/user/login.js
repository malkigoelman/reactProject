import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import * as actions from "../store/action";
import { Button, Divider, Grid, Segment, Form } from "semantic-ui-react";

//כניסת משתמש
const schema = yup
  .object({
    Username: yup.string().required(),
    Password: yup.number().integer().positive().required()
  }).required()
export const InputRef = React.forwardRef(({ ...rest }, ref) => (
  <input
    {...rest}
    ref={ref} />
));


export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    let login = { Username: data.Username, Password: data.Password };
    axios.post(`http://localhost:8080/api/user/login`, login)
      .then((responser) => {
        dispatch({ type: actions.SET_USER, data: responser })
        navigate("/home")
      }).catch((i) => {
        // alert(login);
        navigate("/sigin")
      });
  };
  return (
    <>
      <Segment style={{ margin: 80 }} placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Field>
                <label icon='user' iconPosition='left'>UserName</label>
                <InputRef {...register("Username")} />
              </Form.Field>
              <Form.Field>
                <label icon='lock' iconPosition='left'>Password</label>
                <InputRef {...register("Password")} />
              </Form.Field>
              <Button type="submit" onClick={() => console.log(errors)} content="Login" />
            </Form>
          </Grid.Column>
          <Grid.Column verticalAlign='middle'>
            <Button content='Sign up' icon='signup' size='big' onClick={() => navigate('/sigin')} />
          </Grid.Column>
        </Grid>
        <Divider vertical>Or</Divider>
      </Segment>
    </>

  )
}
