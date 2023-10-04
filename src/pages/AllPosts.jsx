import { Container, PostCard } from "../components";
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
        if(posts.length === 0) {
            service.getPosts([]).then(posts => {
                const newPosts = posts.documents;
                if(newPosts > 0) {
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

    return loading ? <h1 className="text-center font-bold text-2xl">loading...</h1> : (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts?.map(post => (
                        <PostCard key={post.$id} {...post}  />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default AllPosts;