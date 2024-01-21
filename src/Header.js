import { Link, useNavigate } from "react-router-dom";
import { HeaderContent } from "semantic-ui-react";

const Header=()=>{
  
    return <>
      
        <div>
            <Header as='h4' textAlign="right">
                <HeaderContent> <Link to="/">החלף משתמש</Link></HeaderContent>
                <HeaderContent>|</HeaderContent>
                <HeaderContent><Link to="/addRecipe">הוספת מתכון</Link></HeaderContent>
                <HeaderContent>|</HeaderContent>
                <HeaderContent><Link to="/allRecipe">המתכונים שלי</Link></HeaderContent>
                <HeaderContent>|</HeaderContent>
                <HeaderContent> <Link to="/allRecipe">מתכונים</Link></HeaderContent>
            </Header>
        </div>
    </>
}
export default Header;



  