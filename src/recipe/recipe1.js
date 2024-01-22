import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Button, Card, CardGroup, Header, Segment, Image, CardContent, CardHeader, CardDescription, Icon, SegmentGroup, ButtonContent } from "semantic-ui-react";
import * as actions from "../store/action";
import * as shopping from '../service/serviceShopping';

const Products = ({ Name, Count, Type }) => {
    console.log("products", Name, Count, Type);
    const user = useSelector(state => state.user);
    const ListShopping = useSelector(state => state.ListShopping);
    const dispatch = useDispatch();
    console.log("Products");
    return <>
        <Segment>
            <Button onClick={() => {
                let pro = ListShopping.findIndex(x => x.Name == Name);
                        pro >= 0 ?
                            dispatch(shopping.updateProduct({Name:Name,Count:1,UserId:user.id},pro)) :
                            dispatch(shopping.addProduct({Name:Name,Count:1,UserId:user.Id}));
            }}>

                <ButtonContent visible><Icon name='plus' /> </ButtonContent>
                <ButtonContent hidden><Icon name='shopping cart' /></ButtonContent>
            </Button>
            <span>{"     " + Count + " " + Type + "  " + Name + "  "}</span>
        </Segment>
    </>
}
const RecipePage = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const recipe = useSelector(state => state.selectRecipe);
    console.log(recipe);
    const ListCategory = useSelector(state => state.Category)
    const ListDifficult = useSelector(state => state.Difficulty)
    const dispatch = useDispatch();
    return <>
        {user === null ? navigate('/') : null}
        <div>
            <Card>
                <Header >{recipe.Name}</Header>
                <Card>
                    <Image wrapped src={recipe.Img} />
                    <CardContent>
                        <span>
                            <Icon name='list' />
                            {"  " + ListCategory.find(x => x.Id === recipe.CategoryId)?.Name + " "}
                        </span>
                        <span>
                            <Icon name='signal' />
                            {"  " + ListDifficult.find(x => x.Id === recipe.Difficulty)?.Name + " "}
                        </span>
                        <span>
                            <Icon name='clock' />
                            {"  " + recipe?.Duration + "דקות "}
                        </span>
                    </CardContent>
                    <CardContent>
                        <Header>{recipe?.Description}</Header>
                    </CardContent>
                    <CardContent>
                        <Header>רכיבים</Header>
                        <SegmentGroup>
                            {recipe?.Ingrident?.map((i, index) =>
                                // console.log(i.Name+i.Count+i.Type);
                                // <Products />
                                <Products key={index} Name={i.Name} Count={i.Count} Type={i.Type} />
                            )}
                        </SegmentGroup>
                        <Header>הוראות הכנה</Header>
                        <SegmentGroup>
                            {recipe?.Instructions?.map((i, index) =>
                                <Segment key={index}>
                                    <Icon name="circle" />
                                    {i.Instructions ? i.Instructions : i}
                                </Segment>)}
                        </SegmentGroup>
                    </CardContent>
                    {user?.Id === recipe?.UserId}
                    <CardContent>
                        <Button onClick={() => {
                            dispatch({ type: actions.DELETE_RECIPE, data: recipe?.Id })
                            navigate('/allRecipe')
                        }}>
                            <Icon name="trash" />
                        </Button>
                        <Button onClick={() => {
                            navigate('/addRecipe')
                        }}><Icon name='edit' /></Button>
                    </CardContent>
                    :<></>
                </Card>

            </Card>
        </div>
    </>
}
export default RecipePage;
