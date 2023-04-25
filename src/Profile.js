import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "./store";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";

const Profile = () => {
  const [luckyNumber, setLuckyNumber] = useState(7);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.id) {
      setLuckyNumber(auth.luckyNumber);
    }
  }, [auth]);

  const _update = async (ev) => {
    ev.preventDefault();
    dispatch(updateAuth({ luckyNumber }));
  };
  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={_update}>
        <input
          placeholder="luckyNumber"
          value={luckyNumber}
          onChange={(ev) => setLuckyNumber(ev.target.value)}
        />
        <button disabled={luckyNumber === auth.luckyNumber}>Update</button>
      </form>

      {/* Include the Notes component here */}
      <Notes />
    </div>
  );
};

export default Profile;
