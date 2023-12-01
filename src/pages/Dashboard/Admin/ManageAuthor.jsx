import { useEffect } from 'react';
import config from '../../../appwrite/config';
import { useState } from 'react';
import { Container, Loader } from '../../../components';
import { showAlertMessage } from '../../../utilities/AlertMessage';

const ManageAuthor = () => {
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleAuthor = () => {
      showAlertMessage({
        title: 'Are you sure',
        text: 'You Want to make him/ her to an Author',
        confirmButtonText: 'Yes, I want to'
      })
    }
    
    const handleDeleteAuthor = () => {
      showAlertMessage({
        title: 'Are you sure',
        text: 'You Want to delete this author',
        confirmButtonText: 'Yes, I want to delete'
      })
    }

    useEffect(() => {
        (
            async () => {
                try{
                    setError(false);
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
    <>
      <Container>
        <div className="mt-6 flex flex-col">
          <div className="overflow-x-auto ">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        <span>User</span>
                      </th>           
                                
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Verified
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Role
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                      >
                        Gender
                      </th>

                      <th scope="col" className="relative px-4 py-3.5">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    { author.map((person) => (
                      <tr key={person.name}>
                        {/* image */}
                        <td className="whitespace-nowrap px-4 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={person.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{person.name}</div>
                              <div className="text-sm text-gray-700">{person.email}</div>
                            </div>
                          </div>
                        </td>
                        {/* status */}
                        <td className="whitespace-nowrap px-4 py-4">

                          { person.isVerified ? <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            Verified
                          </span>
                          : <span className="inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800">
                          Unverified
                        </span>
                          }
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {person.role}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                          {person.gender}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                          { person.isVerified ? <button onClick={handleDeleteAuthor} className="inline-flex rounded-lg bg-red-100 px-3 py-3 text-xs font-semibold leading-5 text-red-800">
                            Delete Author
                          </button>
                          :
                          <button onClick={handleAuthor} className="inline-flex rounded-lg bg-green-100 px-3 py-3 text-xs font-semibold leading-5 text-green-800">
                            Confirm
                          </button>}
                        </td>
                      </tr>
                    )) }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
    );
};

export default ManageAuthor;