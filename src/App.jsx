import React, { useState } from "react";
import DragAndDrop from "./Components/DragAndDrop";
import Notification from "./Components/Notification";
import Card from "./Components/Card";
import ExportData from "./Components/ExportData";

import Video from "./Components/VIdeo";
import AudioPlayer from "./Components/AudioPlayer";
import Toast, { showToast } from "./Components/Toast";
import SomeComponent from "./Components/SomeComponent";

const App = () => {
  const data = [
    { name: "John", age: 28, job: "Developer" },
    { name: "Jane", age: 32, job: "Designer" },
    { name: "Alice", age: 24, job: "Data Scientist" },
    { name: "Bob", age: 40, job: "Manager" },
    { name: "Charlie", age: 29, job: "Engineer" },
    { name: "Dave", age: 35, job: "Architect" },
    { name: "Eve", age: 26, job: "Product Manager" },
    { name: "Frank", age: 38, job: "Sales Executive" },
    { name: "Grace", age: 31, job: "Marketing Specialist" },
    { name: "Hank", age: 45, job: "Operations Lead" },
    { name: "Ivy", age: 22, job: "Software Engineer" },
    { name: "Jake", age: 33, job: "UX Designer" },
    { name: "Kelly", age: 28, job: "Business Analyst" },
    { name: "Leo", age: 37, job: "Scrum Master" },
    { name: "Mia", age: 30, job: "HR Specialist" },
    { name: "Nathan", age: 41, job: "Finance Manager" },
    { name: "Olivia", age: 27, job: "Legal Consultant" },
    { name: "Paul", age: 34, job: "IT Support" },
    { name: "Quincy", age: 29, job: "Security Analyst" },
    { name: "Rachel", age: 36, job: "Project Manager" },
    { name: "Steve", age: 39, job: "Operations Manager" },
    { name: "Tina", age: 25, job: "Content Strategist" },
    { name: "Uma", age: 23, job: "QA Engineer" },
    { name: "Victor", age: 42, job: "Technical Lead" },
    { name: "Wendy", age: 32, job: "Brand Manager" },
    { name: "Xander", age: 28, job: "Consultant" },
    { name: "Yara", age: 35, job: "PR Specialist" },
    { name: "Zane", age: 30, job: "Cloud Architect" },
  ];
  const handleClick = () => {
    showToast("This is showing message", "error");
  };

  const myCustomStyles = {
    card: {
      maxWidth: "500px",
      backgroundColor: "#f0f0f0",
    },
    title: {
      color: "#007bff",
      fontSize: "1.5rem",
    },
    content: {
      fontStyle: "italic",
    },
  };

  return (
    <div className="p-container">
      <DragAndDrop accept={[".jpg", ".mp4"]} />
      <Notification
        duration={1000}
        message="Your have a notification"
        type="success"
        position="bottom-right"
      />

      <Card
        imageUrl="./tx_logo.png"
        title="Karan"
        content="Hi how are you and what are you doing"
        customStyles={myCustomStyles}
      ></Card>
      <Toast />
      <ExportData data={data} fileName={"myFile"} allowedFormats={["xlsx"]} />

      <button onClick={handleClick}>Show toast</button>

      <SomeComponent />

      <Video
        isYouTube={true}
        controls={false}
        light={"./tx_logo.png"}
        width={"500px"}
        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      />

      <AudioPlayer src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3" />

      <style jsx>{`
        .p-container {
          display: grid;
          grid-template-columns: 2fr;
          grid-gap: 20px;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default App;
