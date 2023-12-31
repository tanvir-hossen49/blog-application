import { Container, PostCard, PostCardSkeleton } from "../components";
import service from "../appwrite/config";
import { useState } from "react";
import { useEffect } from "react";

const AllPosts = () => {
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
            console.error('Error fetching posts on the all post page:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
    }, []);

    return loading ? <PostCardSkeleton count={3}/> : (
        <div className="w-full py-8">
            <Container>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {posts?.map((post) => (
                        <PostCard {...post}  key={post.$id}/>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPosts;