import { useEffect, useState, useRef } from "react";
import previousBtn from "/previous.png"
import nextBtn from "/next.png"
import like from "/like.png"
import comment from "/comment.png"
import axios from "axios";
import { API_URL, timeAgo } from "../App";
import { GiPartyPopper } from "react-icons/gi";
import { IconContext } from "react-icons/lib";

function Carousel({slides}){
    const [currentIndex, setCurrentIndex] = useState(0);
    function prevSlide() {
        setCurrentIndex((prevIndex) => (prevIndex == 0) ? slides.length - 1 : prevIndex - 1);
    };

    function nextSlide() {
        setCurrentIndex((prevIndex) => (prevIndex == slides.length-1) ? 0 : prevIndex + 1);
    };
    return (
        <div className={`relative max-h-80 ${slides.length==0?"hidden":"visible"}`}>
            {/* Slides */}
            <div className="overflow-hidden relative border-b border-neutral-800">
                <div className="flex items-center transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                    <img key={index} src={slide} alt="image" className="min-w-full object-contain h-full max-w-96 max-h-80" />
                ))}
                </div>
            </div>
            <div className={`${slides.length<2?"hidden":"visible"}`}>
                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-1 -translate-y-1/2 text-white p-2"
                >
                    <img src={previousBtn} alt="" className="h-6"/>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-1 -translate-y-1/2 text-white p-2"
                >
                    <img src={nextBtn} alt="" className="h-6"/>
                </button>

                {/* Indicators */}
                <div className="w-full flex justify-center items-center space-x-3">
                    <div className="absolute bottom-3 space-x-3">
                        {slides.map((_, index) => (
                        <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full ${currentIndex === index?"bg-gray-300":"bg-gray-800"}`}></button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Post({slides, authorName, authorUsername, createdAt, caption}){ 
    return (
        <div className="max-w-lg sm:mx-10 mx-2 border border-neutral-700 rounded-lg shadow-md mb-5">
            {/* Header */}
            <div className="flex items-center p-2 px-4 border-b border-neutral-700">
                <img src="https://cdn.pixabay.com/photo/2023/02/23/10/16/ai-generated-7808455_960_720.jpg" alt="Profile" className="w-12 h-12 rounded-full object-cover"/>
                <div className="ml-4 flex justify-between items-center w-full">
                    <div>
                        <h3 className="font-semibold">{authorName}</h3>
                        <p className="text-sm text-gray-400">{authorUsername}</p>
                    </div>
                    <p className="text-xs">{timeAgo(createdAt)}</p>
                </div>
            </div>
        
            {/* Media */}
            <div className="w-full">
                <Carousel slides={slides}/>
            </div>
    
            {/* Title & Caption */}
            <div className="p-2">
                <p className="text-sm mt-2 text-wrap">{caption}</p>
            </div>

            {/* Footer */}
            <div className="mb-4 px-4 ">
                <div className="flex space-x-5 justify-start items-center text-gray-600">
                    <button className="items-center space-x-1 hover:text-red-500">
                        <div className="flex justify-center items-center">
                            <img src={like} alt=""  className="h-8"/>
                        </div>
                        {/* <span>10 Likes</span> */}
                    </button>
                    <button className="items-center space-x-1 hover:text-blue-500">
                        <div className="flex justify-center items-center">
                            <img src={comment} alt=""  className="h-8"/>
                        </div>
                        {/* <span>2 Comments</span> */}
                    </button>
                    <input type="text" className="w-5/6 p-2 bg-neutral-900 rounded-lg" placeholder="Comment"/>
                </div>
            </div>
        </div>
    );
}

function PostLoadingScreen(){ 
    return (
        <div className="max-w-lg sm:mx-10 mx-2 border border-neutral-700 rounded-lg shadow-md animate-pulse sm:w-[32rem] mb-5">
            {/* Header */}
            <div className="flex items-center p-2 px-4 border-b border-neutral-700 w-full h-2/6">
                <div className="w-12 h-10 rounded-full bg-neutral-800"></div>
                <div className="ml-4 flex justify-between items-center w-full">
                    <div className="w-full">
                        <div className="rounded-lg font-semibold h-5 bg-neutral-800 w-full"></div>
                        <div className="rounded-full text-sm w-2/3 h-3 mt-1 bg-neutral-800"></div>
                    </div>
                    <p className="text-xs"></p>
                </div>
            </div>
        
            {/* Media */}
            <div className="w-full sm:h-[17rem] h-[13rem] bg-neutral-800"></div>
    
            {/* Title & Caption */}
            <div className="p-2 mt-2 bg-neutral-800 rounded-lg m-2 h-10"></div>

            {/* Footer */}
            <div className="mb-4 px-4 ">
                <div className="flex space-x-5 justify-start items-center text-gray-600">
                    <button className="items-center space-x-1 hover:text-red-500">
                        <div className="flex justify-center items-center">
                            <img src={like} alt=""  className="h-8"/>
                        </div>
                    </button>
                    <button className="items-center space-x-1 hover:text-blue-500">
                        <div className="flex justify-center items-center">
                            <img src={comment} alt=""  className="h-8"/>
                        </div>
                    </button>
                    <input type="text" className="w-5/6 p-2 bg-neutral-900 rounded-lg" placeholder=""/>
                </div>
            </div>
        </div>
    );
}

function Home(){
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [fetchingMore, setFetchingMore] = useState(false);
    const [page, setPage] = useState(1);
    const divRef = useRef(null);
    async function fetchData(){
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/v1/post`,{
                params:{
                    limit:10,
                    page:page,
                }
            });
            const data = response.data;
            if (data.message.length == 0){
                setHasMore(false);
            }
            if (data.success==true && data.message.length){
                setPosts([...posts, ...data.message]);
                setPage((page)=> page + 1);
            }
        } catch(error){
            setError(error);
            console.log("Error fetching data in homejsx:\n"+error);
        }
        setLoading(false);
    }
    async function fetchMoreData(){
        setFetchingMore(true);
        setError(null);
        try {
            const response = await axios.get(`${API_URL}/v1/post`,{
                params:{
                    limit:10,
                    page:page,
                }
            });
            const data = response.data;
            if (data.message.length == 0){
                setHasMore(false);
            }
            if (data.success==true && data.message.length){
                setPosts([...posts, ...data.message]);
                setPage((page)=> page + 1);
            }
        } catch(error){
            setError(error);
            console.log("Error fetching data in homejsx:\n"+error);
        }
        setFetchingMore(false);
    }
    // Fetching data as soon as component is mounted for the first time:
    useEffect(()=>{
        setPosts([]); //Same posts multiple time aa jayengi nahi to
        fetchData()
    }, [])

    // Infinite scroll
    function handleScroll(){
        if (!hasMore || loading) return; //Aur nahi hain post, dont fetch more, user has reached END
        const {scrollTop, scrollHeight, clientHeight} = divRef.current;
        if (scrollTop+clientHeight >= scrollHeight){
            fetchMoreData();
        }
    }

    return (
        <>
        <div className="text-white h-full w-full sm:flex sm:justify-center -z-50 overflow-auto" ref={divRef} onScroll={handleScroll}>
            <div className="sm:my-5 space-y-5">
                <div className={`${(loading && !fetchingMore || posts.length == 0)?"hidden":"visible"}`}>
                    {
                        posts.map((data, index)=>{
                            return <Post key={index} slides={data.media} authorName={data.userId} authorUsername={data.userId} createdAt={data.createdAt} caption={data.caption}/>
                        })
                    }
                </div>
                {/* Loading screen */}
                <div className={`${(loading || posts.length==0 )?"visible":"hidden"}`}>
                    {
                        ["",""].map((data, index)=>{
                            return <PostLoadingScreen key={index}/>
                        })
                    }
                </div>
                {/* Fetching More Items Screen */}
                <div className={`${(fetchingMore?"visible":"hidden")}`}>
                        {    
                            [""].map((data, index)=>{
                                return <PostLoadingScreen key={index}/>
                            })
                        }
                </div>
                {/* If there are no new posts */}
                <div className={`${hasMore?"hidden":"visible"}`}>
                    <div className="sm:mx-10 rounded-lg shadow-md sm:w-[32rem] mb-5 p-4 flex justify-center items-center">
                        <div className="flex justify-center items-center w-full bg-gradient-to-r rounded-lg p-3 from-teal-400 to-blue-500">
                            <h1 className="text-center  text-black  text-lg">You're All caught up! Comeback Later!</h1>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home