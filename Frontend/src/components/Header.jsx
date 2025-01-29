import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Events</h1>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background: "linear-gradient(90deg, #1DA1F2, #8E44AD)",
    color: "#FFFFFF",
    fontSize: "24px",
  },
  title: {
    fontWeight: "bold",
  },
};

export default Header;
