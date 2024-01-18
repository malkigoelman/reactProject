import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from '../store/action';
import { CardGroup, Input, Segment, Select } from "semantic-ui-react";
import CardRecipe from "./CardRecipe";


const AllRecipe = () => {

    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipes);
    const [selectCategory, SelectCategory] = useState(null);
    const [selectDuration, SelectDuration] = useState(null);
    const [userId, UserId] = useState(null);
    const [category, useCategory] = useState(null);
    const [duration, useDuration] = useState(null);
    const [difficult, useSifficult] = useState(null);
    const [selectDifficulty, SelevtDifficulth] = useState(null);
    const ListCategory = useSelector(state => state.Category);//כאן יש שגיאה
    const ListDifficulty = useSelector(state => state.Difficult);
    const selectRef = useRef(null);
    useEffect(() => {
        dispatch({ type: actions.SET_RECIPE_USER, data: null });
        axios.get(`http://localhost:8080/api/recipe`)
            .then(x => {
                dispatch({ type: actions.SET_RECIPES, data: x.data })
                alert("ok");
                console.log(recipes);
            })
            .catch(x => {
                alert(x.response?.data);
            });
    }, []);
    return (
        <>
            <Segment>
                <Select placeholder="קטגוריה" onChange={(x, { value }) => {
                    SelectCategory(value);
                }}
                    options={
                        ListCategory.map((x) => { return { key: x.Id, text: x.Name, value: x.Id }; })
                    } />
                <Input
                    placeholder="משך זמן"
                    type="number"
                    onChange={(x, { value }) => SelectDuration(value)}
                />
                <Select placeholder="רמת הקושי" onChange={(x, { value }) => {
                    selectDifficulty(value);
                }}
                    options={
                        ListDifficulty?.map((x) => { return { key: x.Id, text: x.Name } })
                    }
                // ref={selectRef}
                />
                <Input
                    placeholder="קוד בעל המתכון"
                    type="number"
                    onChange={(x, { value }) => UserId(value)}
                />
            </Segment>
            <div className="container">
                {/* <CardGroup> */}
                <p>{recipes}</p>
                {recipes?.map((x) => (
                    (!category || parseInt(category) === x.CategoryId) &&
                        (!userId || (userId && userId.Id === x.UserId)) &&
                        (!duration || parseInt(duration) >= parseInt(x.Duration)) &&
                        (!difficult || x.Difficult === difficult) ?
                        <CardRecipe key={x.Id} recipe={x} /> : <></>))
                }
                {/* </CardGroup> */}
            </div>
        </>
    );


}

export default AllRecipe;