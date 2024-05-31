import styles from "./styles/LandingPage.module.sass";
import { AuthContext } from "@context";
import Button from "../components/Button.jsx";
import { Container } from "react-bootstrap";
import landingslide1 from "@img/landingpage-slideshow/landingslide1.png";
import landingslide2 from "@img/landingpage-slideshow/landingslide2.png";
import { Marquee } from "@components";
import React, { useContext, useState, useEffect } from "react";
import usersService from "../services/users.service.js";

export default function LandingPage() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [recentUserName, setRecentUserName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        try {
          const response = await usersService.get(user._id);
          setRecentUserName(response.data.name);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getUser();
  }, [user]);
  return (
    <section className={styles.landingPage}>
      <div className={styles.landingPage_slideshow}>
        <Marquee
          phrases={[
            "For days worth remembering",
            recentUserName
              ? `What's on your mind today, ${recentUserName} ?`
              : "What's on your mind today?",
            "What made you laugh today?",
          ]}
          className={styles.marquee1}
        />

        <div className={styles.landingPage_slideshow_item1}>
          <img src={landingslide1} alt="MemoReel" />
        </div>
        <div className={styles.landingPage_slideshow_item2}>
          <img src={landingslide2} alt="MemoReel" />
        </div>

        <Marquee
          phrases={[
            "For days worth remembering",
            "What's on your mind today?",
            "What made you laugh today?",
          ]}
          className={styles.marquee2}
        />

        <Container fluid>
          <div className={styles.landingPage_cta}>
            <Button to={isLoggedIn ? "/dashboard" : "/login"}>
              Highlight Your Day!
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
