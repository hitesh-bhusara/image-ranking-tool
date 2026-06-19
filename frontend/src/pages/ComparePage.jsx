// return (
//   <div className="container">

//     <h1>Beauty Preference Trainer</h1>

//     <div className="images">

//       <div className="card">

//         <img
//           src={`http://localhost:5000/images/${pair.left.imagePath}`}
//           alt=""
//         />

//       </div>

//       <div className="card">

//         <img
//           src={`http://localhost:5000/images/${pair.right.imagePath}`}
//           alt=""
//         />

//       </div>

//     </div>

//     <div className="buttons">

//       <button
//         className="left-btn"
//         onClick={() => vote("LEFT")}
//       >
//         ← Left Better
//       </button>

//       <button
//         className="draw-btn"
//         onClick={() => vote("DRAW")}
//       >
//         Equal
//       </button>

//       <button
//         className="right-btn"
//         onClick={() => vote("RIGHT")}
//       >
//         Right Better →
//       </button>

//     </div>

//   </div>
// );


import { useEffect, useState } from "react";
import api from "../api/api";
import '../styles/compare.css';

function ComparePage() {

  const [pair, setPair] = useState(null);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [stats, setStats] = useState(null);

  async function loadStats() {

    const res = await api.get("/stats");

    setStats(res.data);
  }

  async function loadPair() {
    try {

      const res = await api.get("/comparisons/pair");

      setPair(res.data);

      await loadStats();

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadPair();
  }, []);



  useEffect(() => {

    function handleKeyPress(event) {

      if (!pair) return;

      switch (event.key.toLowerCase()) {

        case "a":
          vote("LEFT");
          break;

        case "s":
          vote("DRAW");
          break;

        case "d":
          vote("RIGHT");
          break;

        case " ":
          event.preventDefault();
          loadPair();
          break;

        default:
          break;
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyPress
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyPress
      );
    };

  }, [pair]);


  async function vote(result) {

    await api.post("/comparisons/vote", {
      leftImageId: pair.left.id,
      rightImageId: pair.right.id,
      result
    });
    setComparisonCount(prev => prev + 1);
    loadPair();
  }

  if (!pair) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">

      <h1 className="title">Beauty Ranker</h1>
      {stats && (

        <div className="stats">

          <p>
            Images:
            {stats.imageCount}
          </p>

          <p>
            Comparisons:
            {stats.comparisonCount}
          </p>

          <p>
            Avg/Image:
            {stats.avgComparisons}
          </p>

        </div>

      )}

      <h3> Session Comparisons: {comparisonCount} </h3>
      <div className="images">

        <div className="card">
          <img
            src={`http://localhost:5000/images/${pair.left.imagePath}`}

            width="300"
          />
          <p>Rating: {pair.left.rating.toFixed(0)}</p>
        </div>

        <div className="card">
          <img
            src={`http://localhost:5000/images/${pair.right.imagePath}`}
            width="300"
          />
          <p>Rating: {pair.right.rating.toFixed(0)}</p>
        </div>

      </div>

      <br />
      <div className="buttons">
        <button className="left-btn" onClick={() => vote("LEFT")} > ← Left Better (A) </button>

        <button className="draw-btn" onClick={() => vote("DRAW")} > Equal </button>

        <button className="right-btn" onClick={() => vote("RIGHT")} > Right Better (D) → </button>
        <button className="skip-btn" onClick={loadPair} > Skip Pair (Space) </button>
      </div>
    </div>
  );
}

export default ComparePage;