import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../store/action";
import { CardGroup, Input, Segment, Select } from "semantic-ui-react";


const AllRecipe = () => {

    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch({ type: actions.SET_RECIPE_USER, data: null });
    //     axios.get(`http://localhost:8080/api/recipe`)
    //         .then(x => {
    //             dispatch({ type: actions.SET_RECIPES, data: x.data })
    //         })
    //         .catch(x => {
    //             alert(x.response?.data);
    //         });
    // }, []);
    // const Recipes = useSelector(state => state.Recipes);
    // const [selectCategory, SelectCategory] = useState(null);
    // const [selectDuration, SelectDuration] = useState(null);
    // const [userId, UserId] = useState(null);
    // const [category, useCategory] = useState(null);
    // const [duration, useDuration] = useState(null);
    // const [difficult, useSifficult] = useState(null);
    // const [selectDifficulty, SelevtDifficulth] = useState(null);
     const ListCategory = useSelector(state => state.Category);//כאן יש שגיאה
     const ListDifficulty = useSelector(state => state.Difficult);
    // const selectRef = useRef(null);
    // return (
    //     <>
    //         <Segment>
    //             <Select placeholder="קטגוריה" onChange={(x, { value }) => {
    //                 SelectCategory(value);
    //             }}
    //                 options={
    //                     ListCategory.map((x) => { return { key: x.Id, text: x.Name, value: x.Id }; })
    //                 }
    //             // ref={selectRef}
    //             />

    //             <Input
    //                 placeholder="משך זמן"
    //                 type="number"
    //                 onChange={(x, { value }) => SelectDuration(value)}
    //             />
    //             <Select placeholder="רמת הקושי" onChange={(x, { value }) => {
    //                 selectDifficulty(value);
    //             }}
    //                 options={
    //                     ListDifficulty.map((x) => { return { key: x.Id } })
    //                 }
    //             // ref={selectRef}
    //             />
    //             <Input
    //                 placeholder="קוד בעל המתכון"
    //                 type="number"
    //                 onChange={(x, { value }) => UserId(value)}
    //             />
    //         </Segment>

    //         {/* {Recipes.map((x) =>
    //             (!category || parseInt(category) === x.CategoryId) &&
    //             (!userId || parseInt(userId) === x.UserId) &&
    //                 (!duration || parseInt(duration) === parseInt(x.Duration)) &&
    //             (!difficult || x.Difficult === difficult)

    //         )} */}
    //         {/* <CardGroup>
    //             {Recipes.map((x) =>
    //                 (!category || parseInt(categoty) === x.Category) &&
    //                     (!userId || parseInt(userId) === x.UserId) &&
    //                     (!duration || parseInt(duration) >= parseInt(x.Duration)) &&
    //                     (!difficult || x.Difficulty === difficulty) ?
    //                     <ItemRecipe key={r.Id} recipe={r} /> : <></>)}
    //         </CardGroup> */}
    //     </>
    // );


}

export default AllRecipe;