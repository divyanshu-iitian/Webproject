import React from "react";

const Sidebar = () => {
  const trendingTopics = ["#Event1", "#Event2", "#Event3"];

  return (
    <aside style={styles.sidebar}>
      <h3 style={styles.title}>Trending Topics</h3>
      <ul style={styles.list}>
        {trendingTopics.map((topic, index) => (
          <li key={index} style={styles.item}>
            {topic}
          </li>
        ))}
      </ul>
    </aside>
  );
};

const styles = {
  sidebar: {
    padding: "20px",
    backgroundColor: "#333",
    borderRadius: "15px",
    color: "#FFFFFF",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: "20px",
    marginBottom: "10px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  item: {
    fontSize: "16px",
    margin: "10px 0",
    padding: "10px",
    backgroundColor: "#444",
    borderRadius: "10px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s, background-color 0.2s",
  },
};

export default Sidebar;
