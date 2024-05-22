import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import Dashboard from "../Dashboard/Dashboard";
import ExperienceDetail from "../ExperienceDetail/ExperienceDetail";
import NewExperienceForm from "../NewExperienceForm/NewExperienceForm";
// import { getExperiences } from "../../utilities/experiences-api";
import { getOne } from "../../utilities/experiences-api";
import "./App.css";

import NavBar from "../../components/NavBar/NavBar";
import { getExperiences } from "../../utilities/experiences-api";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [experiences, setExperiences] = useState([]);
  // const [experience, setExperience] = useState("");

  useEffect(() => {
    async function fetchExperiences() {
      const experiences = await getExperiences();
      console.log(experiences);
      setExperiences(experiences);
    }

    fetchExperiences();
  }, []);

  // useEffect((id) => {
  //   async function fetchOne() {
  //     const experience = await getOne(id);
  //     setExperience(experience);
  //   }

  //   fetchOne();
  // }, []);

  function addExperience(experience) {
    setExperiences([...experiences, experience]);
  }

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route
              path="/experiences/:experienceid"
              element={<ExperienceDetail />}
            />
            <Route
              path="/experiences/"
              element={<Dashboard experiences={experiences} />}
            />
            <Route
              path="/new"
              element={
                <NewExperienceForm addExperience={addExperience} user={user} />
              }
            />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
