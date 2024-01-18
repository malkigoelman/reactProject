import axios from "axios";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import * as actions from "../store/action";
import { useEffect, useState } from "react";

const Categories = () => {
    const dispatch = useDispatch();
    // const categories = useSelector(state => state.categories);
    const [start, setStart] = useState(false);

    const Schema = yup.object().shape({
        NameCategory: yup.string().required("לא הוכנס שם"),
    }).required();

    const onSubmit = (data) => {
        axios.post('http://localhost:8080/api/category', { NameCategory: data.NameCategory })
            .then(x => {
                dispatch({ type: actions.ADD_CATEGORY, data: x.data });

            }).catch(x => {
                alert(x.response?.data)
            })
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/category')
            .then(x => {
                dispatch({ type: actions.SET_CATEGORY, data: x?.data })
            })
            .catch(x => {
                alert(x.responce?.data);
            })
    }, [start])
    return
    <>

    </>

}
export default Categories;