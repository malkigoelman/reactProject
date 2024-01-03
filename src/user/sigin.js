import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios';
//הרשמה חדשה
//https://react.semantic-ui.com/elements/divider/#types-vertical-form
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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const navig = useNavigate();
    const onSubmit = (data) => {
        console.log(data.Name)
        axios.post('http://localhost:8080/api/user/sighin', {Username:data.Username,Password:data.Password,Name:data.Name,Phone:data.Phone,Email:data.Email,Tz:data.Tz})
            .then((responser) => {
                console.log(data)
                navig("../sigin")
            }).catch((i)=>{
                console.log(i.responser.data)
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>שם משתמש</label>
            <input {...register("Username")} />
            <p>{errors.Username?.message}</p>

            <label>סיסמה</label>
            <input {...register("Password")} />
            <p>{errors.Password?.message}</p>

            <label>שם</label>
            <input {...register("Name")} />
            <p>{errors.Name?.message}</p>

            <label>Email</label>
            <input {...register("Email")} />
            <p>{errors.Email?.message}</p>

            <label>פלאפון</label>
            <input {...register("Phone")} />
            <p>{errors.Phone?.message}</p>

            <label>ת.ז</label>
            <input {...register("Tz")} />
            <p>{errors.Tz?.message}</p>

            <input type="submit" />
        </form>
    )
}