import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context";
import { MediaItem, Button } from "@components";
import boardStyles from "../components/styles/Board.module.sass";
import usersService from "../services/users.service";
import { X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import historyStyles from "./styles/History.module.sass";

function History() {
  const { user } = useContext(AuthContext);
  const [allBoards, setAllboards] = useState([]);

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  };

  useEffect(() => {
    if (user) {
      usersService
        .getAllBoards(user._id)
        .then((res) => {
          if (res.data.length !== 0) {
            setAllboards(res.data);
            console.log("allboards", res.data);
          }
        })
        .catch((error) => console.log("Error fetching boards" + error));
    }
  }, [user]);

  return (
    <div className={historyStyles.history}>
      <div className={historyStyles.dashboardBtn}>
        <Button to={"/dashboard"}>Dashboard</Button>
      </div>

      {allBoards &&
        allBoards.length >= 0 &&
        (allBoards.length === 0
          ? "No board to show yet!"
          : allBoards.reverse().map((board) => {
              return (
                <div key={board._id} className={historyStyles.reel}>
                  <h2 className={historyStyles.date}>
                    {formatDate(board.createdAt)}
                  </h2>
                  <div className={boardStyles.board}>
                    {board.assets.length > 0 &&
                      board.assets.reverse().map((asset) => (
                        <div key={asset._id}>
                          <MediaItem asset={asset} enableEditing={false} />
                        </div>
                      ))}
                  </div>
                </div>
              );
            }))}
    </div>
  );
}

export default History;
