import { useForm } from "react-hook-form";
import Input from "../Input";

const Comment = ({setIsOpenCommentBox}) => {
    const { register, handleSubmit, setValue } = useForm();

    const submit = (data) => {
        setValue("comment", ''); 
        console.log(data);
    }

    return (
        <div className="fixed z-[60] 
            md:top-0 top-12 
            md:bottom-0 bottom-3 
            md:right-0 right-3 
            md:rounded-none rounded-lg bg-white 
            lg:w-1/3 md:w-2/3 
            w-[95%]
            overflow-auto">
            <div className="pl-8 pr-4 py-3 space-y-5 ">
                <div className="flex justify-between gap-3 items-center">
                    <h2 className="text-xl mb-0 font-medium">Response</h2>
                    <button
                        onClick={() => setIsOpenCommentBox(prev => !prev)} 
                        type="button" aria-label="Close sidebar" data-title="Close sidebar" className="blog-sidebar-close-button tooltip-handle ml-2 rounded-full border border-transparent p-2 font-semibold transition-colors duration-150 focus:outline-none hover:bg-black/10"><svg className="h-5 w-5 fill-current" viewBox="0 0 320 512"><path d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>
                    </button>
                </div>
                {/* comment box */}
                <form onSubmit={handleSubmit(submit)}>
                    <Input 
                        type = "text"
                        placeholder = 'What are your thoughts?'
                        {...register("comment", { required: true })}
                    />
                </form>
                {/* comment list */}
                <div className="space-y-4 ">
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                                {/* user logo */}
                                <div className="w-8 h-8 bg-gray-500 rounded-full text-center">
                                    Hi
                                </div>
                                <div>
                                    <p>User Name</p>
                                    <p className="text-sm">Date</p>
                                </div>
                            </div>
                            <div>
                                <span>
                                <svg className="overflow-dots-filled-25px_svg__svgIcon-use" width="25" height="25"><path d="M5 12.5c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 7 10.5c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41zm5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59-.39.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59.56 0 1.03-.2 1.42-.59.39-.39.58-.86.58-1.41 0-.55-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59-.39.39-.58.86-.58 1.41z" fillRule="evenodd"></path></svg>
                                </span>
                            </div>
                        </div>
                        <div className="my-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo eos fugiat maiores commodi itaque soluta cum quos incidunt, veniam labore aspernatur.
                        </div>
                        <hr/>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                                {/* user logo */}
                                <div className="w-8 h-8 bg-gray-500 rounded-full text-center">
                                    Hi
                                </div>
                                <div>
                                    <p>User Name</p>
                                    <p className="text-sm">Date</p>
                                </div>
                            </div>
                            <div>
                                <span>
                                <svg className="overflow-dots-filled-25px_svg__svgIcon-use" width="25" height="25"><path d="M5 12.5c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 7 10.5c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41zm5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59-.39.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59.56 0 1.03-.2 1.42-.59.39-.39.58-.86.58-1.41 0-.55-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59-.39.39-.58.86-.58 1.41z" fillRule="evenodd"></path></svg>
                                </span>
                            </div>
                        </div>
                        <div className="my-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo eos fugiat maiores commodi itaque soluta cum quos incidunt, veniam labore aspernatur.
                        </div>
                        <hr/>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                                {/* user logo */}
                                <div className="w-8 h-8 bg-gray-500 rounded-full text-center">
                                    Hi
                                </div>
                                <div>
                                    <p>User Name</p>
                                    <p className="text-sm">Date</p>
                                </div>
                            </div>
                            <div>
                                <span>
                                <svg className="overflow-dots-filled-25px_svg__svgIcon-use" width="25" height="25"><path d="M5 12.5c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 7 10.5c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41zm5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59-.39.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59.56 0 1.03-.2 1.42-.59.39-.39.58-.86.58-1.41 0-.55-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59-.39.39-.58.86-.58 1.41z" fillRule="evenodd"></path></svg>
                                </span>
                            </div>
                        </div>
                        <div className="my-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo eos fugiat maiores commodi itaque soluta cum quos incidunt, veniam labore aspernatur.
                        </div>
                        <hr/>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-3 items-center">
                                {/* user logo */}
                                <div className="w-8 h-8 bg-gray-500 rounded-full text-center">
                                    Hi
                                </div>
                                <div>
                                    <p>User Name</p>
                                    <p className="text-sm">Date</p>
                                </div>
                            </div>
                            <div>
                                <span>
                                <svg className="overflow-dots-filled-25px_svg__svgIcon-use" width="25" height="25"><path d="M5 12.5c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 7 10.5c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41zm5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59-.39.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59.56 0 1.03-.2 1.42-.59.39-.39.58-.86.58-1.41 0-.55-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59-.39.39-.58.86-.58 1.41z" fillRule="evenodd"></path></svg>
                                </span>
                            </div>
                        </div>
                        <div className="my-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium explicabo eos fugiat maiores commodi itaque soluta cum quos incidunt, veniam labore aspernatur.
                        </div>
                        <hr/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comment;