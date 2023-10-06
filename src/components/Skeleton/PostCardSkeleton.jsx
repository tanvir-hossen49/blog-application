import { Container } from '../index'
import Skeleton from 'react-loading-skeleton';

const PostCardSkeleton = ({count}) => {
    return (
        <div className="py-8">
            <Container>
                <div className='space-y-3'>
                    { Array(count).fill(0).map((item, i) => {
                        return (
                            <div key={i} className="flex gap-x-2 rounded-md border">
                                <div className='md:w-1/3 w-1/2 justify-center'>
                                    <Skeleton height={200} className="w-full rounded-md" />
                                </div>

                                <div className='md:w-2/3 w-1/2'>
                                    <div className="p-4">
                                        <h2>
                                            <Skeleton />
                                        </h2>
                                        <p className="mt-3">
                                            <Skeleton />
                                            <Skeleton width='75%'/>
                                        </p>
                                        <button className="mt-4 rounded-md">
                                            <Skeleton width={150} height={30}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </ div>
            </Container>
        </div>
    )
};

export default PostCardSkeleton;