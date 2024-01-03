
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useFrom } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";

// import { useSelector } from "react-redux/es/hooks/useSelector"
// // import { useSelector } from "react-redux/es/hooks/useSelector";
export default function AddRecipe() {

    const schema = yup.object({
        //אמור להיכנס לכאן לבד הקוד משתמש שעליו רשום
        // Id: yup.number().positive().integer(),
        Name: yup.string().required(),
        CategoryId: yup.number().required(),
        Difficulty: yup.number().positive().integer().required(),
        Duration: yup.number().integer().positive().required(),
        Img: yup.string().url(),
        Description: yup.string().required(),
        UserId: yup.number().integer().required(),// = user.Id,
        Instructions: yup.array().of(yup.object().shape({ Instructions: yup.string().required("הכנס הוראות"), })),
        Img: yup.string(URL),
        Ingrident: yup.array().of(yup.object
            ({
                Name: yup.string().required("הכנס מוצר"),
                count: yup.number().positive().min(1).required("הכנס כמות"),
                Type: yup.string().required("הכנס סוג כפית\כף\כוס")
            })
        ).required(),
    }).required();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const recipies = useSelector(state => state.recipies);
    const userId = useSelector(state => state.userId?.Id);
    const { state } = useLocation();
    // const Id = state?.Id;
    const Name = state?.Name;
    const Difficulty = state?.Difficulty;
    const Duration = state?.Duration;
    const Description = state?.Description;
    const CategoryId = state?.CategoryId;
    const Img = state?.Img;
    const {
        register, handleSubmit, formState: { errors }, control
    } = useForm({
        resolver: yupResolver(schema),
        values: {Name, Difficulty, Duration, Description, CategoryId, Img }
    })
//כאן יש קוד שאני צריכה להבין למה לעשות אותו useFieldArray
    
    const onSubmit = (data) => {
        // const nameUser=JSON.parse()
        axios.post("http://localhost:8080/api/recipe", { Name: data.Name, Difficulty: data.Difficulty, Duration: data.Duration, Description: data.Description, CategoryId: data.CategoryId, Img: data.Img }).then(d => {
            dispatch({ type: 'ADD_RECIPE',payload:d.payload })
            console.log("seeccsedd");
            navigate('/allRecipe')
        }).catch((e) => {
            console.error(e);
        })
    }
    return (
        <>
            <from onSubmit={handleSubmit(onSubmit)}>
                <lable>שם המתכון</lable>
                <input {...register("Name")} />
                <p>{errors.Name?.message}</p>
                <lable>רמת קושי</lable>
                <input {...register("Difficulty")} />
                <p>{errors.Difficulty?.message}</p>
                <lable>משך זמן ההכנה</lable>
                <input {...register("Duration")} />
                <p>{errors.Duration?.message}</p>
                <lable> תיאור</lable>
                <input {...register("Description")} />
                <p>{errors.Description?.message}</p>
                <lable>קטגוריה</lable>
                <input type="select"{...register("CategoryId")} />
                <p>{errors.CategoryId?.message}</p>
                <lable>תמונה</lable>
                <input type="Img URL"{...register("Img")} />
                <p>{errors.Img?.message}</p>

                <div>
                    <label>Products:</label>

                </div>
                <input type="submit" />
            </from>
        </>
    );
}