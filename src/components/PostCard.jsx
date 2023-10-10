import service from "../appwrite/config"
import {Link} from 'react-router-dom'

const PostCard = ({$id, title, featuredImg}) => {  
  // const text = Array.isArray(parser(content)) ? parser(content).map(e => e?.props?.children).toString() : parser(content).props.children;

  return (
      <div className="flex gap-x-2 rounded-md border">
          <div className='w-1/2 justify-center'>
              <img src={service.getFilePreview(featuredImg)} alt={title}
              className="h-44 w-full rounded-md object-cover" />
          </div>
          <div className="w-1/2">
            <div className="p-4">
              <h2 className='text-lg font-semibold'>{title}</h2>
              {/* <p className="mt-3 text-sm text-gray-600">
                { text.length > 100 ? text.split(' ').slice(0, 30).join(' ').concat('...') : parser(content)}
              </p> */}
              <Link to={`/post/${$id}`}>
                <button className="mt-4 md:text-base text-sm bg-black md:px-3 px-2 py-2 rounded-md font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                  Continue Reading
                </button>
              </Link>
            </div>
          </div>
      </div>
  )
}

export default PostCard