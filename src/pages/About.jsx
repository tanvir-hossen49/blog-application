import { Container } from "../components";
import image from '../assets/updated-college-removebg-preview.png'

const About = () => {
    return (
        <div className="py-8">
            <Container className='md:flex  block items-center justify-center gap-5'>
                <div className="w-full md:w-1/3">
                    <img src={image} alt="author image" className="w-72 md:w-full object-cover mx-auto" />
                </div>
                <div className="md:w-2/3 w-full text-justify">
                    <div>
                        My name is <b>Golam Aziz</b>, I am a front-end developer. I am from Noakhali, Bangladesh. Even though I am currently studying for a bachelor degree in Accounting. Despite my educational background is not programming related but I am passionate about web development and want to create user-friendly websites and applications. Recently I completed Programming Heros web development course. I am always try to explore new technologies to further enhance my skills and contribute to the field of web development. As a passionate developer, I believe in hard work. Last one year I consistently learn MERN stack development. I learn a lot of technology in that time and did almost 15+ projects. Also, I continuously seek out opportunities to enhance my skills and stay up-to-date with the latest trends in web development. Now I am seeking an opportunity to start my professional development career.
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                        <div className="cursor-pointer border-2 rounded-full p-3 duration-300 hover:bg-black hover:text-white">
                            <a href="https://www.facebook.com/golam.aziz.31/" target="blank">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                            </a>
                        </div>
                        <div className="cursor-pointer border-2 rounded-full p-3 duration-300 hover:bg-black hover:text-white">
                            <a href="https://github.com/tanvir-hossen49/" target="blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                            </a>
                        </div>
                        <div className="cursor-pointer border-2 rounded-full p-3 duration-300 hover:bg-black hover:text-white">
                            <a href="https://www.linkedin.com/in/golam-aziz/" target="blank">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default About;