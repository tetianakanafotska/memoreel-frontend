import React, { useState, useContext, useEffect } from "react";
import {
  PopUpButtons,
  MediaForm,
  MediaItem,
  Marquee,
  Loading,
} from "@components";
import { AuthContext } from "@context";
import assetsService from "../services/assets.service";
import usersService from "../services/users.service";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles/Dashboard.module.sass";
import boardStyles from "../components/styles/Board.module.sass";
import popUpButtonStyles from "@components/PopUpButtons/PopUpButtons.module.sass";
import { PlusLg } from "react-bootstrap-icons";
import classNames from "classnames";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openMediaForm, setOpenMediaForm] = useState(false);
  const [assetType, setAssetType] = useState(null);
  const [allAssets, setAllAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteAsset = (assetId) => {
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

  const editAsset = (assetId, editedContent) => {
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

  const handleOpenPopUp = () => {
    setOpenPopUp(!openPopUp);
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().slice(0, 10);
    if (user) {
      usersService.getCurrentBoard(user._id, currentDate).then((res) => {
        if (res.data.length !== 0) {
          setAllAssets(res.data[0].assets);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    }
  }, [user]);

  return loading ? (
    <>
      <Loading />
    </>
  ) : (
    <section className={styles.dashboard}>
      <Marquee
        phrases={[
          "For days worth remembering",
          user.name
            ? `What's on your mind today, ${user.name} ?`
            : "What's on your mind today?",
          "What made you laugh today?",
        ]}
        className="mt-3 mb-5"
      />

      <Container fluid>
        <Row>
          <Col>
            <div className={styles.dashboard_addContent}>
              <button
                onClick={handleOpenPopUp}
                className={classNames(popUpButtonStyles.popUpButton_addButton, {
                  [popUpButtonStyles.popUpButton_addButton_on]: openPopUp,
                })}
              >
                <PlusLg size="20" />
                <span
                  className={classNames("", {
                    [popUpButtonStyles.hideText]: openPopUp,
                  })}
                >
                  {" "}
                  Add Media
                </span>
              </button>

              {openPopUp && (
                <PopUpButtons
                  setAssetType={setAssetType}
                  setOpenMediaForm={setOpenMediaForm}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {openMediaForm && (
        <Container fluid>
          <Row>
            <Col md="8" lg="6" className="mx-auto mt-3">
              <div className={styles.dashboard_mediaForm}>
                <MediaForm
                  assetType={assetType}
                  setOpenPopUp={setOpenPopUp}
                  setOpenMediaForm={setOpenMediaForm}
                  setAllAssets={setAllAssets}
                  deleteAsset={deleteAsset}
                  //boardId={boardId}
                  userId={user._id}
                />
              </div>
            </Col>
          </Row>
        </Container>
      )}

      <div className={boardStyles.board}>
        {allAssets.length > 0 ? (
          allAssets
            .slice()
            .reverse()
            .map((asset) => (
              <div key={asset._id}>
                <MediaItem
                  asset={asset}
                  editAsset={editAsset}
                  deleteAsset={deleteAsset}
                  enableEditing={true}
                />
              </div>
            ))
        ) : (
          <div className="d-flex align-center justify-content-center flex-row">
            <p className="d-block mx-auto text-center">
              Create content for today
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
