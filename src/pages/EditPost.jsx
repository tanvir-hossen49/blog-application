import { useEffect } from 'react';
import service from '../appwrite/config';
import { useState } from 'react';
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const posts = useSelector(store => store.myPost.posts);

    useEffect(() => {
        if(posts === null) {
          (async () => {
            try {
              const fetchedPost = await service.getPost(slug);
              if (fetchedPost) {
                setPost(fetchedPost);
              } else {
                navigate('/');
              }
            } catch (error) {
              console.error('Error fetching post on the edit post page:', error);
            }
          })()
        } else{
          const post = posts.find(post => post.$id === slug)
          setPost(post);
        }
    }, [slug, navigate, posts]);

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
};

export default EditPost;