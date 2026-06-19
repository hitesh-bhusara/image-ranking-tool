import { useEffect, useState } from "react";
import api from "../api/api";

function LeaderboardPage() {

  const [images, setImages] = useState([]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  async function loadLeaderboard() {

    const res = await api.get(
      "/ratings/leaderboard"
    );

    setImages(res.data);
  }

  return (
    <div>

      <h1>Leaderboard</h1>

      <table border="1">

        <thead>
          <tr>
            <th>Rank</th>
            <th>Image</th>
            <th>Rating</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
          </tr>
        </thead>

        <tbody>

          {images.map((img, index) => (

            <tr key={img.id}>

              <td>{index + 1}</td>

              <td>

                <img
                  src={`http://localhost:5000/uploads/${img.imagePath}`}
                  width="100"
                />

              </td>

              <td>{img.rating.toFixed(2)}</td>

              <td>{img.wins}</td>

              <td>{img.losses}</td>

              <td>{img.draws}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default LeaderboardPage;