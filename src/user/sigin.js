import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios';
import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { GridColumn, FormInput, Button, Divider, Form, Grid, Segment, } from 'semantic-ui-react'
import { InputRef } from "./login";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import * as action from '../store/action';
import { type } from "@testing-library/user-event/dist/type";
const schema = yup
    .object({
        Username: yup.string().required(),
        Password: yup.string().required(),
        Name: yup.string().required(),
        Email: yup.string().email().required(),
        Phone: yup.number().positive().integer().min(7).required(),
        Tz: yup.number().positive().integer().min(8)
    })
export default function Sigin() {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({
        resolver: yupResolver(schema),
    })
    const navig = useNavigate();
    const onSubmit = (data) => {
        axios.post(`http://localhost:8080/api/user/sighin`,{  Username: data.Username, Password: data.Password, Name: data.Name,
        Email: data.Email, Phone: data.Phone, Tz: data.Tz })
            .then((x) => {
                dispatch({type:action.SET_USER,data:x});
                Swal.fire({
                    title: "שמחים שהצטרפת אלינו ",
                    text: "נוספת בהצלחה",
                    icon: "success"
                });
                navigate("/home")
            }).catch((i) => {
                console.log(i.response?.errors)
            })
    }

    return (
        <>
            <Segment style={{ margin: 80 }} placeholde>
                <Grid columns={6} relaxed='very' stackable>
                    <Grid.Column>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Field>
                                <label icon='user' /*iconPosition='left'*/>UserName</label>
                                <InputRef {...register("Username")} />
                            </Form.Field>
                            <Form.Field>
                                <label icon='user' /*iconPosition='left'*/>Password</label>
                                <InputRef {...register("Password")} />
                            </Form.Field>
                            <Form.Field>
                                <label icon='user' /*iconPosition='left'*/>שם</label>
                                <InputRef {...register("Name")} />
                            </Form.Field>
                            <Form.Field>
                                <label icon='user' /*iconPosition='left'*/>Email</label>
                                <InputRef {...register("Email")} />
                            </Form.Field>
                            <Form.Field>
                                <label icon='user' /*iconPosition='left'*/>Phone</label>
                                <InputRef {...register("Phone")} />
                            </Form.Field>
                            <Form.Field>
                                <label icon='user' /*iconPosition='left'*/>Tz</label>
                                <InputRef {...register("Tz")} />
                            </Form.Field>
                            <Button type="submit" content="Sign up" primary onClick={() => console.log(errors)} />
                        </Form>
                    </Grid.Column>
                    <Grid.Column verticalAlign='middle'>
                        <Button content='Sign up' icon='signup' size='big' onClick={() => navigate('/sigin')} />
                    </Grid.Column>
                </Grid>
                {/* <Divider vertical>Or</Divider> */}
            </Segment>

        </>
    )
}