import styles from "./styles/About.module.sass";
import { Github, Linkedin } from "react-bootstrap-icons";
import { Container, Row, Col } from "react-bootstrap";
import imgLaura from "@img/63737600.jpeg";
import imgEcem from "@img/ecem.jpg";
import imgTetiana from "@img/tetiana.jpeg";

function About() {
  return (
    <div className={styles.about}>
      <Container>
        <Row>
          <Col md="6" lg="5" className={styles.about_project}>
            <p className="lead">
              This project was made with love and a lot of git conflicts
            </p>
            <p>
              MemoReel was created with a desire to develop an app that feels
              like home. A place where you can drop random stuff from your mind
              - daily. And then come back to relive the moments.
            </p>
          </Col>
        </Row>

        <Row>
          <Col md="6" lg="4">
            <div
              className={styles.social}
              style={{ backgroundColor: "#D6F488" }}
            >
              <div className={styles.social_person}>
                <img
                  src={imgTetiana}
                  className={styles.social_person_image}
                  alt="
                  Tetiana Kanafotska"
                />
                <h4 className={styles.social_person_name}>
                  Tetiana Kanafotska
                </h4>
                <p>
                  A Ukrainian with a background in start-ups and marketing. Love
                  good jokes, sushi and fixing bugs 🐞.
                </p>
              </div>

              <div className={styles.social_links}>
                <a href="https://github.com/" target="_blank" rel="noreferrer">
                  <Github size="30" color="#0B0A08" />
                </a>

                <a
                  href="https://www.linkedin.com/in/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size="30" color="#0B0A08" />
                </a>
              </div>
            </div>
          </Col>
          <Col md="6" lg="4">
            <div
              className={styles.social}
              style={{ backgroundColor: "#FFF791" }}
            >
              <div className={styles.social_person}>
                <img
                  src={imgEcem}
                  className={styles.social_person_image}
                  alt="Ecem Onkol"
                />
                <h4 className={styles.social_person_name}>Ecem Onkol</h4>
                <p>
                  From the Turkish Aegean coast, with an olive addiction and a
                  designer background, still sprinkling creativity onto JS katas
                  like confetti! 🎉
                </p>
              </div>

              <div className={styles.social_links}>
                <a
                  href="https://github.com/ecemonkol"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size="30" color="#0B0A08" />
                </a>

                <a
                  href="https://www.linkedin.com/in/ecemonkol/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size="30" color="#0B0A08" />
                </a>
              </div>
            </div>
          </Col>
          <Col md="6" lg="4">
            <div
              className={styles.social}
              style={{ backgroundColor: "#FF9478" }}
            >
              <div className={styles.social_person}>
                <img
                  src={imgLaura}
                  className={styles.social_person_image}
                  alt="Laura Sinclair"
                />
                <h4 className={styles.social_person_name}>Laura Sinclair</h4>
                <p>Some text.</p>
              </div>
              <div className={styles.social_links}>
                <a
                  href="https://github.com/laurasinclair"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size="30" color="#0B0A08" />
                </a>

                <a
                  href="https://www.linkedin.com/in/laurasnclr/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size="30" color="#0B0A08" />
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
