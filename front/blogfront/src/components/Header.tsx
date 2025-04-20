import '../index.css'
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <div className="header">
                <div className='title'>PortfolioBlog</div>
            </div>
            <div className="auth-actions">
                <Link className="login" to="/Login">ログイン</Link>
                <Link className="new_registration" to="/Signup">新規登録</Link>
            </div>
        </>
    )
}

export default Header