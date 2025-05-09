import '../index.css'
import ArticleList from '../components/ArticleList.tsx'

const Home = () => {

    return (
        <>
            <div className="search">
                <input></input>
            </div>
            <div className="body">
                <div className="bodytitle">記事一覧</div>
                <ArticleList />
            </div>
        </>
    )
}

export default Home