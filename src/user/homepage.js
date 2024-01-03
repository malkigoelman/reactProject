import { Link } from "react-router-dom"

const Homepage=()=>{
    return(
        <>
        <Link to="/home">דף הבית</Link><br/>
        <Link to="/">המתכונים שלי</Link><br/>
        <Link to="/allRecipe">מתכונים</Link><br/>
        <Link to="/addRecipe">הוספת מתכון</Link><br/>
        <Link to="/Addcategory">הוספת קטגוריה</Link><br/>
        <Link to="/">החלף משתמש</Link><br/>
        </>
    )
}
export default Homepage;