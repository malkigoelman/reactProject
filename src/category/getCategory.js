// import axios from "axios";
// import { useDispatch } from "react-redux";
// import * as yup from "yup";
// import * as actions from "../store/action";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useForm } from "react-hook-form/dist/index.cjs";
// import { Button, Modal } from "semantic-ui-react";

// const Categories = () => {
//     const dispatch = useDispatch();
//     const categories = useSelector(state => state.Categories);
//     const [start, setStart] = useState(false);
//     const Schema = yup.object().shape({
//         NameCategory: yup.string().required("לא הוכנס קטגוריה"),
//     }).required();
//     const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(Schema)});

//     const onSubmit = (data) => {
//         axios.post('http://localhost:8080/api/category', { NameCategory: data.NameCategory })
//             .then(x => {
//                 dispatch({ type: actions.ADD_CATEGORY, data: x.data });
//                 alert("הוסף בהצלחה")
//             }).catch(x => {
//                 alert(x.response?.data)
//             })
//     }

//     useEffect(() => {
//         axios.get('http://localhost:8080/api/category')
//             .then(x => {
//                 dispatch({ type: actions.SET_CATEGORIES, data: x?.data })
//             })
//             .catch(x => {
//                 alert(x.responce?.data);
//             })
//     }, [start])
//     return
//     <>
//      <Modal
//       trigger={<Button>Show Modal</Button>}
//       header='Reminder!'
//       content='Call Benjamin regarding the reports.'
//       actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
//     />
//     </>

// }
// export default Categories;