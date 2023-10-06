import { useEffect } from "react";
import { useSelector } from "react-redux";
import service from "../appwrite/config";
import { useState } from "react";
import { Query} from "appwrite";
import { Container, PostCard, PostCardSkeleton } from "../components";

const MyPost = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const userId = userData.$id;
    console.log(posts);
    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await service.getPosts([Query.equal('userId', userId)]);
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
    }, [userId]);


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

export default MyPost;