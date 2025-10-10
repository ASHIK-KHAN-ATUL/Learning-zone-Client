import React from "react";
import Banner from "../../Components/Banner/Banner";
import About from "../About/About";
import JoinAsTeacherOrStudent from "../../Components/JoinAsTeacherOrStudent/JoinAsTeacherOrStudent";
import OurTeacher from "../../Components/OurTeacher/OurTeacher";
import QuizSection from "../../Components/QuizSection/QuizSection";
import MiniLearningTools from "../../Components/MiniLearningTools/MiniLearningTools";
import MathChallenge from "../../Components/MathChallenge/MathChallenge";
import MathGameLeaderBoard from "../../Components/MathGameLeaderBoard/MathGameLeaderBoard";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div>
      <Helmet>
        <title>Learning Zone || Learn, Explore, and Grow</title>
        <meta name="description" content="LearningZone is your platform..." />
        <link rel="canonical" href="https://learningzone.netlify.app/" />
      </Helmet>

      <Banner></Banner>

      <JoinAsTeacherOrStudent></JoinAsTeacherOrStudent>

      <About></About>

      <MathChallenge></MathChallenge>

      <MathGameLeaderBoard></MathGameLeaderBoard>

      <QuizSection></QuizSection>

      <MiniLearningTools></MiniLearningTools>

      <OurTeacher></OurTeacher>
    </div>
  );
};

export default Home;
