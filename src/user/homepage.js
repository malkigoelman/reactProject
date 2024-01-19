import { Link } from "react-router-dom"
import { Header, HeaderContent, Icon } from "semantic-ui-react";

const Homepage = () => {
    return (
        <>
            <div>
                <Header as='h4' textAlign="right">
                    <HeaderContent> <Link to="/">החלף משתמש</Link></HeaderContent>
                    <HeaderContent>|</HeaderContent>
                    {/* <HeaderContent><Link to="/recipe1">נסיון הגלגול</Link></HeaderContent> */}
                    {/* <HeaderContent>|</HeaderContent> */}
                    <HeaderContent><Link to="/addRecipe">הוספת מתכון</Link></HeaderContent>     
                    <HeaderContent>|</HeaderContent>
                    <HeaderContent><Link to="/allRecipe">המתכונים שלי</Link></HeaderContent>
                    <HeaderContent>|</HeaderContent>
                    <HeaderContent> <Link to="/allRecipe">מתכונים</Link></HeaderContent>
                </Header>
            </div>

           
        </>
    )
}
export default Homepage;