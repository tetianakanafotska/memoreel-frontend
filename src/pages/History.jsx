import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@context";
import { Board, MediaItem } from "@components";
import boardStyles from "../components/styles/Board.module.sass";
import usersService from "../services/users.service";
import { X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function History() {
  const { user } = useContext(AuthContext);
  const [allBoards, setAllboards] = useState([]);
  //const [allAssets, setAllAssets] = useState([]);

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
    <>
      <div className="closeBtn">
        <Link to="/dashboard">{<X size="40" />}</Link>
      </div>
      {allBoards &&
        allBoards.length >= 0 &&
        (allBoards.length === 0
          ? "No board to show yet!"
          : allBoards.reverse().map((board) => {
              return (
                <div key={board._id}>
                  <h3>Board {board.createdAt}</h3>
                  <div className={boardStyles.board}>
                    {board.assets.length > 0 &&
                      board.assets.reverse().map((asset) => (
                        <div key={asset._id}>
                          <MediaItem asset={asset} />
                        </div>
                      ))}
                  </div>
                </div>
              );
            }))}
    </>
  );
}

export default History;
