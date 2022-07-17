import './App.css';
import {Route} from "react-router-dom";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import SearchList from "./components/search-list/SearchList";
import Footer from "./components/footer/Footer";
import Details from "./components/details/Details";
import Create from "./components/create/Create";

function App() {
    return (
        <div className="App">
            <Nav />
            <Route exact path="/" component={Home} />
            <Route path="/search-list" component={SearchList} />
            <Route path="/details/:id" component={Details} />
            <Route path="/create" component={Create} />
            <Footer />
        </div>
    );
}

export default App;
