import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container, PostFloatingBar } from "../components";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { deleteSinglePost } from "../store/myPostsSlice";

const Post = () => {
    const divRef = useRef(null);
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [scrolled, setScrolled] = useState(false);
    const [blockFloatingBar, setBlockFloatingBar] =useState(false);
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

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log(entry);
              setBlockFloatingBar(true);
              setScrolled(false);
            }
          });
        });
      
        if (divRef.current) {
          observer.observe(divRef.current);
        }
      
        const handleScroll = () => {
          const isScrolled = window.scrollY >= 100;
      
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
            setBlockFloatingBar(!isScrolled);
          }
        };
      
        window.addEventListener('scroll', handleScroll);
      
        return () => {
          window.removeEventListener('scroll', handleScroll);
          if (divRef.current) {
            observer.unobserve(divRef.current);
          }
        };
      }, [scrolled]);

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
        <div className="py-8 relative">
            <Container className='lg:w-2/3 '>
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
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

                    <div className="flex mt-3 items-center justify-center">
                        <p className="mr-3">Share: </p>
                        <div className="flex items-center gap-3">
                            <div className="cursor-pointer border-2 rounded-full p-3 duration-300 hover:bg-black hover:text-white">
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`
                                https://blog-application-rho-murex.vercel.app/post/${slug}
                                `)}`} target="blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                                </a>
                            </div>
                            <div className="cursor-pointer border-2 rounded-full p-3 duration-300 hover:bg-black hover:text-white">
                                <a href={ `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`
                                https://blog-application-rho-murex.vercel.app/post/${slug}
                                `)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(parse(post.content))}`} target="blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                                </a>
                            </div>
                    </div>
                    </div>
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css pb-10">
                    {parse(post.content)}
                </div>
                <div ref={divRef}></div>
                <PostFloatingBar scrolled={scrolled} blockFloatingBar={blockFloatingBar}/>
            </Container>
        </div>
    ) : null;
}

export default Post;