import '../index.css'
import Header from '../components/Header.tsx'

const Home = () => {
    return (
        <>
            <Header />
            <div className="search">
                <input></input>
            </div>
            <div className="body">
                <div className="bodytitle">記事一覧</div>
                <div className="articleList">
                    <div className="article">
                    </div>
                    <div className="article">
                    </div>
                    <div className="article">
                    </div>
                    <div className="article">
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home