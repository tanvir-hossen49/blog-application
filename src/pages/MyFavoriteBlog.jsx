import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, PostCard, PostCardSkeleton } from "../components";

const MyFavoriteBlog = () => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    const postsInStore = useSelector(state => state.post.posts );

    useEffect(() => {
        const blogIds = JSON.parse(localStorage.getItem('blogIds'));
        
        if(blogIds) {
            const filterPost = blogIds.map(id => {
                return postsInStore.filter(post => post.$id === id);

            });
            const filteredPosts = [].concat(...filterPost);
            setPosts(filteredPosts);
        }
        setLoading(false);
    }, [postsInStore]);

    if(loading) return <PostCardSkeleton count={6}/>

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

    return  (
        <div className='w-full py-8'>
            <Container>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 '>
                    { posts?.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default MyFavoriteBlog;