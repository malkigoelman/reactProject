import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../store/action";
import { Input, Segment, Select } from "semantic-ui-react";


export default function AllRecipe() {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: actions.SET_RECIPE_USER, data: null });
        axios.get(`http://localhost:8080/api/recipe`)
            .then(x => {
                dispatch({ type: actions.SET_RECIPES, data: x.data })
            })
            .catch(x => {
                alert(x.response?.data);
            });
    }, []);
    const Recipes = useSelector(state => state.Recipes);
    const [selectCategory, SelectCategory] = useState(null);
    const [selectDuration, SelectDuration] = useState(null);
    const [userId, UserId] = useState(null);
    const [selectDifficulty, SelevtDifficulth] = useState(null);
    const ListCategory = useSelector(state => state.Category);//כאן יש שגיאה
    const ListDifficulty = useSelector(state => state.Difficult);
    return (
        <>
            <Segment>
                <Select placeholder="קטגוריה" onChange={(x, { value }) => {
                    SelectCategory(value);
                }}
                    options={
                        ListCategory.map((x) => { return { } })
                        // ListCategory.map((x) => { return { key: x.Id, text: x.Name, value: x.Id } })
                    }
                />
                
                <Input
                    placeholder="משך זמן"
                    type="number"
                    onChange={(x, { value }) => SelectDuration(value)}
                />
                <Select placeholder="רמת הקושי" onChange={(x, { value }) => {
                    selectDifficulty(value);
                }}
                    options={
                        // ListDifficulty.map((x) => { return { key: x.Id, text: x.Name, value: x.Id } })
                        ListDifficulty.map((x) => { return {} })
                    }
                />
                <Input
                    placeholder="בעל המתכון"
                    type="number"
                    onChange={(x, { value }) => UserId(value)}
                />
            </Segment>


            
        </>
    );


}