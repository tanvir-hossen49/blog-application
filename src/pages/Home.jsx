import { useState } from 'react';
import service from '../appwrite/config';
import { Container, PostCard, PostCardSkeleton } from '../components'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../store/postsSlice';

const Home = () => {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    const posts = useSelector(store => store.post.posts);

    useEffect(() => {
        if(posts === null) {
            service.getPosts([]).then(posts => {
                const newPosts = posts.documents;
                if(newPosts.length > 0) {
                    dispatch(addPost(posts.documents));
                }
                setLoading(false);
            }).catch(error => {
                console.log('home page', error);
                setLoading(false);
            })
        }else{
            setLoading(false)
        }
    }, [dispatch,posts])

    if(loading) return <div className="py-8">
        <Container><PostCardSkeleton count={3}/></Container>
    </div>

    if(posts?.length === 0) {
        return  <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            no post found
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts?.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;