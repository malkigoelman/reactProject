import { Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import * as actions from "../store/action";
import { Button, Divider, FormInput, Grid, GridColumn, Segment } from "semantic-ui-react";
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

    const navigate= useNavigate();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        console.log(data.Name)
        axios.post('http://localhost:8080/api/user/login', { Username: data.Username, Password: data.Password })
            .then((responser) => {
                alert(errors)
                dispatch({ type: actions.SET_USER, user: responser?.data })
                navigate("/homepage")
            }).catch((i) => {
                // console.log(i.responser.data)
                navigate("/sigin")
                alert("bgjhgfd")

            })
    }

    return (
        <>
            <Segment onSubmit=(handleSubmit())>
                <Grid columns={2} relaxed='very' stackable>
                    <GridColumn>
                        {/* <Form onSubmit={handleSubmit(onSubmit)}> */}
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
                            <Button type="submit">Login</Button>
                        {/* </Form> */}
                    </GridColumn>
                    <GridColumn verticalAlign='middle'>
                        <Button content='Sign up' icon='signup' size='big' onClick={() => navigate('/login')} />
                    </GridColumn>
                </Grid>
                <Divider vertical>Or</Divider>

            </Segment>

            {/* <Link to={"/sigin"}>להרשמה</Link><br /> */}
            <input type="submit" onClick={() => console.log(errors)} />
        </>

    )
}
