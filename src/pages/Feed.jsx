import React, { useEffect, useState } from "react";
import { MediaItem } from "@components";
import boardStyles from "../components/styles/Board.module.sass";
import boardsService from "../services/boards.service";
import { X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Feed() {
  const [allBoards, setAllboards] = useState([]);

  useEffect(() => {
    boardsService
      .getPublished()
      .then((res) => {
        if (res.data.length !== 0) {
          setAllboards(res.data);
          console.log("allboards", res.data);
        }
      })
      .catch((error) => console.log("Error fetching boards" + error));
  }, []);

  return (
    <>
      <div className="closeBtn">
        <Link to="/dashboard">{<X size="40" />}</Link>
      </div>
      {allBoards &&
        allBoards.length >= 0 &&
        (allBoards.length === 0
          ? "No published boards yet!"
          : allBoards.reverse().map((board) => {
              return (
                <div key={board._id}>
                  <h3>Board {board.createdAt}</h3>
                  <h4>Created by {board.userId.name}</h4>
                  <div className={boardStyles.board}>
                    {board.assets.length > 0 &&
                      board.assets.map((asset) => (
                        <div key={asset._id}>
                          <MediaItem asset={asset} enableEditing={false} />
                        </div>
                      ))}
                  </div>
                </div>
              );
            }))}
    </>
  );
}

export default Feed;
