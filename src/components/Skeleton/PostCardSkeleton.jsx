import Skeleton from 'react-loading-skeleton';

const PostCardSkeleton = ({count}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            { Array(count).fill(0).map((item, i) => {
                return (
                    <div key={i} className="w-[320px] rounded-md border">
                        <div className='w-full mb-4'>
                            <Skeleton height={200} className="w-full rounded-md" />
                        </div>
                        <div className="p-4">
                        <h2>
                            <Skeleton />
                        </h2>
                        <p className="mt-3">
                            <Skeleton />
                            <Skeleton width='50%'/>
                        </p>
                        <button className="mt-4 rounded-md">
                            <Skeleton width={50}/>
                        </button>
                        </div>
                    </div>
                )
            })}
        </ div>
    )
};

export default PostCardSkeleton;