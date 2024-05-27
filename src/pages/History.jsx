import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context";
import axios from "axios";
import authService from "../services/auth.service";
import { Board } from "@components";

function History() {
  const { user } = useContext(AuthContext);
  const [allBoards, setAllboards] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (user) {
      const userId = user._id;
      const start = "2023-05-01";
      const end = "2024-12-12";

      axios
        .get(
          `${
            import.meta.env.BACKEND_URL || "http://localhost:5005"
          }/users/${userId}/boards?start=${start}&end=${end}`,
          {
            headers: { Authorization: ` Bearer ${token}` },
          }
        )
        .then((res) => {
          setAllboards(res.data);
          console.log(res);
        })
        .catch((error) => console.error("Oops", error));
    }
  }, [user]);

  return (
    <>
      {allBoards &&
        allBoards.length >= 0 &&
        (allBoards.length === 0
          ? "No board to show yet!"
          : allBoards.map((board, i) => {
              return (
                <div key={board._id}>
                  <h3>Board {i}</h3>
                  <Board board={board} />
                  {/* {Object.entries(board.boardContent).map(
										([key, value]) => {
											return <>
											{value.type === "image" && (
												<div className="boardImage" key={key}>
													<img src={value.content} alt={key} />
												</div>
											)}
											{value.type === "text" && (
												<div className="boardNote" key={key}>
													<p>{value}</p>
												</div>
											)}
												</>
										}
									)} */}
                </div>
              );
            }))}
    </>
  );
}

export default History;
