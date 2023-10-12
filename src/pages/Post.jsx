import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deleteSinglePost } from "../store/myPostsSlice";

const Post = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userData = useSelector((state) => state.auth.userData);

    const posts = useSelector(store => store.post.posts);
    const myPosts = useSelector(store => store.myPost.posts);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if(posts === null) {
            if(slug) {
                service.getPost(slug).then((post) => {
                    if (post) setPost(post);
                    else navigate("/");
                });
            } else navigate("/");
        } else{
            const singlePost = posts.find(post => post.$id === slug)
            if(singlePost) {
                setPost(singlePost);
            } else{
                if(myPosts) {
                    const singlePost = myPosts.find(post => post.$id === slug)
                    setPost(singlePost);
                }
            }
        }
    }, [slug, navigate, posts, myPosts]);

    const deletePost = () => {
        service.deletePost(post.$id).then((status) => {
            if (status) {
                service.deleteFile(post.featuredImg);
                if(myPosts !== null) dispatch(deleteSinglePost(post.$id))
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={service.getFilePreview(post.featuredImg)}
                        alt={post.title}
                        className="max-h-[300px] rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="my-3 text-center text-xl font-medium">
                 <div>
                 Author: <span className="capitalize">{post.author}</span>  | Published: { new Date(post.$createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric'
                    })}
                 </div>
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post;