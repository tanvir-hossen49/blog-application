import { Container, PostCard, PostCardSkeleton } from "../components";
import service from "../appwrite/config";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../store/postsSlice";

const AllPosts = () => {
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
                console.log('all post page', error);
                setLoading(false);
            })
        }else{
            setLoading(false)
        }
    }, [dispatch,posts])

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