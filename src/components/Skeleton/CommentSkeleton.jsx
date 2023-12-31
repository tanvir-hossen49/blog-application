import { Container } from '../index'
import Skeleton from 'react-loading-skeleton';

const CommentSkeleton = ({count}) => {
    return (
        <div className="py-8">
            <Container>
                <div className="space-y-4 ">
                    { Array(count).fill(0).map((item, i) => {
                        return (
                            <div key={i}>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-3 items-center">
                                    {/* user logo */}
                                    <Skeleton width='40px' height='40px' borderRadius='50%' 
                                    className="bg-gray-500 " />
                                    <div>
                                        <Skeleton width='150px'/>
                                        <Skeleton width='100px'/>
                                    </div>
                                </div>
                                <div>
                                    <span>
                                        <svg className="overflow-dots-filled-25px_svg__svgIcon-use" width="25" height="25"><path d="M5 12.5c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 7 10.5c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41zm5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59-.39.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59.56 0 1.03-.2 1.42-.59.39-.39.58-.86.58-1.41 0-.55-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59-.39.39-.58.86-.58 1.41z" fillRule="evenodd"></path></svg>
                                    </span>
                                </div>
                            </div>
                            <div className="my-2">
                                <Skeleton />
                                <Skeleton width='50%'/>
                            </div>
                            <hr/>
                        </div>
                        )
                    })}
                </ div>
            </Container>
        </div>
    )
};

export default CommentSkeleton;