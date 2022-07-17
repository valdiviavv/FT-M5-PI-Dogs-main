import './App.css';
import {Route} from "react-router-dom";
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import SearchList from "./components/search-list/SearchList";
import Footer from "./components/footer/Footer";
import Details from "./components/details/Details";
import Create from "./components/create/Create";
import Favorites from "./components/favorites/Favorites";

function App() {
    return (
        <div className="App">
            <Nav />
            <Route exact path="/" component={Home} />
            <Route path="/search-list" component={SearchList} />
            <Route path="/v1/details/:id" component={Details} />
            <Route path="/v2/details/:id" component={Details} />
            <Route path="/create" component={Create} />
            <Route path="/favorites" component={Favorites} />
            <Footer />
        </div>
    );
}

export default App;
