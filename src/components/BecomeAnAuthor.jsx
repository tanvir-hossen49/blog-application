import { useNavigate } from "react-router-dom";

const BecomeAnAuthor = () => {
    const navigate = useNavigate()
    return (
        <div className="py-3">
            <h1 className="blog-page-title mb-10 break-words text-3xl font-bold text-black  md:text-4xl xl:text-5xl">Become An Author</h1>

            <p>
                First of all Red Rose Greetings from <strong>KnowledgeNest</strong>. Next I would like to thank you for your decision. Because you have made a great decision to donate knowledge. We have thousands of members of the KnowledgeNest family waiting to read your articles. You can become a member of the KnowledgeNest author family right away by following some very simple rules.
            </p>

            <h3 className="font-medium text-2xl mt-3">
                Everything you need to know about how to become a blogger in knowledgeNest:
            </h3>

            <ul className="list-disc pl-10">
                <li>
                    Click <strong className="underline cursor-pointer text-blue-600" 
                    onClick={() => navigate('/signup')}>Sign up</strong> button.
                    Or If you already signup. 
                    Then click this <strong className="underline cursor-pointer text-blue-600" 
                    onClick={() => navigate('/become-author-form')}>here</strong>.
                </li>
                <li>Click {"'Yes'"} <strong>Become an author</strong> button.</li>
                <li>Add image, facebook and linkedin profile link.</li>
                <li>Then your application will be process.</li>
                <li>If everything is ok Admin will make you author and it will be informed through email.</li>
                <li>Then Write Your Blog.</li>
            </ul>
        </div>
    );
};

export default BecomeAnAuthor;