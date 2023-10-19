const SharePost = ({slug, isOpenShare, setIsOpenShare}) => {
    const handleCopyLink = () => {
        // TODO: show toast message
        document.execCommand(`https://blog-application-rho-murex.vercel.app/post/${slug}`);
    }

    return (
        <div>
            <div className="flex justify-center items-center gap-2">
                <button onClick={() => setIsOpenShare(prev => !prev)}>
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 stroke-current text-slate-800 sm:h-5 sm:w-5 2xl:h-6 2xl:w-6"><path d="M6.25 7.91667L11.75 5.08333M6.25 10.0833L11.75 12.9167M6.5 9C6.5 10.3807 5.38071 11.5 4 11.5C2.61929 11.5 1.5 10.3807 1.5 9C1.5 7.61929 2.61929 6.5 4 6.5C5.38071 6.5 6.5 7.61929 6.5 9ZM16.5 4C16.5 5.38071 15.3807 6.5 14 6.5C12.6193 6.5 11.5 5.38071 11.5 4C11.5 2.61929 12.6193 1.5 14 1.5C15.3807 1.5 16.5 2.61929 16.5 4ZM16.5 14C16.5 15.3807 15.3807 16.5 14 16.5C12.6193 16.5 11.5 15.3807 11.5 14C11.5 12.6193 12.6193 11.5 14 11.5C15.3807 11.5 16.5 12.6193 16.5 14Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </button>
            </div> 
            
            {/* when click share button */}
            <div className={`${isOpenShare ? 'absolute right-0 bottom-[50px] z-50' : 'hidden'}`}>
                <div onClick={() => setIsOpenShare(prev => !prev)} className="z-50 w-40 rounded-xl border border-slate-200 bg-white px-1 py-2 text-sm font-semibold">
                    {/* link copy */}
                    <button onClick={handleCopyLink} className="border border-transparent disabled:opacity-50 outline-none! w-full flex-row items-center py-3 text-slate-600 hover:bg-slate-100 focus:outline-none flex flex-wrap rounded px-2 text-sm font-normal" type="button">
                        <span className="flex h-5 w-5 items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="h-5 w-4 fill-current text-slate-600 " fill="none"><path d="M173 131.5C229.2 75.27 320.3 75.27 376.5 131.5C430 185 432.9 270.9 383 327.9L377.7 334C368.9 344 353.8 345 343.8 336.3C333.8 327.6 332.8 312.4 341.5 302.4L346.9 296.3C380.1 258.3 378.2 201.1 342.5 165.4C305.1 127.1 244.4 127.1 206.1 165.4L93.63 278.7C56.19 316.2 56.19 376.9 93.63 414.3C129.3 449.1 186.6 451.9 224.5 418.7L230.7 413.3C240.6 404.6 255.8 405.6 264.5 415.6C273.3 425.5 272.2 440.7 262.3 449.4L256.1 454.8C199.1 504.6 113.2 501.8 59.69 448.2C3.505 392.1 3.505 300.1 59.69 244.8L173 131.5zM467 380.5C410.8 436.7 319.7 436.7 263.5 380.5C209.1 326.1 207.1 241.1 256.9 184.1L261.6 178.7C270.3 168.7 285.5 167.7 295.5 176.4C305.5 185.1 306.5 200.3 297.8 210.3L293.1 215.7C259.8 253.7 261.8 310.9 297.4 346.6C334.9 384 395.6 384 433.1 346.6L546.4 233.3C583.8 195.8 583.8 135.1 546.4 97.7C510.7 62.02 453.4 60.11 415.5 93.35L409.3 98.7C399.4 107.4 384.2 106.4 375.5 96.44C366.7 86.47 367.8 71.3 377.7 62.58L383.9 57.22C440.9 7.348 526.8 10.21 580.3 63.76C636.5 119.9 636.5 211 580.3 267.2L467 380.5z"></path></svg></span><span className="px-2 font-normal text-slate-700 ">Permalink</span>
                    </button>
                    {/* facebook share */}
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`
                        https://blog-application-rho-murex.vercel.app/post/${slug}
                        `)}`} target="black"  rel="noopener" className="outline-none! w-full flex-row items-center py-3 text-slate-600 hover:bg-slate-100 focus:outline-none flex flex-wrap rounded px-2 font-normal" >
                        <span className="flex h-5 w-5 items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-4 fill-current stroke-current text-slate-600 " fill="none"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
                        </span>
                        <span className="px-2 font-normal text-slate-700 ">
                            Facebook
                        </span>
                    </a>
                    {/* linkedin share */}
                    <a href={`https://www.linkedin.com/cws/share?url=${encodeURIComponent(`
                        https://blog-application-rho-murex.vercel.app/post/${slug}
                        `)}`} target="blank" rel="noopener" className="outline-none! w-full flex-row items-center py-3 text-slate-600 hover:bg-slate-100 focus:outline-none flex flex-wrap rounded px-2 font-normal "  >
                        <span className="flex h-5 w-5 items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-7 w-4 fill-current text-slate-600 " fill="none"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg></span>
                        <span className="px-2 font-normal text-slate-700  ">
                            LinkedIn
                        </span>
                    </a>
                </div> 
            </div>
        </div>
    );
};

export default SharePost;