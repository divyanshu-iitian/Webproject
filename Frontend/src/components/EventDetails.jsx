import React from "react";

const EventDetails = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to Events!</h2>
      <p style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos
        fuga quisquam consectetur. Nemo ut doloremque aut tempora sint corrupti
        cupiditate odio ex, sequi unde cumque repellat aspernatur sit recusandae
        ea.
      </p>
      <button style={styles.button}>Register Now</button>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#222831",
    borderRadius: "15px",
    textAlign: "center",
    color: "#FFFFFF",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontSize: "28px",
    marginBottom: "15px",
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.5",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    background: "linear-gradient(90deg, #8E44AD, #3498DB)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default EventDetails;
