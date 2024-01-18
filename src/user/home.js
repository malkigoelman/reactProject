import React from 'react';
import { Link } from "react-router-dom";
import { HeaderContent, Header, Icon, Image } from 'semantic-ui-react';

const Home = () => {
    // alert("ברוכים הבאים");
    return (
    <>
        <Header as='h2' icon textAlign='center'>
            <Icon name='hand point down outline' circular />
            {/* <p>😀</p> */}
            <HeaderContent><Link to="/login" >כניסה</Link></HeaderContent>
            <HeaderContent><Link to="/sigin" >הרשמה</Link></HeaderContent>
        </Header>
        <Image
            centered
            size='large'
            src='/images/wireframe/centered-paragraph.png'
        />
    </>
    )

}
export default Home;

