import { useEffect } from 'react';
import config from '../../../appwrite/config';
import { useState } from 'react';
import { Loader } from '../../../components';

const ManageAuthor = () => {
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (
            async () => {
                try{
                    const author = await config.getAuthors();
                    setAuthor(author)
                }catch(error) {
                    setError(true);
                    console.log(error);
                } finally{
                    setLoading(false)
                }
            }
        )();
    }, []);

    if(error) return <h1>Something went wrong</h1>

    return loading ? <Loader /> : (
        <div>
            {author.length}
        </div>
    );
};

export default ManageAuthor;