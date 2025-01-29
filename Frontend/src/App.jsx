import Home from "./components/Home";
import EventPage from "./components/EventPage";
import Marketplace from "./components/Marketplace";
import Leftsidebar from "./components/Leftsidebar.styles.tw";
import Rightsidebar from "./components/Rightsidebar.styles.tw";
import Profile from "./components/Profile"; 
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

export const API_URL = "/api"; 

export function timeAgo(dateString) {
  const givenDate = new Date(dateString);
  const now = new Date();

  const diffInMs = now - givenDate;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else {
    // Format the date as dd/mm/yy
    return givenDate
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
      .replaceAll("-", "/");
  }
}

// The main content takes the remaining space between the sidebars
const MainContent = styled.div.attrs({
    className:"sm:h-full h-full overflow-y-auto w-full sm:ml-[20rem] sm:mr-[28rem]", // Makes the content take the rest of the width and ensures scroll
})``;

function App() {
  return (
    <div className="sm:flex sm:justify-between sm:items-center sm:w-screen sm:h-screen w-full h-full bg-black">
      {/* Navbar for mobile devices */}
      <div className="sm:hidden sticky top-0 h-20 w-full z-50 bg-[#00000f8] backdrop-blur-lg rounded-lg">
        <Navbar />
      </div>

      {/* Left Sidebar (Fixed) */}
      <Leftsidebar />

      {/* Main Content (Between the sidebars) */}
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/shop" element={<Marketplace />} />
          <Route path="/profile" element={<Profile />} /> {/* Added Profile Route */}
        </Routes>
      </MainContent>

      {/* Right Sidebar (Fixed on right side) */}
      <Rightsidebar />

      {/* Footer for mobile devices */}
      <div className="sm:hidden sticky bottom-0 h-12 w-full z-50 bg-black border-t border-neutral-600">
        <Footer />
      </div>
    </div>
  );
}

export default App;
