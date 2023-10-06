import { useState } from 'react';
import service from '../appwrite/config';
import { Container, PostCard, PostCardSkeleton } from '../components'
import { useEffect } from 'react';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await service.getPosts([]);
            if (response) {
              setPosts(response.documents);
            }
          } catch (error) {
            console.error('Error fetching posts on the home page:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
    }, []);

    if(loading) return <PostCardSkeleton count={3}/>

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
                <div className='space-y-3'>
                    {posts?.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;