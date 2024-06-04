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
    <Loading />
  ) : (
    <>
      {openMediaForm && (
        <div className={styles.dashboard_mediaForm}>
          <div className={styles.dashboard_mediaForm_bgr}>
            <MediaForm
              assetType={assetType}
              setOpenPopUp={setOpenPopUp}
              setOpenMediaForm={setOpenMediaForm}
              setAllAssets={setAllAssets}
              deleteAsset={deleteAsset}
              userId={user._id}
            />
          </div>
        </div>
      )}
      <section className={styles.dashboard}>
        <Marquee
          phrases={[
            "For days worth remembering",
            user
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
                  onClick={() => {
                    handleOpenPopUp();
                    setOpenMediaForm((prev) => (prev ? false : false));
                  }}
                  className={classNames(
                    popUpButtonStyles.popUpButton_addButton,
                    {
                      [popUpButtonStyles.popUpButton_addButton_on]: openPopUp,
                    }
                  )}
                >
                  <PlusLg size="20" className="mx-1" />
                  <span
                    className={classNames("mx-1", {
                      [popUpButtonStyles.hideText]: openPopUp,
                    })}
                  >
                    Add Media
                  </span>
                </button>

                {openPopUp && (
                  <PopUpButtons
                    assetType={assetType}
                    setAssetType={setAssetType}
                    setOpenMediaForm={setOpenMediaForm}
                    openMediaForm={openMediaForm}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Container>

        {allAssets.length > 0 ? (
          <div className={boardStyles.board}>
            {allAssets
              .slice()
              .reverse()
              .map((asset) => (
                <MediaItem
                  key={asset._id}
                  asset={asset}
                  editAsset={editAsset}
                  deleteAsset={deleteAsset}
                  enableEditing={true}
                />
              ))}
          </div>
        ) : (
          <div id="errorMessage">Create content for today!</div>
        )}
      </section>
    </>
  );
};

export default Dashboard;
