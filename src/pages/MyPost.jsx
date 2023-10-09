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

    if(loading) return <PostCardSkeleton count={3} />;

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
        <div className="w-full py-8">
            <Container>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 '>
                    {posts?.map((post) => (
                        <PostCard {...post}  key={post.$id}/>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default MyPost;