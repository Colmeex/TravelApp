import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import DetailPage from "./components/DetailPage/DetailPage";
import CreateActivity from "./components/CreateActivity/CreateActivity";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/countries/:id" component={DetailPage} />
          <Route path="/activities" component={CreateActivity} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
