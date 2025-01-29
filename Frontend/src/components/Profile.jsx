import { useState } from "react";
import previousBtn from "/previous.png";
import nextBtn from "/next.png";
import like from "/like.png";
import comment from "/comment.png";
import { IoCalendarNumberOutline } from "react-icons/io5";


function ProfileHeader() {
  return (
    <div className="bg-black text-white">
      {/*background banner rahega*/}
      <div className="relative">
        <img
          src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202207/ronaldounitedatleticotransfer_1200x768.png?VersionId=D6fapmJ8W5Qj6z1vpqZusEu1gL.H_79l&size=690:388"
          alt="Banner"
          className="w-full h-40 object-cover"
        />
        {/*pic of user*/}
        <div className="absolute top-24 left-6">
          <img
            src="https://cdn.pixabay.com/photo/2023/02/23/10/16/ai-generated-7808455_960_720.jpg"
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-black"
          />
        </div>
      </div>
      {/* profile */}
      <div className="pt-14 pl-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">Username</h1>
          <span className="bg-gray-800 text-sm px-3 py-1 rounded-full">
            CHAPRI
          </span>
        </div>
        <p className="text-gray-400 text-sm">@username_chapri</p>
        <span className="bg-gray-800 text-sm px-1 py-1 rounded-2xl mt-2 inline-block">
              Kabutar Science Department-GGV
            </span>
        <p className="text-balance text-lg text-white mt-2">
          Kamar pandey ko ggv se bhagao
        </p>
        
        <div className="flex items-center mt-2 text-gray-400 text-sm">
          <IoCalendarNumberOutline className="mr-1" />
          <p>Joined August 2020</p>
        </div>
        <div className="flex items-center mt-4 space-x-8">
          <div className="flex items-center space-x-1">
            <h2 className="font-semibold text-sm">42</h2>
            <p className="text-gray-400 text-sm">Posts</p>
          </div>
          <div className="flex items-center space-x-1">
            <h2 className="font-semibold text-sm">1000</h2>
            <p className="text-gray-400 text-sm">Aura</p>
          </div>
        </div>
      </div>
      {/*tab*/}
      <div className="mt-6 border-b border-gray-800">
        <nav className="flex text-gray-400">
          <a href="#" className="px-4 py-2 text-white border-b-2 border-blue-500">
            Posts
          </a>
          
          <a href="#" className="px-4 py-2 hover:text-white">Media</a>
          <a href="#" className="px-4 py-2 hover:text-white">Liked</a>
          <a href="#" className="px-4 py-2 hover:text-white">Comments</a>
          <a href="#" className="px-4 py-2 hover:text-white">My Products</a>
        </nav>
      </div>
    </div>
  );
}

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

// Post Component
function Post({ slides, textOnly }) {
  return (
    <div className="max-w-lg mx-auto bg-black border border-gray-700 rounded-lg mt-6 shadow-md">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-700">
        <img
          src="https://cdn.pixabay.com/photo/2023/02/23/10/16/ai-generated-7808455_960_720.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-600"
        />
        <div className="ml-4">
          <h3 className="font-semibold text-white">Username</h3>
          <p className="text-sm text-gray-500">@username</p>
        </div>
        <p className="ml-auto text-sm text-gray-600">Nov 15, 2024</p>
      </div>

      {/* Media Post */}
      {!textOnly && slides && <Carousel slides={slides} />}

      {/* Text Post */}
      {textOnly && (
        <div className="p-4">
          <p className="text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
            sapiente!
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="p-4 flex items-center space-x-6 text-gray-500">
        <button className="flex items-center space-x-1 hover:text-white transition">
          <img src={like} alt="Like" className="h-5" />
          <span className="text-sm">Like</span>
        </button>
        <button className="flex items-center space-x-1 hover:text-white transition">
          <img src={comment} alt="Comment" className="h-5" />
          <span className="text-sm">Comment</span>
        </button>
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 bg-gray-800 text-gray-300 placeholder-gray-500 p-2 rounded-lg focus:ring focus:ring-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );
}



export default function Profile() {
  const slides1 = [
    "https://th.bing.com/th/id/OIP.MCLzVoExgXPyNi_V5gb1AwHaE7?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.9r1JDiokxqQLHrj2a9XojAHaNK?rs=1&pid=ImgDetMain",
  ];
  const slides2 = [
    "https://pinchofglam.com/wp-content/uploads/2024/05/cinnamon-brown-haircolor-26-600x900.jpg",
    "https://th.bing.com/th/id/OIP.n8eeUqmmEIKtzRxgzwaSLAHaK0?w=832&h=1216&rs=1&pid=ImgDetMain",
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <ProfileHeader />
      <Post slides={slides1} />
      <Post slides={slides2} />
      <Post textOnly />
    </div>
  );
}