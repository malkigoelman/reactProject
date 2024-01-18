import React from 'react'
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
} from 'semantic-ui-react'

const CardExampleCard = () => {

    const schema = yup.object({
        Name: yup.string().required(),
        CategoryId: yup.number().required("הכנס שם מתכון"),
        Difficulty: yup.number().positive().integer().required("חובה לבחור רמת קושי"),
        Duration: yup.number().positive().required("משך זמן במספרים"),
        Img: yup.string().url(),
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
        register, handleSubmit, formState: { errors }, control
    } = useForm({
        resolver: yupResolver(schema),
    })
    const { fields: Instructions, append: appendInstructions, remove: removeInstructions } = useFieldArray({
        control, name: "Instructions"
    });
    const { fields: Ingrident, append: appendIngrident, remove: removeIngrident } = useFieldArray({
        control, name: "Ingrident"
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [recipe, setRecipe] = useState(useSelector(state => state.SelectRecipe));
    const ListCategory = useSelector(state => state.Categories);
    const ListDifficulty = useSelector(state => state.difficulty);
    const difficulty = useSelector(state => state.Difficulty);//Nשפט מועתק לא בטוח שנכון וטוב
    const user = useSelector(state => state.user);

    useEffect(() => {
        recipe?.Ingrident?.map((x) => appendIngrident(x))
        recipe?.Instructions?.map((x) => appendInstructions(x))
    }, [recipe]);
    const onSubmit = (data) => {

        console.log(data);
        if (!recipe) {
            axios.post("http://localhost:8080/api/recipe", data).then(d => {
                dispatch({ type: action.ADD_RECIPE, payload: d.payload })
                alert("malki");
            }).catch((e) => {
                console.error(e);
            })
        }
        else {
            axios.post('http://localhost:8080/api/recipe/edit', { ...data, UserId: recipe.userId, Id: recipe.Id }).then(
                x => {
                    dispatch({ type: action.EDIT_RECIPE, data: x.data })
                    alert("????");
                }
            ).catch(x => { console.error(x) })
        }
        navigate('/allRecipe');
    }
    return (
        <>
            <Card onSubmit={handleSubmit(onSubmit)}>
                <Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
                <CardContent>
                    <CardHeader>שם המתכון</CardHeader>
                    <CardMeta>
                        <span className='date'>Joined in 2015</span>
                    </CardMeta>
                    <CardDescription>
                        Matthew is a musician living in Nashville.
                    </CardDescription>
                </CardContent>
                <CardContent extra>
                    <a>
                        <Icon name='user' />
                        22 Friends
                    </a>
                </CardContent>
            </Card>
        </>
    )
}

export default CardExampleCard