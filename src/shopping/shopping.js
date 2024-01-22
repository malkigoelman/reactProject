import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { Button, Card, FormField, Header, Icon, Message, Modal, ModalActions, ModalContent, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "semantic-ui-react";
import * as yup from "yup";
import * as pro from '../service/serviceShopping';
import { InputRef } from "../user/login";
import Swal from "sweetalert2";
import * as action from '../store/action';
const Shopping = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Schema = yup.object().shape({
        Name: yup.string().required(),
        Count: yup.number().required().positive(),
    }).required();
    const { register, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(Schema) });
    const list = useSelector(state => state.ListShopping);
    const user = useSelector(state => state.user);
    const [open, setOpen] = useState(false);
    const Delete = (deleteItem) => {
        dispatch(pro.deleteProduct(deleteItem.Id));
    }
    const Update = (x, y) => {
        pro.addProduct({...x,Count:y}).then(res=>{
            dispatch({type:action.UPDATE_PRODUCT,data:res.data,index:list.findIndex(a=>a.Name===x.Name)})
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "המוצר התעדכן בהצלחה",
                showConfirmButton: false,
                timer: 1500
            });
            // refresh(!temp);
        }).catch(w=>console.log(w.response?.errors));
    }
    const onSubmit = (data) => {
        let x = list.findIndex(l => l.Name === data.Name);
        pro.addProduct({ Name: data.Name, Count: data.Count, UserID: user.Id })
            .then(res => {
                x >= 0 ?
                    dispatch(pro.addProduct({ Name: data.Name, Count: data.Count, UserId: user.Id })) :
                    dispatch(pro.updateProduct({ Name: data.Name, Count: data.Count, UserId: user.Id }, x));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "המוצר התעדכן בהצלחה",
                    showConfirmButton: false,
                    timer: 1500
                });
                setOpen(false);
            }).catch(y=>console.log(y.response?.errors))
    }
    return <>
        {user === null ? navigate('/home') : null}
        <div>
            <Button onClick={() => { setOpen(true) }}>הוסף מוצר </Button>
            <Table celled={false} columns={3} textAlign="center">
                <TableHeader>
                    <TableHeaderCell>מוצר</TableHeaderCell>
                    <TableHeaderCell>כמות</TableHeaderCell>
                    <TableHeaderCell>{"    "}</TableHeaderCell>
                </TableHeader>
                <TableBody>
                    {list.map((x) =>
                        <TableRow key={x.Id}>
                            <TableCell>{x.Name}</TableCell>
                            <TableCell>{x.Count}</TableCell>
                            <TableCell>
                                <Button icon onClick={() => {
                                    Swal.fire({
                                        title: "אתה בטוח?",
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "כן, תמחק!",
                                        cancelButtonText: 'לא'
                                    }).then((res) => {
                                        if (res.isConfirmed)
                                            Delete(x)
                                    });
                                }}>
                                    <Icon name="trash alternate" />
                                </Button>
                                <Button onClick={() => {
                                    Update(x, 1);
                                }}>
                                    <Icon name="plus" />
                                </Button>
                                <Button onClick={() => {
                                    Update(x, -1);
                                }}>
                                    <Icon name="minus" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal
                open={open}
                size="small">
                {/*  */}
                <Header content='הוספת מוצר' />
                <ModalContent>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormField>
                            <label>שם</label>
                            <InputRef {...register("Name")} />
                        </FormField>
                        <FormField>
                            <label>כמות</label>
                            <InputRef {...register("Count")} />
                        </FormField>
                        <Button type="submit" >
                            <Icon name='checkmark' /> הוספה
                        </Button>
                    </Form>
                    {errors?.Name ? (
                        <Message warning header={errors?.Name?.message} />
                    ) : (
                        <></>
                    )}
                    {errors?.Count ? (
                        <Message warning header={errors?.Count?.message} />
                    ) : (
                        <></>
                    )}
                </ModalContent>
                <ModalActions>
                    <Button color='red' onClick={() => setOpen(false)}>
                        <Icon name='remove' /> ביטול
                    </Button>
                </ModalActions>
                {/*  */}
            </Modal>
        </div>

    </>
}
export default Shopping;