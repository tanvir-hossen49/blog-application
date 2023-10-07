import { useEffect, useCallback, useState } from 'react';
import { Button, Container, Input, RealTimeEditor, Select } from '../index';
import service from '../../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

const PostForm = ({post}) => {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active'
        }
    });
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { userData } = useSelector(state => state.auth);
    const [error, setError] = useState('');
    const [filePreview, setFilePreview] = useState(null);
    
    const submit = async (data) => {
        setLoading(true);

        if(post) {
            const file = data.featuredImg[0] ? await service.uploadFile(data.featuredImg[0]) : null

            try {
                const updatedData = {
                    ...data,
                    featuredImg: file ? file.$id : undefined,
                };
                
                const dbPost = await service.updatePost(post.$id, updatedData);

                if (dbPost && file) {
                    console.log('ud', updatedData, 'post', post, 'file', file);
                    service.deleteFile(post.featuredImg);
                }
        
                if(dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            } catch (error) {
                console.log('update post: post form component error', error)
                setError(error);
            } finally{
                setLoading(false);
            }
        }else{
            setLoading(true);
            
            const file = await service.uploadFile(data.featuredImg[0]);
            if(file) {
                try{
                    const fileId = file.$id;
                    data.featuredImg = fileId;
                    const dbPost = await service.createPost({
                        ...data,
                        author: userData.name,
                        userId: userData.$id,
                    })
                    navigate(`/post/${dbPost.$id}`);
                } catch(error) {
                    service.deleteFile(file.$id)
                    setError(error)
                } finally{
                    setLoading(false);
                }
            } else{
                setLoading(false);
            }
        }
    };

    const handleFileChange = (value) => {
        const file = value.featuredImg[0]
    
        if (file) {
          // Read the file as a data URL
          const reader = new FileReader();
    
          reader.onloadend = () => {
            // Set the file preview
            setFilePreview(reader.result);
          };
    
          reader.readAsDataURL(file);
        } else {
          // Clear file preview if no file is selected
          setFilePreview(null);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if(name === 'title') {
                setValue('slug', slugTransform(value.title, {
                    shouldValidate: true
                }))
            } else if(name === 'featuredImg') {
                handleFileChange(value)
            }
        })

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue]);
    
    return (
        <>
            <Container><p className='mb-5 text-red-600'>{error && error}</p></Container>
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
                <div className="md:w-2/3 w-full  px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", { required: true })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        value={slug}
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <RealTimeEditor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                </div>
                <div className="md:w-1/3 w-full mt-3 md:mt-0 px-2">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("featuredImg", { required: post ? false : true})}
                    />

                    {post  && (
                    <div className={`w-full mb-4 ${filePreview && 'hidden'}`}>
                            <img
                                src={service.getFilePreview(post.featuredImg)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    { filePreview && (
                        <div className="w-full mb-4">
                            <img
                                src={filePreview}
                                alt={'file preview'}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />

                    <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {loading ? 'loading...' : post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default PostForm;