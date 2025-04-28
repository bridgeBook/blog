import '../index.css'
import { useParams } from 'react-router-dom';

const PostView = () => {
    const { id } = useParams();

    console.log(id)

    return (
        <>
            {id}
        </>
    )
}

export default PostView