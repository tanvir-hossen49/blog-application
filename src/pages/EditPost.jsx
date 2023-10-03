import { useEffect } from 'react';
import service from '../appwrite/config';
import { useState } from 'react';
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        service.getPost(slug).then(post => {
            if(post)  setPost(post);
            else navigate('/');
        }).catch(error => {
            console.log('edit post page', error)
        })
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
};

export default EditPost;