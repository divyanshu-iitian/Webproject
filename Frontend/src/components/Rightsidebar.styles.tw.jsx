import styled from "styled-components";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { API_URL } from "../App";
import profile from "/profile.png"
import { timeAgo } from "../App";

// Styled Components for Sidebar
const Rfsb = styled.div.attrs({
  className: "w-full md:w-[28rem] h-full bg-black text-white overflow-y-auto fixed right-0 border-l-2 border-gray-800 p-4 sm:block hidden", 
})``;

const SectionBox = styled.div.attrs({
  className: "border-2 border-gray-700 rounded-2xl p-3 md:p-4 space-y-3 w-full overflow-hidden bg-black",
})``;

const SectionItem = styled.div.attrs({
  className: "hover:bg-gray-800 p-3 rounded-lg cursor-pointer transition-all grid gap-3 md:gap-4", // Subtle gray hover
})``;

const GridWrapper = styled.div.attrs({
  className: "grid grid-cols-1 md:grid-cols-12 gap-3", // Reduced grid gap
})``;

const UserInfo = styled.div.attrs({
  className: "flex items-center space-x-3 md:col-span-3", // Reduced spacing
})``;

const ProfileImage = styled.div.attrs({
  className: "w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden", // Slight gray for profile image background
})``;

const UserName = styled.div.attrs({
  className: "md:col-span-6 flex items-center font-semibold text-white", // White text
})``;

const PostTime = styled.div.attrs({
  className: "text-sm text-gray-500 md:col-span-3 flex items-center justify-end", // Light gray for post time
})``;

const Content = styled.div.attrs({
  className: "space-y-1", // Reduced content spacing
})``;

const ShowMore = styled.div.attrs({
  className: "text-blue-500 text-sm font-semibold hover:underline cursor-pointer mt-2", // Highlighted text
})``;

// Styled Components for Leaderboard
const LeaderboardWrapper = styled.div.attrs({
  className: "border-t-2 border-gray-800 mt-6 pt-3 bg-black", // Black background
})``;

const TopThreeWrapper = styled.div.attrs({
  className: "flex justify-between space-x-2 mb-6", // Reduced space between cards
})``;

const TopCard = styled.div.attrs({
  className: "flex-1 flex flex-col items-center bg-gray-800 p-3 rounded-lg", // Subtle gray background for cards
})``;

const ParticipantImage = styled.div.attrs({
  className: "w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-700 overflow-hidden", // Slight gray for profile image background
})``;

const RankBox = styled.div.attrs({
  className: "bg-yellow-400 text-black font-bold text-lg w-6 h-6 flex items-center justify-center rounded-full -mt-5", // Bright yellow for rank
})``;

const LeaderboardList = styled.div.attrs({
  className: "space-y-2", // Reduced spacing between rows
})``;

const LeaderboardRow = styled.div.attrs({
  className: "flex items-center justify-between bg-gray-800 p-3 rounded-lg", // Subtle gray background for rows
})``;

const ParticipantDetails = styled.div.attrs({
  className: "flex-1 ml-3",
})``;

const ParticipantRank = styled.div.attrs({
  className: "text-blue-400 font-bold", // Blue for rank
})``;

// Data for Trending Topics
// const trendingTopics = [
//   {
//     postedBy: "Bharat",
//     postedAt: "2 hours ago",
//     caption: "Characterless Lady NAYANTHARA trending all over social media today!",
//     image: "https://i.pinimg.com/736x/0e/50/fa/0e50fa227d634b7c0825f8b68d56f85c.jpg",
//   },
//   {
//     postedBy: "Arjun",
//     postedAt: "1 day ago",
//     caption: "Pushpa 2 trailer released, the excitement is real!",
//     image: "https://stat4.bollywoodhungama.in/wp-content/uploads/2023/04/Pushpa-2-%E2%80%93-The-Rule.jpg",
//   },
// ];

// Data for Leaderboard
const topThree = [
  { name: "Yash Desai", points: "314,109", rank: 1, image: "https://via.placeholder.com/100?text=Y1" },
  { name: "Yash Parte", points: "283,954", rank: 2, image: "https://via.placeholder.com/100?text=Y2" },
  { name: "Sidharth Acharya", points: "233,342", rank: 3, image: "https://via.placeholder.com/100?text=Y3" },
];

const leaderboardData = [
  { name: "Nabil Akhtar", caption: "Symbiosis Institute", rank: 4, image: "https://via.placeholder.com/50?text=N" },
  { name: "Akash Patel", caption: "Shailesh J. Mehta School", rank: 5, image: "https://via.placeholder.com/50?text=A" },
  { name: "Marc Fernandes", caption: "IIT Bombay", rank: 6, image: "https://via.placeholder.com/50?text=M" },
];

export default function Rightsidebar() {
  const [loading, setLoading] = useState(false);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [error, setError] = useState(null);
  async function fetchData(){
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}/v1/trending`);
      const data = response.data;
      if (data.success == true){
        setTrendingPosts(data.message);
      }
      setLoading(false);
    } catch(error){
      console.log(error);
      setError(error);
    }
  }
  useEffect(()=>{
    fetchData();
  }, []);
  return (
    <Rfsb>
      <div className="space-y-6">
        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Search"
            className=" text-lg bg-[#2b2d2f] placeholder-gray-500 rounded-full p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Trending Topics Section */}
        <SectionBox>
          <p className="text-white text-2xl font-bold">What's happening</p>
          {trendingPosts.map((post, index) => (
            <SectionItem key={index}>
              <GridWrapper>
                <UserInfo>
                  <ProfileImage>
                    <img
                      src={profile}
                      alt="User"
                      className="bg-black w-full h-full object-cover rounded-full"
                    />
                  </ProfileImage>
                </UserInfo>
                <UserName>{post.userId}</UserName>
                <PostTime>{timeAgo(post.createdAt)}</PostTime>
              </GridWrapper>
              <Content>
                <p className="text-gray-400 mt-2 line-clamp-2">{post.caption}</p>
              </Content>
            </SectionItem>
          ))}
          <ShowMore>Show more</ShowMore>
        </SectionBox>

        {/* Leaderboard Section */}
        <LeaderboardWrapper>
          <p className="text-white text-2xl font-bold mb-4">Leaderboard</p>
          <TopThreeWrapper>
            {topThree.map((participant, index) => (
              <TopCard key={index}>
                <ParticipantImage>
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                </ParticipantImage>
                <RankBox>{participant.rank}</RankBox>
                <div className="text-blue-300 font-bold mt-2">{participant.name}</div>
                <div className="text-sm text-gray-500">{participant.points} Pts</div>
              </TopCard>
            ))}
          </TopThreeWrapper>
          <LeaderboardList>
            {leaderboardData.map((participant, index) => (
              <LeaderboardRow key={index}>
                <ParticipantImage>
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                </ParticipantImage>
                <ParticipantDetails>
                  <div className="text-blue-300 font-bold">{participant.name}</div>
                  <div className="text-gray-500 text-sm">{participant.caption}</div>
                </ParticipantDetails>
                <ParticipantRank>#{participant.rank}</ParticipantRank>
              </LeaderboardRow>
            ))}
          </LeaderboardList>
        </LeaderboardWrapper>
      </div>
    </Rfsb>
  );
}
