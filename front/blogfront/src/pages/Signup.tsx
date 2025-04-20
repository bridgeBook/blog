import '../index.css'
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <>
            <div>
                新規登録画面
                <Link className="login" to="/">home画面に戻る</Link>
            </div>
        </>
    )
}

export default Signup