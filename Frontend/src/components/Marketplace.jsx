import React, { useState } from "react";
import previousBtn from "/previous.png"
import nextBtn from "/next.png"
function Carousel({slides}){
    const [currentIndex, setCurrentIndex] = useState(0);
    function prevSlide() {
        setCurrentIndex((prevIndex) => (prevIndex == 0) ? slides.length - 1 : prevIndex - 1);
    };

    function nextSlide() {
        setCurrentIndex((prevIndex) => (prevIndex == slides.length-1) ? 0 : prevIndex + 1);
    };
    return (
        <div className="relative max-h-36">
            {/* Slides */}
            <div className="overflow-hidden relative border-b border-neutral-800">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                    <img key={index} src={slide} alt="image" className="min-w-full object-contain h-full max-w-36 max-h-36" />
                ))}
                </div>
            </div>
            {/* Navigation Buttons */}
            <div className={`${slides.length==1?"hidden":"visible"}`}>
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
            </div>

            {/* Indicators */}
            <div className="w-full flex justify-center items-center space-x-3">
                <div className="absolute bottom-3 space-x-3">
                    {slides.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full ${currentIndex === index?"bg-white":"bg-gray-500"}`}></button>
                    ))}
                </div>
            </div>
        </div>
    )
}

const ItemCard = ({data}) => {
  return (
    <div className="max-w-sm border border-neutral-700 rounded-lg overflow-hidden hover:cursor-pointer min-w-full">
      <div className="bg-neutral-950">
        <Carousel slides={data.images}/>
        {/* <img src={data.images} alt="Product" className="w-full h-36 object-contain bg-neutral-900"/> */}
      </div>
      <div className="px-2">
        <div className="py-2 flex justify-between items-center border-b border-neutral-600">
            <span className="text-lg font-semibold">₹{data.cost}</span>
            <span className="text-neutral-500 text-xs">{data.date}</span>
        </div>
        <div className="py-2 my-2 h-10">
            <p className="text-neutral-200 text-xs line-clamp-2">
                {data.description}
            </p>
        </div>
        <div className="py-2">
            <button className="w-full bg-blue-500 rounded-full text-sm p-2 hover:bg-blue-400">Contact</button>
        </div>
      </div>
    </div>
  );
};

const items = [{
    images:["https://www.clankart.com/user-uploads/advert/Civil_Engineering_and_GATE_Preparation_Books1717048147717.jpg"],
    cost:"999",
    description:"GATE prepration study material, includes previour year question papers, handwritten notes",
    department:"BTECH",
    date:"Nov 18, 2024",
  },{
  images:["https://th.bing.com/th/id/OIP.MTC8gX0tslOT8CbpgJvb2wHaFj?rs=1&pid=ImgDetMain","https://th.bing.com/th/id/OIP.bNO_UJWiTu6chdSUE_wWfwHaE8?rs=1&pid=ImgDetMain"],
  cost:"2500",
  description:"2nd hand cycle everything working",
  department:"COMMERCE",
  date:"Yesterday",
},{
  images:["https://i.ebayimg.com/images/g/UXMAAOSwrrplv7n6/s-l1600.jpg"],
  cost:"1500",
  description:"Arduino kit for learning purpose, has ultrasonic sensor, battery and arduino",
  department:"BSC",
  date:"Nov 18, 2024",
},]

function Marketplace(){
    // const [card, setCard] = useState(null);
    return (
        <>
        {/* <Modal/> */}
        <div className="text-white w-full h-full overflow-y-auto sm:px-10 px-4">
            <div className="h-full">
                <div className="h-20 flex justify-center items-center border-b-2 mb-5">
                    <p className="text-5xl font-bold text-center">Market Place</p>
                </div>
                <div className="grid grid-cols-2 grid-flow-row gap-4">
                    {/* first default box */}
                    <div className="bg-neutral-900 rounded-lg flex justify-center items-center">
                        <div className="text-center w-5/6 h-full">
                            <div className="h-1/3">
                                <p className="pt-5 sm:text-2xl text-lg">Want to see your stuff here?</p>
                            </div>
                            <div className="h-1/3 sm:text-lg text-sm text-balance">
                                <p>Make some extra cash by selling things in your community. Go On, it's easy!</p>
                            </div>
                            <div className="h-1/3 flex items-end pb-5">
                                <button className="border border-white p-2 rounded-full w-full hover:bg-neutral-950 text-sm font-bold">Start Selling</button>
                            </div>
                        </div>
                    </div>
                    {/* other cards */}
                    {
                        items.map((data, index)=>{
                            return <ItemCard data={data} key={index}/>
                        })
                    }
                </div> 
            </div>  
        </div>
        </>
    )
}

export default Marketplace;
