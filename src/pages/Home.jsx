import { useState } from 'react';
import service from '../appwrite/config';
import { Container, PostCard, PostCardSkeleton } from '../components'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../store/postsSlice';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const { posts, searchData } = useSelector(store => store.post);

    useEffect(() => {
        if(posts === null) {
            ( async () => {
                try {
                  setLoading(true);
                  const response = await service.getPosts();

                  if (response.documents.length > 0) {
                    dispatch(addPost(response.documents));
                  }
                } catch (error) {
                  console.error('Error fetching posts on the home page:', error);
                } finally {
                  setLoading(false);
                }
            })();
        } else{
            setLoading(false)
        }
    }, [dispatch, posts]);

    if(loading) return <PostCardSkeleton count={8}/>

    if(posts?.length === 0 || posts === null) {
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
                {/* tab */}
                {/* <Categories /> */}
                {/* blogs */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 '>
                    { posts &&
                        posts.filter(post => {
                        if(searchData.length === 0) return post;
                        return post.title.toLowerCase().includes(searchData.toLowerCase()) 
                    })
                    .map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;