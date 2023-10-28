import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import service from "../../../appwrite/config";
import { useState } from "react";
import { Query} from "appwrite";
import { Container, PostCard, PostCardSkeleton } from "../../../components";
import { addMyPost } from "../../../store/myPostsSlice";

const MyPost = () => {
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const userId = userData.$id;
    const dispatch = useDispatch();

    const posts = useSelector(store => store.myPost.posts);

    useEffect(() => {
        if(posts === null) {
          (async () => {
            try {
              setLoading(true);
              const response = await service.getPosts([Query.equal('userId', userId)]);
              if (response.documents.length > 0) {
                dispatch(addMyPost(response.documents));
              }
            } catch (error) {
              console.error('Error fetching posts on the all post page:', error);
            } finally {
              setLoading(false);
            }
          })();
        } else setLoading(false)
    }, [userId, dispatch, posts]);

    if(loading) return <PostCardSkeleton count={8} />;

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