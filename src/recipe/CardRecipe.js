import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardMeta, CardHeader, CardDescription, CardContent, Card, Icon, Image, ButtonContent, Button, } from 'semantic-ui-react'
import * as actions from '../store/action';
const CardRecipe = ({ recipe }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const ListCategory = useSelector(state => state.Category);
    const ListDifficulty = useSelector(state => state.Difficult);

    // console.log(recipe);
    return <>
        <Card>
            <Image wrapped src={recipe?.Img} />
            <CardContent>
                <CardHeader>{recipe.Name}{user?.id == recipe?.UserId ? <Icon name="pencil alternate" floated="left" /> : <></>} </CardHeader>
                <CardDescription>{recipe?.Description}</CardDescription>
            </CardContent>
            <CardContent extra>
                <span>
                    <Icon name="unordered list"/>
                    {ListCategory.find(x => x.Id === recipe.CategoryId)?.Name}
                </span>
                <span>
                    <Icon name="signal" />
                    {ListDifficulty.find(x => x.Id === recipe.Difficult)?.Name}
                </span>
                <span>
                    <Icon name="clock" />
                    {recipe?.Duration + " דקות"}
                </span>
                <Button animated onClick={() => {
                    dispatch({ type: actions.SET_RECIPE_USER, data: recipe })
                    navigate('/recipe1');
                }}>
                    <ButtonContent visible>להצגת המתכון</ButtonContent>
                    <ButtonContent hidden><Icon name='arrow left' /></ButtonContent>
                </Button>
            </CardContent>
        </Card>
    </>
}

export default CardRecipe;
