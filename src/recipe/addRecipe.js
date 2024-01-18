
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { useFieldArray, useForm } from "react-hook-form";
import * as action from "../store/action";
import * as reducer from "../store/reducer";
import Categories from "../category/getCategory";
import { Input, Message, Form, ListDescription, FormGroup, Button } from "semantic-ui-react";
import { InputRef } from "../user/login";

const AddRecipe = () => {

    const schema = yup.object({
        Name: yup.string().required(),
        CategoryId: yup.number().required("הכנס שם מתכון"),
        Difficulty: yup.number().required("חובה לבחור רמת קושי"),
        Duration: yup.number().positive().required("משך זמן במספרים"),
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
    const {
        register, handleSubmit, formState: { errors }, control,
    } =useForm  ({
        resolver: yupResolver(schema),
    })
    const { fields: Instructions, append: appendInstructions, remove: removeInstructions } = useFieldArray({
        control,
         name: "Instructions"
    });
    const { fields: Ingrident, append: appendIngrident, remove: removeIngrident } = useFieldArray({
        control, 
        name: "Ingrident"
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [recipe, setRecipe] = useState(useSelector(state => state.SelectRecipe));
    const ListCategory = useSelector(state => state.Category);
    const ListDifficulty = useSelector(state => state.Difficult);
    const difficulty = useSelector(state => state.Difficult);//Nשפט מועתק לא בטוח שנכון וטוב
    const user = useSelector(state => state.user);

    useEffect(() => {
        recipe?.Ingrident?.map((x) => appendIngrident(x))
        recipe?.Instructions?.map((x) => appendInstructions(x))
    }, [recipe]);
    const onSubmit = (data) => {
        console.log(data);
        console.log(recipe?.Id);
        let recipeDate = {
            Id:1,
            Name: data.Name, UserId: 1, CategoryId: data.CategoryId, Img: data?.Img,
            Duration: data.Duration, Difficulty: data.Difficulty, Description: data.Description,
            Ingrident: data.Ingrident, Instructions: data.Instructions
        }
        if (!recipe) {
            axios.post("http://localhost:8080/api/recipe", recipeDate).then(d => {
                dispatch({ type: action.ADD_RECIPE, payload: d.payload })
                alert("malki");
                navigate('/allRecipe');

            }).catch((e) => {
                alert(e.response?.data);
            })
        }
        else {
            axios.post('http://localhost:8080/api/recipe/edit', { ...data, UserId: recipe.userId, Id: recipe.Id }).then(
                x => {
                    dispatch({ type: action.EDIT_RECIPE, data: x.data })
                    alert("????");
                    navigate('/allRecipe');
                }
            ).catch(x => { alert("jjjj") })
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                    <label>שם המתכון</label>
                    <InputRef {...register("Name")} />
                    {errors.Name?.message ? <Message content={errors.Name.message} /> : <></>}
                </Form.Field>
                <Form.Field>
                    <label>רמת קושי</label>
                    <select {...register("Difficulty")} name="Difficulty" defaultValue={recipe ? recipe.Difficult : 0}>
                        <option value="0" disabled>הכל</option>
                        {/* {console.log("difficult: ",ListDifficulty)} */}
                        {ListDifficulty?.map((c) => <>
                            <option key={c.Id} value={c.Id}>{c.Name}</option></>)}
                    </select>
                    {errors.Difficulty?.message}
                </Form.Field>
                <Form.Field>
                    <label>משך זמן ההכנה</label>
                    <InputRef {...register("Duration")} />
                    {errors.Duration?.message ? <Message content={errors.Duration.message} /> : <></>}
                </Form.Field>
                <Form.Field>
                    <label> תיאור</label>
                    <InputRef {...register("Description")} />
                    {errors.Description?.message ? <Message content={errors.Description.message} /> : <></>}
                </Form.Field>
                <Form.Field>
                    <label>קטגוריה</label>
                    <select {...register("CategoryId")} name="CategoryId" defaultValue={recipe ? recipe.CategoryId : 0}>
                        <option value={0} disabled>קטגוריה</option>
                        {/* {console.log("categories: ", ListCategory)} */}
                        {ListCategory?.map((c) =>
                            <option key={c.Id} value={c.Id}>{c.Name}</option>)}
                    </select>
                    {errors.CategoryId?.message}
                </Form.Field>
                <Categories />
                <Form.Field>
                    <label>תמונה</label>
                    <InputRef {...register("Img")} />
                    <p>{errors.Img?.message}</p>
                </Form.Field>
                <div>
                    <label>מוצרים:</label>
                    {Ingrident?.map((item, index) =>
                        <FormGroup key={index}>
                            <Form.Field>
                                <InputRef placeholder="שם מוצר" {...register(`Ingrident.${index}.Name`)} defaultValue={Ingrident?.Name} />

                            </Form.Field>
                            <Form.Field>
                                <InputRef placeholder="כמות" {...register(`Ingrident.${index}.Count`)} defaultValue={Ingrident?.Count} />

                            </Form.Field>
                            <Form.Field>
                                <InputRef placeholder="סוג" {...register(`Ingrident.${index}.Type`)} defaultValue={Ingrident?.Type} />

                            </Form.Field>
                            <Button onClick={() => removeIngrident(index)}>

                            </Button>
                        </FormGroup>
                    )}
                </div>
                <button onClick={() => appendIngrident({ Name: "", Count: 0, Type: "" })}>הוספת מוצר</button>

                <div>
                    <label>הוראות הכנה:</label>
                    {Instructions?.map((item, index) =>
                        <FormGroup key={index}>
                            <Form.Field>
                                <InputRef placeholder="הכנס הוראה" {...register(`Instructions.${index}.Name`)} defaultValue={Instructions.Name} />
                            </Form.Field>
                            <Button onClick={() => removeInstructions(index)} />
                        </FormGroup>
                    )}
                </div>
                <button onClick={() => appendInstructions({ Instructions: "" })}>הוספת הוראה</button>
                <br />
                <InputRef type="submit" onClick={() => console.log("send recipe", errors)} />
            </Form>
        </>
    );
}

export default AddRecipe;