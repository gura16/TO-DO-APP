import "./App.css";
import React, { useState, useEffect } from "react";
import image1 from "./image/image1.png";
import image2 from "./image/image2.png";
import image3 from "./image/image3.png";
import image5 from "./image/image5.svg";
import image6 from "./image/image6.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function formatSelectedDate(selectedDate) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (selectedDate.toDateString() === today.toDateString()) {
    return `Today ${selectedDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  } else if (selectedDate.toDateString() === tomorrow.toDateString()) {
    return `Tomorrow ${selectedDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  } else if (selectedDate.toDateString() === yesterday.toDateString()) {
    return `Yesterday ${selectedDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  } else {
    return selectedDate.toLocaleString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }
}

function App() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const options2 = { weekday: "short", day: "numeric" };
  const dateString = time.toLocaleDateString(undefined, options2);

  const options = { hour: "numeric", minute: "numeric", hour12: true };
  const timeString = time.toLocaleTimeString([], options);

  const [elements, setElements] = useState([]);
  const [inputText, setInputText] = useState("");

  function addEllement() {
    if (inputText !== " ") {
      const newElement = {
        id: Date.now(),
        time: selectedTime || new Date(),
        name: inputText,
      };
      setElements([...elements, newElement]);
      setInputText(" ");
      setSelectedTime(null);
    }
  }

  function handInputChange(event) {
    setInputText(event.target.value);
  }

  function handleDelete(id) {
    const updatedElements = elements.filter((element) => element.id !== id);
    setElements(updatedElements);
  }

  function handleDateSelection(date) {
    setSelectedTime(date);
    setShowDatePicker(false);
  }

  function toggleDatePicker() {
    setShowDatePicker(!showDatePicker);
  }

  return (
    <div>
      <h6>Todo</h6>
      <div className="card">
        <img src={image1} />
        <h1>{dateString}</h1>
        <h2>{timeString}</h2>
        <div className="inputdiv">
          <input
            className="input"
            onChange={handInputChange}
            type="text"
            placeholder="Note"
          />
          <div className="plusanddown">
            <div onClick={addEllement} className="plus">
              <img src={image2} />
            </div>
            <div onClick={toggleDatePicker} className="comedown">
              <img src={image3} />
            </div>
          </div>
        </div>
        {showDatePicker && (
          <DatePicker
            selected={selectedTime}
            onChange={handleDateSelection}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="Time"
          />
        )}
        {elements.map((element) => (
          <ChildComponent
            key={element.id}
            name={element.name}
            time={formatSelectedDate(element.time)}
            onDelete={() => handleDelete(element.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
function ChildComponent(props) {
  return (
    <div className="childcomponent">
      <div className="textdiv">
        <h3>{props.name}</h3>
        <p className="time">{props.time}</p>
      </div>
      <div className="imagediv">
        <img className="image6" src={image6} />
        <img onClick={props.onDelete} className="image5" src={image5} />
      </div>
    </div>
  );
}
