import { Container } from '../index'
import Skeleton from 'react-loading-skeleton';

const CommentSkeleton = ({count}) => {
    return (
        <div className="py-8">
            <Container>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 '>
                    { Array(count).fill(0).map((item, i) => {
                        return (
                            <div key={i} className="flex gap-x-2 rounded-md border">
                                <div className='w-1/2 justify-center'>
                                    <Skeleton height={200} className="h-44 w-full rounded-md object-fill" />
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

export default CommentSkeleton;