// import axios from "axios";
// import { useDispatch } from "react-redux";
// import * as yup from "yup";
// import * as actions from "../store/action";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Form, useForm } from "react-hook-form/dist/index.cjs";
// import { Button, FormField, Header, Modal, ModalContent } from "semantic-ui-react";
// import { InputRef } from "../user/login";

// const Categories = () => {
//     const [open, setOpen] = useState(false);
//     const [err, setErr] = useState(false);
//     const dispatch = useDispatch();
//     const categories = useSelector(state => state.Categories);
//     const [start, setStart] = useState(false);
//     const Schema = yup.object().shape({
//         NameCategory: yup.string().required("לא הוכנס קטגוריה"),
//     }).required();
//     const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(Schema) });

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
//     return <>
//         <Modal
//             open={open}
//             trigger={<Button>הוסף קטגוריה</Button>}
//             onClose={() => setOpen(false)}
//             onOpen={() => setOpen(true)}
//             size="small">
//             <Header content="הוספת קטגוריה" />
//             <ModalContent>
//                 <Form onSubmit={handleSubmit(onsubmit)}>
//                     <FormField>
//                         <label>קטגוריה</label>
//                         <InputRef {...register("Name")} onChange={() => setErr(false)} />
//                     </FormField>
//                     <Button type="submit"
//                 </Form>
//             </ModalContent>
//         </Modal>
//     </>
// }
// export default Categories;