import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Button, CardGroup, Header, Segment } from "semantic-ui-react";
import * as actions from "../store/action";


const Products = (Name, Count, Type) => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    return <>
        <Segment>
            <Button onClick={() => {
                axios.post('http://localhost:8080/api/bay', { Name: Name, Count: Count, Type: Type })
                    .then(x => dispatch({ type: actions.ADD_PRODUCT, data: x?.data }))
                    .catch(y => alert(y.response))
            }}></Button>
        </Segment>
    </>
}
const RecipePage = () => {
    const navigate = useNavigate();
    const recipe = useSelector(state => state.SelestRecipe);
    const CategoryList = useSelector()
    const dispatch = useDispatch();
    return <>
        <div>
            <Header>  {recipe.Name} </Header>
            {/* <CardGroup> */}
                {/* <Image src={recipe.Img}/> */}
                {/* <span>{CategoryList?.find(x=>x.Id===recipe.Category)?.Name}</span> */}
            {/* </CardGroup> */}
        </div>
    </>
}
export default RecipePage;
