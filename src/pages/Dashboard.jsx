import React, { useState } from "react";
import Button from "../components/Button";
import PopUpButtons from "../components/PopUpButtons";

const Dashboard = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openTextArea, setOpenTextArea] = useState(false);
  //const [openImage, setOpenImage] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  function createNote() {
    setOpenPopUp(false);
    setOpenTextArea(true);
  }

  //   function addImage() {
  //     setOpenPopUp(false);
  //     setOpenImage(true);
  //   }

  function saveNote() {
    if (newNote.trim()) {
      setAllNotes((prevNotes) => [...prevNotes, newNote]);
      setNewNote("");
      setOpenTextArea(false);
    }
  }

  function handleOnChange(e) {
    setNewNote(e.target.value);
  }

  return (
    <div>
      {allNotes.map((note, index) => (
        <p key={index}>{note}</p>
      ))}
      {openTextArea && (
        <div>
          <input onChange={handleOnChange} value={newNote} type="text" />
          <Button onClick={saveNote} label="add" />
        </div>
      )}
      <div>
        <Button onClick={() => setOpenPopUp(!openPopUp)} label="+" />
      </div>
      {openPopUp && <PopUpButtons createNote={createNote} />}
    </div>
  );
};

export default Dashboard;
