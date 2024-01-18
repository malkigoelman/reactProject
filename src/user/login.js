import { Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import * as actions from "../store/action";
import { Button, Divider, Grid, Segment } from "semantic-ui-react";
//כניסת משתמש
const schema = yup
    .object({
        UserName: yup.string().required(),
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
        console.log("makli")
        axios.post('http://localhost:8080/api/user/login', { UserName: data.UserName, Password: data.Password })
            .then((responser) => {
                dispatch({ type: actions.SET_USER, user: responser?.data })
                navigate("/homepage")
            }).catch((i) => {
                // console.log(i.responser.data)
                navigate("/sigin")
                alert("קרתה תקלה")

            });
    };

    return (
        <>
            <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                    <Grid.Column>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Field>
                                <label icon='user' iconPosition='left'>UserName</label>
                                <InputRef {...register("UserName")} />
                            </Form.Field>
                            <Form.Field>
                                <label icon='lock' iconPosition='left'>Password</label>
                                <InputRef {...register("Password")} />
                            </Form.Field>
                            <Button type="submit">Login</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Button content='Sign up' icon='signup' size='big' onClick={() => navigate('/sigin')} />
                    </Grid.Column>
                </Grid>
                <Divider vertical>Or</Divider>
            </Segment>
            {/* {errors?.UserName ? ( */}
                 {/* <Massage warning header="שם ךא תקין" content={errors?.UserName?.message} />) : (<></> */}
            {/* )} */}
            {/* {errors?.Password ? ( */}
                {/* <Massage warning header="סיסמה ךא תקין" content={errors?.Password?.message} />) : (<></> */}
            {/* )} */}

            {/* <input type="submit" onClick={() => console.log(errors)} /> */}
        </>

    )
}
