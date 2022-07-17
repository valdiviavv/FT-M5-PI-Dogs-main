import './App.css';
import {Route} from "react-router-dom";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";

function App() {
    return (
        <div className="App">
            <Nav />
            <Route exact path="/" component={Home} />
            <Footer />
        </div>
    );
}

export default App;
