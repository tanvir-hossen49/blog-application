import { Container, PostCard } from "../components";
import service from "../appwrite/config";
import { useState } from "react";
import { useEffect } from "react";

const AllPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts([]).then(posts => {
            if(posts) {
                setPosts(posts.documents)
            }
        }).catch(error => {
            console.log('all posts page', error)
        });
    })

    return (
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