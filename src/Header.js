import React, { Component, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MenuItem, Menu, MenuMenu } from 'semantic-ui-react';
import * as action from './store/action';

const Header = () => {
  const [activeItem, setActiv] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const user = useSelector(state => state.User);
  return <>
    {user ? <><Menu >
      <MenuMenu position='right'>
        <MenuItem
          name='מתכונים'
          active={activeItem === "מתכונים"}
          onClick={({ name }) => {
            setActiv(name);
            navigate("/allRecipe");
          }}>
        </MenuItem>
        <MenuItem
          name='הוספת מתכון'
          active={activeItem === "הוספת מתכון"}
          onClick={({ name }) => {
            setActiv(name);
            navigate("/addRecipe");
          }}>
        </MenuItem>
        <MenuItem
          name='רשימת קניות'
          active={activeItem === "רשימת קניות"}
          onClick={({ name }) => {
            setActiv(name);
            navigate("/shopping");
          }}>
        </MenuItem>
      </MenuMenu>
      <MenuItem
        name='החלפת משתמש'
        active={activeItem === "החלפת משתמש"}
        onClick={({ name }) => {
          dispatch({type:action.SET_USER,user:null})
          navigate("/home");
        }}>
      </MenuItem>
    </Menu>
    </> :
      <>
        <Menu >
          <MenuMenu position='right'>
            <MenuItem
              name='כניסה'
              active={activeItem === "כניסה"}
              onClick={({ name }) => {
                setActiv(name);
                navigate("/login");
              }}>
            </MenuItem>
            <MenuItem
              name='הרשמה'
              active={activeItem === "הרשמה"}
              onClick={({ name }) => {
                setActiv(name);
                navigate("/sigin");
              }}>
            </MenuItem>
          </MenuMenu>
        </Menu >

      </>
    }
  </>
}

export default Header;



