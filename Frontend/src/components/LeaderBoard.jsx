import React, { useState } from "react";
import styled from "styled-components";

// Leaderboard container for desktop
const LeaderboardWrapper = styled.div.attrs({
  className: "w-full md:w-2/3 h-full bg-gray-900 text-white overflow-y-auto rounded-xl shadow-md p-4 md:static md:mt-4",
})``;

// Back button for mobile
const BackButton = styled.div.attrs({
  className: "bg-blue-500 text-white p-2 rounded-full text-center w-20 cursor-pointer mb-4",
})``;

// Leaderboard table styling
const TableWrapper = styled.div.attrs({
  className: "overflow-x-auto",
})``;

const Table = styled.table.attrs({
  className: "table-auto w-full text-left border-separate border-spacing-y-2",
})``;

const TableHeader = styled.th.attrs({
  className: "text-blue-400 font-semibold text-sm px-4 py-2 bg-gray-800",
})``;

const TableRow = styled.tr.attrs({
  className: "bg-gray-800 hover:bg-gray-700 transition-all rounded-lg",
})``;

const TableData = styled.td.attrs({
  className: "text-gray-300 text-sm px-4 py-2",
})``;

const LeaderboardTitle = styled.div.attrs({
  className: "text-2xl font-bold text-blue-400 mb-6",
})``;

export default function Leaderboard() {
  const [isMobileView, setIsMobileView] = useState(false);

  const leaderboardData = [
    { name: "Nabil Akhtar", institute: "Symbiosis Institute", rank: 4, points: 231443, certificates: 273 },
    { name: "Akash Patel", institute: "Shailesh J. Mehta School", rank: 5, points: 219309, certificates: 232 },
    { name: "Marc Fernandes", institute: "IIT Bombay", rank: 6, points: 215800, certificates: 220 },
  ];

  return (
    <>
      {/* Desktop view */}
      <div className="hidden md:block">
        <LeaderboardWrapper>
          <LeaderboardTitle>Leaderboard</LeaderboardTitle>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Participant Name</TableHeader>
                  <TableHeader>Institute</TableHeader>
                  <TableHeader>#Rank</TableHeader>
                  <TableHeader>Points</TableHeader>
                  <TableHeader>Certificates</TableHeader>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((participant, index) => (
                  <TableRow key={index}>
                    <TableData>{participant.name}</TableData>
                    <TableData>{participant.institute}</TableData>
                    <TableData>#{participant.rank}</TableData>
                    <TableData>{participant.points}</TableData>
                    <TableData>{participant.certificates}</TableData>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        </LeaderboardWrapper>
      </div>

      {/* Mobile view */}
      <div className="block md:hidden">
        {isMobileView ? (
          <LeaderboardWrapper>
            <BackButton onClick={() => setIsMobileView(false)}>Back</BackButton>
            <LeaderboardTitle>Leaderboard</LeaderboardTitle>
            <TableWrapper>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Participant Name</TableHeader>
                    <TableHeader>#Rank</TableHeader>
                    <TableHeader>Points</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((participant, index) => (
                    <TableRow key={index}>
                      <TableData>{participant.name}</TableData>
                      <TableData>#{participant.rank}</TableData>
                      <TableData>{participant.points}</TableData>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
          </LeaderboardWrapper>
        ) : (
          <div
            className="bg-blue-500 text-white p-4 rounded-xl text-center cursor-pointer"
            onClick={() => setIsMobileView(true)}
          >
            View Leaderboard
          </div>
        )}
      </div>
    </>
  );
}
