import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { isAction } from "redux";
//כניסת משתמש
const schema = yup
    .object({
        UserName: yup.string().required(),
        Password: yup.number().integer().positive().required()
    }).required()


export default function Login() {

    const navig = useNavigate();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        console.log(data.Name)
        axios.post('http://localhost:8080/api/user/login', { UserName: data.UserName, Password: data.Password })
            .then((responser) => {
                console.log(data)
                dispatch({ type: isAction.SER_USER, user: responser.data })
                navig("/homepage")
            }).catch((i) => {
                // console.log(i.responser.data)
                navig("/sigin")
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>שם משתמש</label>
                <input {...register("Username")} />
                <p>{errors.Username?.message}</p>

                <label>סיסמה</label>
                <input {...register("Password")} />
                <p>{errors.Password?.message}</p>

                <Link to={"/sigin"}>להרשמה</Link><br />
                <input type="submit" />
            </form>
        </>

    )
}
