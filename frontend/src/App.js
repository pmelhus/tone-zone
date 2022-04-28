import { Route} from "react-router-dom";
import Navigation from "./components/Navigation/Navigation"
import HomePage from "./components/HomePage/HomePage"

function App() {
  return (
    <>
     <Navigation />
    <Route exact path='/'>
      <HomePage />
    </Route>
    </>
  );
}

export default App;
