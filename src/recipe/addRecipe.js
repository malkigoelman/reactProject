
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
import { Input, Message, Form, ListDescription, FormGroup, Button, Icon } from "semantic-ui-react";
import { InputRef } from "../user/login";
import Swal from "sweetalert2";

const AddRecipe = () => {

    const schema = yup.object({
        Name: yup.string().required(),
        CategoryId: yup.number().required("הכנס שם מתכון"),
        Difficulty: yup.number().required("חובה לבחור רמת קושי"),
        Duration: yup.number().positive().required("משך זמן במספרים"),
        Description: yup.string().required("חובה להכניס תיאור"),
        Instructions: yup.array().of(yup.string().required("הכנס הוראות")),
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
    } = useForm({
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
    const user = useSelector(state => state.user);
    const [recipe, setRecipe] = useState(useSelector(state => state.selectRecipe));
    const ListCategory = useSelector(state => state.Category);
    const ListDifficulty = useSelector(state => state.Difficulty);
    console.log("user:",user);
    useEffect(() => {
        recipe?.Ingrident?.map((x) => appendIngrident(x))
        recipe?.Instructions?.map((x) => appendInstructions(x))
    }, [recipe]);
    let recipeEdit;
    const onSubmit = (data) => {
        let recipeDate = {
            Name: data.Name, UserId: user.data.Id, CategoryId: data.CategoryId, Img: data?.Img,
            Duration: data.Duration, Difficulty: data.Difficulty, Description: data.Description,
            Ingrident: data.Ingrident, Instructions: data.Instructions
        }
        console.log("recipe to send", recipeDate)
        if (!recipe) {
            axios.post("http://localhost:8080/api/recipe", recipeDate)
                .then(d => {
                    recipeEdit = d.data;;
                    dispatch({ type: action.ADD_RECIPE, data: recipeEdit })

                }).catch((e) => {
        console.log("ERROR to send", e)
                    
                    // alert(e.response?.data + " " + recipeDate);
                })
        }
        else {
            // recipe
            axios.post('http://localhost:8080/api/recipe/edit', recipeDate).
                then(x => {
                    recipeEdit = x
                })
                .catch(x => {
                    // alert(x.response?.date)
                })
        }
        // navigate('/allRecipe');
    }
    return (
        <>{user === null ? navigate('/') :<></>}
            <Form onSubmit={handleSubmit(onSubmit)} >
                <Form.Field>
                    <label>שם המתכון</label>
                    <InputRef {...register("Name")} defaultValue={recipe?.Name} />
                    {errors.Name?.message ? <Message content={errors.Name.message} /> : <></>}
                </Form.Field>
                <Form.Field>
                    <label>רמת קושי</label>
                    <select {...register("Difficulty")} name="Difficulty" defaultValue={recipe ? recipe.Difficulty : 0}>
                        <option value="0" disabled></option>
                        {ListDifficulty?.map((c) => <>
                            <option key={c.Id} value={c.Id}>{c.Name}</option></>)}
                    </select>
                    {errors.Difficulty?.message}
                </Form.Field>
                <Form.Field>
                    <label>משך זמן ההכנה</label>
                    <InputRef {...register("Duration")} defaultValue={recipe?.Duration} />
                    {errors.Duration?.message ? <Message content={errors.Duration.message} /> : <></>}
                </Form.Field>
                <Form.Field>
                    <label> תיאור</label>
                    <InputRef {...register("Description")} defaultValue={recipe?.Description} />
                    {errors.Description?.message ? <Message content={errors.Description.message} /> : <></>}
                </Form.Field>
                <Form.Field>
                    <label>קטגוריה</label>
                    <select {...register("CategoryId")} name="CategoryId" defaultValue={recipe ? recipe.CategoryId : 0}>
                        <option value={0} disabled>קטגוריה</option>
                        {ListCategory?.map((c) =>
                            <option key={c.Id} value={c.Id}>{c.Name}</option>)}
                    </select>
                    {errors.CategoryId?.message}
                </Form.Field>
                {/* <Categories /> */}
                <Form.Field>
                    <label>תמונה</label>
                    <InputRef {...register("Img")} defaultValue={recipe?.Img} />
                    {errors.Img?.message}
                </Form.Field>
                <div>
                    <label>מוצרים:</label>
                    {Ingrident?.map((item, index) =>
                        <FormGroup key={index}>
                            <Form.Field>
                                <InputRef placeholder="שם מוצר" {...register(`Ingrident.${index}.Name`)} defaultValue={Ingrident?.Name} />
                                {/* console.log(item) */}
                            </Form.Field>
                            <Form.Field>
                                <InputRef placeholder="כמות" {...register(`Ingrident.${index}.Count`)} />
                            </Form.Field>
                            <Form.Field>
                                <InputRef placeholder="סוג" {...register(`Ingrident.${index}.Type`)} defaultValue={Ingrident?.Type} />
                            </Form.Field>
                            <Button onClick={() => removeIngrident(index)}>
                                <Icon name="trash alternate" />
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
                                <InputRef placeholder="הכנס הוראה" {...register(`Instructions.${index}`)} />
                            </Form.Field>
                            <Button onClick={() => removeInstructions(index)}>
                                <Icon name="trash alternate" />
                            </Button>
                        </FormGroup>
                    )}
                </div>
                <button onClick={() => appendInstructions({ Instructions: "" })}>הוספת הוראה</button>
                <br />
                <button type='submit' onClick={() => console.log(errors )}>שמירת מתכון</button>
            </Form>
        </>
    );
}

export default AddRecipe;