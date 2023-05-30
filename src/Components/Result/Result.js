import React from "react";
import "./result.css";
import { useNavigate, useLocation } from "react-router-dom";
function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <img
        src="https://i.ytimg.com/vi/5WA2DSCA2BU/maxresdefault.jpg"
        alt=""
        className="jungle"
      />
      {/* ============= SHOWING WRONG ANSWER IF ANSWER IS FALSE ELSE CORRECT ANSWER =============  */}
      {!location.state.answer ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "0",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              margin: "50px 0px",
              fontWeight: "600",
              fontSize: "25px",
              fontFamily: "cursive",
            }}
          >
            Oops! Wrong Answer. Rabbit did not got the carrot !!
          </div>
          <button className="try" onClick={() => navigate("/")}>
            Try Again
          </button>
          <img
            src="https://weddingkj.s3.ap-south-1.amazonaws.com/website/ezgif.com-webp-to-jpg-removebg-preview.png"
            alt=""
            style={{ marginTop: "45px" }}
          />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "0",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              margin: "50px 0px",
              fontWeight: "600",
              fontSize: "25px",
              fontFamily: "cursive",
            }}
          >
            Yayy! Correct Answer. Rabbit got the carrot !!
          </div>
          <button className="try" onClick={() => navigate("/")}>
            Reset
          </button>
          <img
            src="https://weddingkj.s3.ap-south-1.amazonaws.com/website/happy-rabbit-removebg-preview.png"
            alt=""
            style={{ marginTop: "25px", height: "500px" }}
          />
        </div>
      )}
    </div>
  );
}

export default Result;
