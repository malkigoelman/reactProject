
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFrom } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useFieldArray, useForm } from "react-hook-form";
import * as action from "../store/action";
import * as reducer from "../store/reducer";

export default function AddRecipe() {

    const schema = yup.object({
        Name: yup.string().required(),
        CategoryId: yup.number().required("הכנס שם מתכון"),
        Difficulty: yup.number().positive().integer().required("חובה לבחור רמת קושי"),
        Duration: yup.number().positive().required("משך זמן במספרים"),
        Img: yup.string().url(),
        Description: yup.string().required("חובה להכניס תיאור"),
        Instructions: yup.array().of(yup.object().shape({ Instructions: yup.string().required("הכנס הוראות"), })),
        Img: yup.string().url(),
        Ingrident: yup.array().of(yup.object
            ({
                Name: yup.string().required("הכנס מוצר"),
                Count: yup.number().positive().min(1).required("הכנס כמות"),
                Type: yup.string().required("הכנס סוג כפית\כף\כוס")
            })
        ).required(),
    }).required();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [recipe,setRecipe]=useState(useSelector(state=>state.SelectRecipe));
    const ListCategory=useSelector(state=>state.Category);
    const recipies = useSelector(state => state.recipies);
    const userId = useSelector(state => state.userId?.Id);
    const { state } = useLocation();
    const SelectRecipe = state;
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
        // values: { Name, Difficulty, Duration, Description, CategoryId, Img }
    })
    const { fields: Instructions, append: appendInstructions, remove: removeInstructions } = useFieldArray({
        control, name: "Instructions"
    });
    const { fields: Ingrident, append: appendIngrident, remove: removeIngrident } = useFieldArray({
        control, name: "Ingrident"
    });
    const onSubmit = (data) => {

        console.log(data);
        if (SelectRecipe == null) {
            axios.post("http://localhost:8080/api/recipe", data).then(d => {
                dispatch({ type: action.ADD_RECIPE, payload: d.payload })
                console.log("seeccsedd");
                navigate('/allRecipe')
            }).catch((e) => {
                console.error(e);
            })
        }
        else {
            axios.post('http://localhost:8080/api/recipe/edit', { ...data, UserId: SelectRecipe.userId, Id: SelectRecipe.Id }).then(
                x => {
                    console.lon("מה קורה באמצע החיים?")
                    dispatch({ type: "EDIT_RECIPE", data: x.data })
                    navigate('/allRecipe');
                }
            ).catch(x => { console.error(x) })
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>שם המתכון</label>
                <input {...register("Name")} />
                <p>{errors.Name?.message}</p>
                <label>רמת קושי</label>
                <input {...register("Difficulty")} />
                <p>{errors.Difficulty?.message}</p>
                <label>משך זמן ההכנה</label>
                <input {...register("Duration")} />
                <p>{errors.Duration?.message}</p>
                <label> תיאור</label>
                <input {...register("Description")} />
                <p>{errors.Description?.message}</p>
                <label>קטגוריה</label>
                <input type="select"{...register("CategoryId")} />
                <p>{errors.CategoryId?.message}</p>
                <label>תמונה</label>
                <input type="Img URL"{...register("Img")} />
                <p>{errors.Img?.message}</p>

                <div>
                    <label>Products:</label>
                    {Ingrident?.map((item, index) => {
                        <div key={index}>
                            <input placeholder="name" {...register('Ingrident.${index}.Name')} />
                            <input placeholder="count" {...register('Ingrident.${index}.Count')} />
                            <input placeholder="type" {...register('Ingrident.${index}.Type')} />
                        </div>
                    })}
                </div>
                <button onClick={() => appendIngrident({ Name: "", Count: 0, Type: "" })}>הוספת מוצר</button>

                <div>
                    <label>Instructions:</label>
                    {Instructions?.map((item, index) => {
                        <div ket={index}>
                            <input placeholder="הכנס פקודות להכנה" {...register('Instructions.${index}.Instructions')} />
                        </div>
                    })}
                </div>
                <button onClick={() => appendInstructions({Instructions:"" })}>הוספת הוראה</button>
                <br/>
                <input type="submit" />
            </form>
        </>
    );
}