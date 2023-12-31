import { useId, useState } from "react";
import { Comment, Divider, SharePost } from './index';
import service from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { showAlertMessage } from "../utilities/AlertMessage";
import { useDispatch } from "react-redux";
import { updateLikes } from "../store/postsSlice";

const PostFloatingBar = ({ barState, like, likedBy, userId, slug, posts  }) => {
    // check this user already liked or not
    const [liked, setLiked] = useState(likedBy.includes(userId) || posts && posts.likedBy.includes(useId));
    const [likesUser, setLikesUser] = useState(likedBy);
    const [likeCount, setLikeCount] = useState(like);
    const [isOpenShare, setIsOpenShare] = useState(false);
    const [isOpenCommentBox, setIsOpenCommentBox] = useState(false);
    const [blogIds, setBlogIds] = useState(JSON.parse(localStorage.getItem('blogIds')) || []);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLikeUpdate = async () => {
        if (!userId) {
            showAlertMessage({
                title: 'Oops!',
                text: "Can't like without logging in.",
                confirmButtonText: 'Yes, Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }
    
        const isUserLiked = likesUser.includes(userId);
        const updatedLikesBy = isUserLiked ? likedBy.filter((likedId) => likedId !== userId) : [...likedBy, userId];
        const updatedLikeCount = isUserLiked ? likeCount - 1 : likeCount + 1;
    
        const confirmationTitle = isUserLiked ? 'Are you sure!' : 'Like this post?';
        const confirmationText = isUserLiked ? 'You want to unlike this post.' : 'You want to like this post.';
    
        showAlertMessage({
            title: confirmationTitle,
            text: confirmationText,
            confirmButtonText: isUserLiked ? 'Unlike' : 'Like'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await service.updateLike(slug, updatedLikeCount, updatedLikesBy);
    
                    // If this blog is already stored in redux
                    if (posts !== null) {
                        dispatch(updateLikes({
                            articleId: slug,
                            newLikes: updatedLikeCount,
                            likedBy: updatedLikesBy
                        }));
                    }
    
                    setLikeCount(updatedLikeCount);
                    setLikesUser(updatedLikesBy);
                    setLiked((prev) => !prev);
                } catch (error) {
                    console.error(error);
                }
            }
        });
    };

    const handleComment = () => {
        if (!userId) {
            showAlertMessage({
                title: 'Oops!',
                text: "Can't comment without logging in.",
                confirmButtonText: 'Yes, Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        setIsOpenCommentBox(prev => !prev)
    };

    const handleBookmark = () => {
        if (blogIds.includes(slug)) {
            const updatedBlogIds = blogIds.filter(blogId => blogId !== slug);
            setBlogIds(updatedBlogIds);
            localStorage.setItem('blogIds', JSON.stringify(updatedBlogIds));
        } else {
            const updatedBlogIds = [...blogIds, slug];
            setBlogIds(updatedBlogIds);
            localStorage.setItem('blogIds', JSON.stringify(updatedBlogIds));
        }
    };


    return (
        <>
            <div className={`post-floating-bar fixed ${barState} transition-all duration-300 flex left-0 right-0 z-50 h-12 w-full flex-wrap justify-center 2xl:h-14 `}>
                <div className="relative mx-auto border bg-white flex h-12 shrink flex-wrap items-center justify-center rounded-full border-1/2 2xl:h-14 px-5 shadow-gray-600 shadow-sm">
                    {/* like */}
                    <div>
                        <div className="flex justify-center items-center gap-2">
                            <button onClick={handleLikeUpdate} title="like post">
                                <svg viewBox="0 0 22 20" fill={`${liked ? 'red' : 'none' }`} xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6 stroke-current ${liked ? 'text-red-500' : 'text-black'}`}><path d="M11 19C12 19 21 14.0002 21 7.00043C21 3.50057 18 1.04405 15 1.00065C13.5 0.978943 12 1.50065 11 3.00059C10 1.50065 8.47405 1.00065 7 1.00065C4 1.00065 1 3.50057 1 7.00043C1 14.0002 10 19 11 19Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </button>
                            <span>{likeCount}</span>
                        </div>
                    </div>

                    <Divider/>
                    {/* comment */}
                    <div>
                        <div className="flex justify-center items-center gap-2">
                            <button onClick={handleComment}>
                                <svg className="h-4 w-4 stroke-current text-slate-800 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 10.6667H9.83333M6.5 7.75H12.3333M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 9.99762 1.69478 10.9497 2.04839 11.8204C2.11606 11.9871 2.1499 12.0704 2.165 12.1377C2.17976 12.2036 2.18516 12.2524 2.18517 12.3199C2.18518 12.3889 2.17265 12.4641 2.14759 12.6145L1.65344 15.5794C1.60169 15.8898 1.57582 16.0451 1.62397 16.1573C1.66611 16.2556 1.7444 16.3339 1.84265 16.376C1.95491 16.4242 2.11015 16.3983 2.42063 16.3466L5.38554 15.8524C5.53591 15.8273 5.61109 15.8148 5.68011 15.8148C5.74763 15.8148 5.79638 15.8202 5.86227 15.835C5.92962 15.8501 6.01294 15.8839 6.17958 15.9516C7.05025 16.3052 8.00238 16.5 9 16.5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </button>
                        </div>
                    </div>

                    <Divider/>
                    {/* bookmark */}
                    <div>
                        <div className="flex justify-center items-center gap-2">
                            <button onClick={handleBookmark}>
                                <svg viewBox="0 0 16 20" className="h-4 w-4 scale-[0.97] stroke-current text-slate-800 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6" fill={blogIds.includes(slug) ? 'black' :'none'} xmlns="http://www.w3.org/2000/svg"><path d="M15.2 19V5.8C15.2 4.11984 15.2 3.27976 14.8731 2.63803C14.5854 2.07354 14.1265 1.6146 13.562 1.32698C12.9203 1 12.0802 1 10.4 1H5.60005C3.91989 1 3.07981 1 2.43808 1.32698C1.87359 1.6146 1.41465 2.07354 1.12703 2.63803C0.800049 3.27976 0.800049 4.11984 0.800049 5.8V19L5.85342 16.4733C6.64052 16.0798 7.03406 15.883 7.44686 15.8055C7.81246 15.737 8.18764 15.737 8.55324 15.8055C8.96603 15.883 9.35959 16.0798 10.1467 16.4733L15.2 19Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </button>
                        </div>    
                    </div>

                    <Divider/>
                    {/* share */}
                    <SharePost
                        isOpenShare={isOpenShare}
                        setIsOpenShare={setIsOpenShare}
                        slug={slug}
                    /> 
                </div>
            </div>

            {/*  comment component */}
            {
                isOpenCommentBox ? (
                    <>
                        <div onClick={handleComment} className="fixed bg-black opacity-60 top-0 bottom-0 left-0 right-0 z-[60] "></div>
                        <Comment 
                            userId={userId}
                            slug={slug}
                            setIsOpenCommentBox={setIsOpenCommentBox}
                        />
                    </>
                ) : null
            }
        </>
    );
};

export default PostFloatingBar;