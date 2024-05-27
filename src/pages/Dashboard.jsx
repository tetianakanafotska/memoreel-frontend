import React, { useState, useContext, useEffect } from "react";
import PopUpButtons from "../components/PopUpButtons";
import MediaForm from "../components/MediaForm";
import MediaItem from "../components/MediaItem";
import { AuthContext } from "@context";
import assetsService from "../services/assets.service";
import usersService from "../services/users.service";
import placeholder from "@img/placeholder.jpg";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles/Dashboard.module.sass";
import boardStyles from "../components/styles/Board.module.sass";
import classNames from "classnames";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [boardId, setBoardId] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openMediaForm, setOpenMediaForm] = useState(false);
  const [assetType, setAssetType] = useState(null);
  const [allAssets, setAllAssets] = useState([]);
  const [addButton, setAddButton] = useState(false);

  const handleDeleteAsset = (assetId) => {
    assetsService
      .delete(assetId)
      .then((res) => {
        setAllAssets((prevAssets) =>
          prevAssets.filter((asset) => asset._id !== assetId)
        );
      })
      .catch((err) => {
        console.error("Error deleting asset", err);
      });
  };

  const handleEditAsset = (assetId, editedContent) => {
    console.log("editedContent", editedContent);
    assetsService
      .put(assetId, {
        content: editedContent,
      })
      .then((res) => {
        const updatedAsset = res.data;
        setAllAssets((prevAssets) =>
          prevAssets.map((asset) =>
            asset._id === assetId ? updatedAsset : asset
          )
        );
      })
      .catch((err) => {
        console.error("Error updating asset", err);
      });
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    console.log("THE DATE", currentDate);
    if (user) {
      usersService.getCurrentBoard(user._id, currentDate).then((res) => {
        if (res.data.length !== 0) {
          setAllAssets(res.data[0].assets);
          setBoardId(res.data[0]._id);
          console.log("Existing board found. BoardID:", res.data[0]._id);
        } else {
          setAllAssets([]);
          setBoardId(null);
        }
      });
    }
  }, [user]);

  return (
    <section className={styles.dashboard}>
      <Container fluid>
        <Row>
          <Col className="d-flex flex-column align-items-center justify-content-center my-5">
            {user && (
              <div className="profilePic mb-2">
                <img
                  src={user.profileImg || placeholder}
                  onError={(e) => {
                    e.target.src = placeholder;
                  }}
                  alt={user.name}
                />
              </div>
            )}
            <h2>{user ? `Hello, ${user.name}!` : "Hello!"}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>What's on your mind today?</h3>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className={styles.dashboard_addContent}>
              <button
                onClick={() => {
                  setOpenPopUp(!openPopUp);
                  setAddButton((prev) => (!prev ? true : false));
                }}
                className={classNames(styles.dashboard_addContent_addBtn, {
                  [styles.dashboard_addContent_addBtn_on]: addButton,
                })}
              >
                +
              </button>

              {openPopUp && (
                <PopUpButtons
                  setAssetType={setAssetType}
                  setOpenMediaForm={setOpenMediaForm}
                  setOpenPopUp={setOpenPopUp}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {openMediaForm && (
        <MediaForm
          assetType={assetType}
          setOpenPopUp={setOpenPopUp}
          setOpenMediaForm={setOpenMediaForm}
          setAllAssets={setAllAssets}
          boardId={boardId}
          userId={user._id}
        />
      )}

      <div className={boardStyles.board}>
        {allAssets.length > 0 ? (
          allAssets.map((asset) => (
            <div key={asset._id}>
              <MediaItem
                asset={asset}
                handleDeleteAsset={handleDeleteAsset}
                handleEditAsset={handleEditAsset}
              />
            </div>
          ))
        ) : (
          <p>Create content for today</p>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
