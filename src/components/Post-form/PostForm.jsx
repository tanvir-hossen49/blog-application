import { useEffect, useCallback, useState } from 'react';
import { Button, Input, RealTimeEditor, Select } from '../index';
import service from '../../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const PostForm = ({post}) => {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { userData } = useSelector(state => state.auth);

    const submit = async (data) => {
        if(post) {
            setLoading(true);
            const file = data.featuredImg[0] ? service.uploadFile(data.featuredImg[0]) : null

            if(file) {
                service.deleteFile(post.featuredImg);
            }

            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImg: file ? file.$id : undefined
            })
            setLoading(false);
            if(dbPost) navigate(`/post/${dbPost.$id}`);
        }else{
            setLoading(true);
            const file = await service.uploadFile(data.featuredImg[0]);
            if(file) {
                const fileId = file.$id;
                data.featuredImg = fileId;
                const dbPost = await service.createPost({
                    ...data,
                    userId: userData.$id
                })
                setLoading(false);
                navigate(`/post/${dbPost.$id}`)
            }
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
            }
        })

        return () => {
            subscription.unsubscribe();
        }
    }, [watch, slugTransform, setValue]);
    
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
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
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredImg", { required: post ? false : true})}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={service.getFilePreview(post.featuredImg)}
                            alt={post.title}
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
    );
};

export default PostForm;