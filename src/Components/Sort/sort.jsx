import React, { useState, useEffect, useRef } from "react";
import "./sort.css";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function Sort() {
  // ============ FUNCTION TO GENERATE VOICE ============
  const readOut = (message) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.volume = 1;
    const allVoices = speechSynthesis.getVoices();
    speech.voice = allVoices[7];
    window.speechSynthesis.speak(speech);
  };

  // ============ USESTATES ============
  const [numbers, setNumbers] = useState([]);
  const [sortedNumbers, setSortedNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [answer, setAnswer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ============ CALLING FUNCTION TO GENERATE RANDOM NUMBERS ============
    generateNumbers();
    // ============ CALLING FUNCTION TO GENERATE ALERT ============
    swal({
      title: "Let's Play",
      text: "Help Rabbit to reach the carrot",
      button: "Aww yiss!",
    });
    // ============ CALLING FUNCTION TO GENERATE VOICE ============
    readOut("Help Rabbit to reach the carrot");
  }, []);
  // ============ FUNCTION TO GENERATE RANDOM NUMBERS ============
  const generateNumbers = () => {
    const randomNumbers = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 100)
    );
    setNumbers(randomNumbers);
    setSortedNumbers([]);
  };

  // ============ FUNCTION TO HANDLE DRAG OPERATION ============
  const handleDragStart = (e, number) => {
    e.dataTransfer.setData("text/plain", number);
  };

  // ============ FUNCTION TO HANDLE DROP OPERATION ============
  const handleDrop = (e, index) => {
    e.preventDefault();
    const droppedNumber = parseInt(e.dataTransfer.getData("text/plain"), 10);

    const updatedSortedNumbers = [...sortedNumbers];
    if (updatedSortedNumbers.includes(droppedNumber)) return;

    // ============ REMOVING DRAGGED NUMBER FROM ORIGINAL ARRAY ============
    const draggedNumberIndex = numbers.indexOf(droppedNumber);
    if (draggedNumberIndex !== -1) {
      const updatedNumbers = [...numbers];
      updatedNumbers.splice(draggedNumberIndex, 1);
      setNumbers(updatedNumbers);
    }

    // ============ ADDING DRAGGED NUMBER TO SORTED ARRAY ============
    updatedSortedNumbers.splice(index, 0, droppedNumber);
    setSortedNumbers(updatedSortedNumbers);

    // ============ SHOWING "CHECK RESULT" BUTTON IF ARRAY IS FULL============
    if (updatedSortedNumbers.length === 5) {
      setShowResult(true);
      if (isAscendingOrder(updatedSortedNumbers)) {
        setAnswer(true);
      }
    }
  };

  // ============ FUNCTION TO HANDLE DRAGOVER OPERATION ============
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  // ============ FUNCTION TO SORT THE OUTPUT ARRAY ============
  const isAscendingOrder = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        return false;
      }
    }
    return true;
  };

  return (
    <div>
      <img
        src="https://i.ytimg.com/vi/5WA2DSCA2BU/maxresdefault.jpg"
        alt=""
        className="jungle"
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          top: "0",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="contain">
          Arrange the numbers in Ascending Order and put in the Basket
        </div>
        {/* ============ USING MAP TO SHOW 5 RANDOM NUMBERS ============ */}
        <div className="inner-contain">
          {numbers.map((number, index) => (
            <div
              className="numbers"
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, number, index)}
            >
              {number}
            </div>
          ))}
        </div>
        <button
          style={{ display: showResult ? "flex" : "none" }}
          className="check"
          onClick={() => {
            navigate("/result", { state: { answer } });
            if (answer) {
              readOut("Yayy! Correct Answer. Rabbit got the carrot");
            } else {
              readOut("Oops! Wrong Answer. Rabbit did not got the carrot");
            }
          }}
        >
          Check Answer
        </button>
      </div>

      <div className="outer-div">
        <img
          src="https://weddingkj.s3.ap-south-1.amazonaws.com/website/rabbit2-removebg-preview.png"
          alt=""
          className="rabbit bounce2"
        />
        {/* ============ USING MAP TO SHOW BASKETS WITH DROPPED NUMBER ============ */}
        <div className="inner-contain-after">
          {sortedNumbers.map((number, index) => (
            <div
              key={index}
              className="sorted"
              draggable
              onDragStart={(e) => handleDragStart(e, number, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
            >
              <div className="numbers2">{number}</div>
              <img
                src="https://weddingkj.s3.ap-south-1.amazonaws.com/website/basket-removebg-preview.png"
                alt=""
                className="stone1"
              />
            </div>
          ))}
          {/* ============ USING MAP TO SHOW EMPTY BASKETS ============ */}

          {[...Array(5 - sortedNumbers.length)].map((_, index) => (
            <div
              key={index}
              onDrop={(e) => handleDrop(e, sortedNumbers.length + index)}
              onDragOver={handleDragOver}
              className="unsorted"
            >
              <img
                src="https://weddingkj.s3.ap-south-1.amazonaws.com/website/basket-removebg-preview.png"
                alt=""
                className="stone1"
              />
            </div>
          ))}
        </div>

        <img
          src="https://weddingkj.s3.ap-south-1.amazonaws.com/website/carrot-removebg-preview.png"
          alt=""
          className="carrot pulse"
        />
      </div>
    </div>
  );
}

export default Sort;
