// import axios from "axios";
// import { useDispatch,useSelector } from "react-redux";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import * as actions from "../store/action";
// import { useEffect, useState } from "react";
// import { Form, Controller,useForm } from "react-hook-form";
// import { Button, FormField, Header, Icon, Message, Modal, ModalActions, ModalContent } from "semantic-ui-react";
// import { InputRef } from "../user/login";

// const Categories = () => {
//     const [open, setOpen] = useState(false);
//     const [err, setErr] = useState(false);
//     const [errData, setErrData] = useState("");
//     const dispatch = useDispatch();
//     const categories = useSelector(state => state.Categories);
//     const [start, setStart] = useState(false);
//     const Schema = yup.object().shape({
//         NameCategory: yup.string().required("לא הוכנס קטגוריה"),
//     }).required();
//     const { register, handleSubmit, formState: { errors },control } = useForm({ resolver: yupResolver(Schema) });

//     const onSubmit = (data) => {
//         axios.post('http://localhost:8080/api/category', { NameCategory: data.NameCategory })
//             .then(x => {
//                 dispatch({ type: actions.ADD_CATEGORY, data: x.data });
//                 setOpen(false);
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
//                 {/* <Form onSubmit={handleSubmit(onsubmit)}> */}
//                     <Form.Field>
//                         <label>קטגוריה</label>
//                         <InputRef {...register("Name")} onChange={() => setErr(false)} />
//                     </Form.Field>
//                     {/* <Button type="submit"> */}
//                         <Icon name="remove"/>הוספה
//                     {/* </Button> */}
//                 {/* </Form> */}
//                 {errors?.Name?(
//                     <Message header={errors?.Name?.message}/>
//                 ):(<></>)}
//                 {err?<Message header={errData}/>:<></>}
//             </ModalContent>
//             <ModalActions>
//                 <Button color="red" onClick={()=>setOpen(false)}>
//                     <Icon name="remove"/>ביטול
//                 </Button>
//             </ModalActions>
//         </Modal>
//     </>
// }
// export default Categories;