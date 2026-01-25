import "./App.css";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import HomePage from "./Pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FindJobs from "./Pages/FindJobs";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import FindTalent from "./Pages/FindTalent";
import TalentProfile from "./Pages/TalentProfile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MyApplications from "./Pages/MyApplications";
import MyProfile from "./Pages/MyProfile";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const theme = createTheme({
    colors: {
      brightSun: [
        "#fffbeb",
        "#fff3c6",
        "#ffe588",
        "#ffd149",
        "#ffbd20",
        "#f99b07",
        "#dd7302",
        "#b75006",
        "#943c0c",
        "#7a330d",
        "#461902",
      ],
      mineShaft: [
        "#f6f6f6",
        "#e7e7e7",
        "#d1d1d1",
        "#b0b0b0",
        "#888888",
        "#6d6d6d",
        "#5d5d5d",
        "#4f4f4f",
        "#454545",
        "#3d3d3d",
        "#2d2d2d",
      ],
    },
    fontFamily: "Poppins, sans-serif",
  });
  return (
    <>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/find-jobs" element={<FindJobs />} />
              <Route path="/find-talent" element={<FindTalent />} />
              <Route path="/talent-profile" element={<TalentProfile />} />
              <Route path="/my-applications" element={<MyApplications />} />
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </MantineProvider>
    </>
  );
}

export default App;
