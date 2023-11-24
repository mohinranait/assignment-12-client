
import Post from '../items/Post';

const Posts = () => {
    return (
        <>
            <section>
                <div className="container mx-auto md:w-[500px]">
                    <div className='grid gap-5'>
                        <Post />
                        <Post />
                        <Post />
                        <Post />
                    </div> 
                </div>
            </section>  
        </>
    );
};

export default Posts;