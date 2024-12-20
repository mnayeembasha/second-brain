import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { ThemeProvider } from "./components/theme-provider"
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
// import { ToggleButton } from "./components/ui/ToggleButton";

const App = () => {


  return (
    <ThemeProvider  storageKey="vite-ui-theme">
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
