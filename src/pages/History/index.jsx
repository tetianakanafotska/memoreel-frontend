import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "@context";
import { Loading, Board } from "@components";
import usersService from "@services/users.service";
import styles from "./index.module.sass";

function History() {
  const { user } = useContext(AuthContext);
  const [allBoards, setAllboards] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      usersService
        .getAllBoards(user._id)
        .then((res) => {
          setAllboards(res.data);
          setLoading(false);
        })
        .catch((error) => console.log("Error fetching boards" + error));
    }
  }, [user]);

  return (
    <div className={styles.history}>
      {loading ? (
        <Loading />
      ) : (
        allBoards &&
        (allBoards.length === 0 ? (
          <div id="errorMessage">No boards created yet!</div>
        ) : (
          allBoards
            .slice()
            .reverse()
            .map((board) => {
              return (
                board.assets.length !== 0 && (
                  <>
                  <Board key={board._id} board={board} />
                  </>
                )
              );
            })
        ))
      )}
    </div>
  );
}

export default History;
