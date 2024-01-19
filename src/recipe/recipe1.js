import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { Button, Card, CardGroup, Header, Segment, Image, CardContent, CardHeader, CardDescription, Icon, SegmentGroup, ButtonContent } from "semantic-ui-react";
import * as actions from "../store/action";


const Products = (Name, Count, Type) => {
    const user = useSelector(state => state.user);
    const ListShopping=useSelector(state=>state.ListShopping);
    const dispatch = useDispatch();
    return <>
        <Segment>
            <Button onClick={() => {
                axios.post('http://localhost:8080/api/bay', { Name: Name, Count: Count, Type: Type })
                    .then(x => dispatch({ type: actions.ADD_PRODUCT, data: x?.data }))
                    .catch(y => alert(y.response))
            }}>
                <ButtonContent visible>
                    <Icon name='plus'/>
                </ButtonContent>
                <ButtonContent hidden>
                    <Icon name='shopping cart'/>
                </ButtonContent>
            </Button>
            <span>{"  "+Count+"  "+Type+"  "+Name+"  "}</span>
        </Segment>
    </>
}
const RecipePage = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const recipe = useSelector(state => state.selectRecipe);
    const ListCategory = useSelector(state => state.Category)
    const ListDifficult = useSelector(state => state.Difficult)
    const dispatch = useDispatch();
    return <>
        {user === null ? navigate('/') : console.log(user)}
        <div>
            <Card>
                <Header>{recipe?.Name}</Header>
                <Card>
                    <Image wrapped src={recipe?.Img} />
                    <CardContent>
                        <span>
                            <Icon name='list' />
                            {"  " + ListCategory?.find(x => x.Id === recipe?.CategoryId)?.Name + " "}
                        </span>
                        <span>
                            <Icon name='signal' />
                            {"  " + ListDifficult?.find(x => x.Id === recipe?.Difficult)?.Name + " "}
                        </span>
                        <span>
                            <Icon name='clock' />
                            {"  " + recipe?.Duration + "דקות "}
                        </span>
                    </CardContent>
                    <CardContent>
                        <Header>רכיבים</Header>
                        <SegmentGroup>
                            {recipe?.Ingrident?.map((i, index) => <Products key={index} Name={i.Name} Count={i.Count} Type={i.Type} />)}
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
                            dispatch({ type: actions.DELETE_RECIPE, data: actions.data.Id })
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
