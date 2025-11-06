import { Link } from "react-router-dom"
import { Button } from "primereact/button"
import "../App.css"
const Navbar = () => {
    const sighnOut=()=>{
        localStorage.clear()
    }
    return (
        <>
            <div style={{ backgroundColor: "black", height: "30px", width: "100%" }}></div>
            <nav className="navbar">
                <div className="nav-links">
                    <Link to="/deleteProduct"><i className="pi pi-lock" ></i> </Link>
                    <Link to="/register"><i className="pi pi-user-edit"></i></Link>
                    <Link to="/login"><i className="pi pi-user"></i> {localStorage.getItem("userName")}</Link>
                    {/* <Link to="/products"><i className="pi pi-box"></i></Link> */}
                    <Link to="/basket"> <i className="pi pi-shopping-bag" ></i></Link>
                    <Link to="/"><Button
                            label="התנתקות"
                            icon="pi pi-sign-out"
                            className="p-button-danger p-button-text"
                            style={{ backgroundColor: 'white', color: 'black',}}
                            onClick={sighnOut}
                        /> </Link>
                </div>

                <div className="category-bar">
                    <Link to="/products/אחר">אחר</Link>
                    <Link to="/products/סבונים">סבונים</Link>
                    <Link to="/products/קרמים">קרמים</Link>
                    <Link to="/products/בישום">בישום</Link>
                    <Link to="/products/נרות">נרות</Link>
                    <Link to="/products/מתנות">מתנות</Link>
                    <Link to="/products">הכל</Link>
                </div>
                <Link to="/"> <div className="logo"><img src="/images/ללין.webp" style={{ width: "100px", height: "auto", marginBottom: "0px" }} alt="Logo"></img></div></Link>
            </nav>
            <br></br><br></br>

        </>
    )
}
export default Navbar