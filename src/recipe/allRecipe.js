import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from '../store/action';
import { Button, CardGroup, Input, Segment, Select } from "semantic-ui-react";
import CardRecipe from "./CardRecipe";


const AllRecipe = () => {

    const dispatch = useDispatch();
    const recipies = useSelector(state => state.recipies);
    const [userId, setUserId] = useState(null);
    const [category, setCategory] = useState(null);
    const [duration, setDuration] = useState(null);
    const [difficult, setDifficult] = useState(null);
    const ListCategory = useSelector(state => state.Category);//כאן יש שגיאה
    const ListDifficulty = useSelector(state => state.Difficult);
    useEffect(() => {
        dispatch({ type: actions.SET_RECIPE_USER, data: null });
        axios.get(`http://localhost:8080/api/recipe`)
            .then(x => {
                dispatch({ type: actions.SET_RECIPES, data: x.data })
            })
            .catch(x => {
                alert(x.response?.data);
            });
    }, [])
    return (
        <>
            <Segment>
                <Select placeholder="קטגוריה" onChange={(x, { value }) => {
                    setCategory(value);
                }} options={
                    ListCategory.map((x) => ({ key: x.Id, text: x.Name, value: x.Id } ))
                } />

                <Input
                    placeholder="משך זמן"
                    type="number"
                    onChange={(x, { value }) => setDuration(value)}
                />
                <Select placeholder="רמת הקושי" onChange={(x, { value }) => {
                    setDifficult(value);
                }}
                    options={
                        ListDifficulty.map((x) => ({ key: x.Id, text: x.Name,value:x.Id }))
                    }
                />
                <Input
                    placeholder="קוד בעל המתכון"
                    type="number"
                    onChange={(x, { value }) => setUserId(value)}
                />
                <Button
                placeholder="איפוס סינון"
                onChange={()=>{
                    alert("sdfghj")
                    setCategory(null);
                    
                }}
                >איפוס</Button>
            </Segment>
            <div className="container">
                {/* <CardGroup> */}
                {recipies?.map((x) => (
                    (!category || parseInt(category) === x.CategoryId) &&
                        (!userId || (userId && userId.Id === x.UserId)) &&
                        (!duration || parseInt(duration) >= parseInt(x.Duration)) &&
                        (!difficult || x.Difficult === difficult) ?
                        <CardRecipe key={x.Id} recipe={x} /> : null))
                }
                {/* </CardGroup> */}
            </div>
        </>
    );


}

export default AllRecipe;