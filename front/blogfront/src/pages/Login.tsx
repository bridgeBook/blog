import '../index.css'
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <>
            <div>
                ログイン画面
                <Link className="login" to="/">home画面に戻る</Link>
            </div>
        </>
    )
}

export default Login