
import Post from '../items/Post';

const Posts = () => {
    return (
        <>
            <section>
                <div className="container">
                    <div className='grid grid-cols-5 gap-5'>
                        <Post />
                    </div> 
                </div>
            </section>  
        </>
    );
};

export default Posts;