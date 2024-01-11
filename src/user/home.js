import { Link } from "react-router-dom";
const Home = () => {

    return (
        <>
            <Link to="/homepage">דף הבית</Link><br />
            <Link to="/login">כניסה</Link><br />
            <Link to="/sigin">הרשמה</Link><br />
            {/* <Link to="/test">הרשמה</Link><br /> */}
            <Link to="/addRecipe">להוספת מתכון</Link><br />
            <link to="/recipe1">לראות מתכון</link>
        </>
    );
}
export default Home;

