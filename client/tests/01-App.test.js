import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import * as data from './db.json';
import App from '../src/App';
import Nav from '../src/components/Nav/Nav';
import Home from '../src/components/Home/Home';
import SearchList from "../src/components/search-list/SearchList";
import Create from "../src/components/create/Create";
import Favorites from "../src/components/favorites/Favorites";
import About from "../src/components/abaut/About";
import Footer from "../src/components/footer/Footer";
import axios from 'axios';
import nock from 'nock';
import nodeFetch from 'node-fetch';
import Details from "../src/components/details/Details";
axios.defaults.adapter = require('axios/lib/adapters/http');

configure({ adapter: new Adapter() });

describe('<App />', () => {
    global.fetch = nodeFetch;

    let store;
    const routes = [
        '/',
        '/search-list',
        '/create',
        '/favorites',
        '/about',
        '/v1/details/1',
        '/v2/details/1',
    ];
    const mockStore = configureStore([thunk]);
    const state = {
        dogList: data.readonlyApi.concat(data.databaseApi),
        filteredList: [],
        favoriteList: [],
        pageList: [],
        pageSize: 8,
        temperamentList: [],
        currentPage: {},
    };

    beforeEach(async () => {
        // Se Mockea las request a las api
        const apiMock = nock('http://localhost:3001').persist();

        // "/dogs" => Retorna la propiedad products del archivo data.json
        apiMock.get('/dogs').reply(200, data.databaseApi);
        apiMock.get('/temperaments').reply(200, data.temperamentList);

        // "/dogs/:id" => Retorna un producto matcheado por su id
        let id = null;
        apiMock.get((uri) => {
            id = Number(uri.split('/').pop()); // Number('undefined') => NaN
            return !!id
        })
        .reply(200, (uri, requestBody) => {
            return data.databaseApi.find((dogItem) => dogItem.id === id) || {};
        });
    });

    store = mockStore(state);

    const componentToUse = (route) => {
        return (
            <Provider store={store}>
                <MemoryRouter initialEntries={[route]}>
                    <App />
                </MemoryRouter>
            </Provider>
        );
    };

    describe('Nav:', () => {
        it('Debería ser renderizado en la ruta "/"', () => {
            const app = mount(componentToUse(routes[0]));
            expect(app.find(Nav)).toHaveLength(1);
        });

        it('Debería ser renderizado en la ruta "/search-list"', () => {
            const app = mount(componentToUse(routes[1]));
            expect(app.find(Nav)).toHaveLength(1);
        });
        it('Debería ser renderizado en la ruta "/create"', () => {
            const app = mount(componentToUse(routes[2]));
            expect(app.find(Nav)).toHaveLength(1);
        });
        it('Debería ser renderizado en la ruta "/favorites"', () => {
            const app = mount(componentToUse(routes[3]));
            expect(app.find(Nav)).toHaveLength(1);
        });
        it('Debería ser renderizado en la ruta "/about"', () => {
            const app = mount(componentToUse(routes[4]));
            expect(app.find(Nav)).toHaveLength(1);
        });
        it('Debería ser renderizado en la ruta "/v1/details/1"', () => {
            const app = mount(componentToUse(routes[5]));
            expect(app.find(Nav)).toHaveLength(1);
        });
        it('Debería ser renderizado en la ruta "/v2/details/1"', () => {
            const app = mount(componentToUse(routes[6]));
            expect(app.find(Nav)).toHaveLength(1);
        });
    });

    describe('Footer:', () => {
        it('Debería ser renderizado en la ruta "/"', () => {
            const app = mount(componentToUse(routes[0]));
            expect(app.find(Footer)).toHaveLength(1);
        });

        it('Debería ser renderizado en la ruta "/search-list"', () => {
            const app = mount(componentToUse(routes[1]));
            expect(app.find(Footer)).toHaveLength(1);
        });
        it('Debería ser renderizado en la ruta "/create"', () => {
            const app = mount(componentToUse(routes[2]));
            expect(app.find(Footer)).toHaveLength(1);
        });
        it('Debería ser renderizado en la ruta "/favorites"', () => {
            const app = mount(componentToUse(routes[3]));
            expect(app.find(Footer)).toHaveLength(1);
        });
        it('Debería ser renderizado en la ruta "/about"', () => {
            const app = mount(componentToUse(routes[4]));
            expect(app.find(Footer)).toHaveLength(1);
        });
        it('Debería ser renderizado en la ruta "/v1/details/1"', () => {
            const app = mount(componentToUse(routes[5]));
            expect(app.find(Footer)).toHaveLength(1);
        });
        it('Debería ser renderizado en la ruta "/v2/details/1"', () => {
            const app = mount(componentToUse(routes[6]));
            expect(app.find(Footer)).toHaveLength(1);
        });
    });

    describe('Home:', () => {
        it('El componente "Home" se debería renderizar solamente en la ruta "/"', () => {
            const app = mount(componentToUse(routes[0]));
            expect(app.find(Nav)).toHaveLength(1);
            expect(app.find(Home)).toHaveLength(1);
            expect(app.find(Footer)).toHaveLength(1);
            expect(app.find(SearchList)).toHaveLength(0);
            expect(app.find(Create)).toHaveLength(0);
            expect(app.find(Favorites)).toHaveLength(0);
            expect(app.find(About)).toHaveLength(0);
            expect(app.find(Details)).toHaveLength(0);
        });
        it('El componente "Home" no deberia mostrarse en ninguna otra ruta', () => {
            const app = mount(componentToUse(routes[1]));
            expect(app.find(Home)).toHaveLength(0);

            const app2 = mount(componentToUse(routes[2]));
            expect(app2.find(Home)).toHaveLength(0);

            const app3 = mount(componentToUse(routes[3]));
            expect(app3.find(Home)).toHaveLength(0);

            const app4 = mount(componentToUse(routes[4]));
            expect(app4.find(Home)).toHaveLength(0);

            const app5 = mount(componentToUse(routes[5]));
            expect(app5.find(Home)).toHaveLength(0);

            const app6 = mount(componentToUse(routes[6]));
            expect(app6.find(Home)).toHaveLength(0);
        });
    });

    describe('SearchList:', () => {
        it('El componente "SearchList" se debería renderizar solamente en la ruta "/search-list"', () => {
            const app = mount(componentToUse(routes[1]));
            expect(app.find(Nav)).toHaveLength(1);
            expect(app.find(SearchList)).toHaveLength(1);
            expect(app.find(Footer)).toHaveLength(1);
            expect(app.find(Home)).toHaveLength(0);
            expect(app.find(Create)).toHaveLength(0);
            expect(app.find(Favorites)).toHaveLength(0);
            expect(app.find(About)).toHaveLength(0);
            expect(app.find(Details)).toHaveLength(0);
        });
        it('El componente "SearchList" no deberia mostrarse en ninguna otra ruta', () => {
            const app = mount(componentToUse(routes[0]));
            expect(app.find(SearchList)).toHaveLength(0);

            const app2 = mount(componentToUse(routes[2]));
            expect(app2.find(SearchList)).toHaveLength(0);

            const app3 = mount(componentToUse(routes[3]));
            expect(app3.find(SearchList)).toHaveLength(0);

            const app4 = mount(componentToUse(routes[4]));
            expect(app4.find(SearchList)).toHaveLength(0);

            const app5 = mount(componentToUse(routes[5]));
            expect(app5.find(SearchList)).toHaveLength(0);

            const app6 = mount(componentToUse(routes[6]));
            expect(app6.find(SearchList)).toHaveLength(0);
        });
    });

    describe('Create:', () => {
        it('El componente "Create" se debería renderizar solamente en la ruta "/create"', () => {
            const app = mount(componentToUse(routes[2]));
            expect(app.find(Nav)).toHaveLength(1);
            expect(app.find(Create)).toHaveLength(1);
            expect(app.find(Footer)).toHaveLength(1);
            expect(app.find(Home)).toHaveLength(0);
            expect(app.find(SearchList)).toHaveLength(0);
            expect(app.find(Favorites)).toHaveLength(0);
            expect(app.find(About)).toHaveLength(0);
            expect(app.find(Details)).toHaveLength(0);
        });
        it('El componente "Create" no deberia mostrarse en ninguna otra ruta', () => {
            const app = mount(componentToUse(routes[0]));
            expect(app.find(Create)).toHaveLength(0);

            const app2 = mount(componentToUse(routes[1]));
            expect(app2.find(Create)).toHaveLength(0);

            const app3 = mount(componentToUse(routes[3]));
            expect(app3.find(Create)).toHaveLength(0);

            const app4 = mount(componentToUse(routes[4]));
            expect(app4.find(Create)).toHaveLength(0);

            const app5 = mount(componentToUse(routes[5]));
            expect(app5.find(Create)).toHaveLength(0);

            const app6 = mount(componentToUse(routes[6]));
            expect(app6.find(Create)).toHaveLength(0);
        });
    });

    describe('Favorites:', () => {
        it('El componente "Favorites" se debería renderizar solamente en la ruta "/favorites"', () => {
            const app = mount(componentToUse(routes[3]));
            expect(app.find(Nav)).toHaveLength(1);
            expect(app.find(Favorites)).toHaveLength(1);
            expect(app.find(Footer)).toHaveLength(1);
            expect(app.find(Home)).toHaveLength(0);
            expect(app.find(SearchList)).toHaveLength(0);
            expect(app.find(Create)).toHaveLength(0);
            expect(app.find(About)).toHaveLength(0);
            expect(app.find(Details)).toHaveLength(0);
        });
        it('El componente "Favorites" no deberia mostrarse en ninguna otra ruta', () => {
            const app = mount(componentToUse(routes[0]));
            expect(app.find(Favorites)).toHaveLength(0);

            const app2 = mount(componentToUse(routes[1]));
            expect(app2.find(Favorites)).toHaveLength(0);

            const app3 = mount(componentToUse(routes[2]));
            expect(app3.find(Favorites)).toHaveLength(0);

            const app4 = mount(componentToUse(routes[4]));
            expect(app4.find(Favorites)).toHaveLength(0);

            const app5 = mount(componentToUse(routes[5]));
            expect(app5.find(Favorites)).toHaveLength(0);

            const app6 = mount(componentToUse(routes[6]));
            expect(app6.find(Favorites)).toHaveLength(0);
        });
    });

    describe('About:', () => {
        it('El componente "About" se debería renderizar solamente en la ruta "/about"', () => {
            const app = mount(componentToUse(routes[4]));
            expect(app.find(Nav)).toHaveLength(1);
            expect(app.find(About)).toHaveLength(1);
            expect(app.find(Footer)).toHaveLength(1);
            expect(app.find(Home)).toHaveLength(0);
            expect(app.find(SearchList)).toHaveLength(0);
            expect(app.find(Create)).toHaveLength(0);
            expect(app.find(Favorites)).toHaveLength(0);
            expect(app.find(Details)).toHaveLength(0);
        });
        it('El componente "About" no deberia mostrarse en ninguna otra ruta', () => {
            const app = mount(componentToUse(routes[0]));
            expect(app.find(About)).toHaveLength(0);

            const app2 = mount(componentToUse(routes[1]));
            expect(app2.find(About)).toHaveLength(0);

            const app3 = mount(componentToUse(routes[2]));
            expect(app3.find(About)).toHaveLength(0);

            const app4 = mount(componentToUse(routes[3]));
            expect(app4.find(About)).toHaveLength(0);

            const app5 = mount(componentToUse(routes[5]));
            expect(app5.find(About)).toHaveLength(0);

            const app6 = mount(componentToUse(routes[6]));
            expect(app6.find(About)).toHaveLength(0);
        });
    });

    describe('Details v1:', () => {
        it('El componente "Details v1" se debería renderizar solamente en la ruta "/v1/details/1"', () => {
            const app = mount(componentToUse(routes[5]));
            expect(app.find(Nav)).toHaveLength(1);
            expect(app.find(Details)).toHaveLength(1);
            expect(app.find(Footer)).toHaveLength(1);
            expect(app.find(Home)).toHaveLength(0);
            expect(app.find(SearchList)).toHaveLength(0);
            expect(app.find(Create)).toHaveLength(0);
            expect(app.find(About)).toHaveLength(0);
            expect(app.find(Favorites)).toHaveLength(0);
        });
        it('El componente "Details v1" no deberia mostrarse en ninguna otra ruta', () => {
            const app = mount(componentToUse(routes[0]));
            expect(app.find(Details)).toHaveLength(0);

            const app2 = mount(componentToUse(routes[1]));
            expect(app2.find(Details)).toHaveLength(0);

            const app3 = mount(componentToUse(routes[2]));
            expect(app3.find(Details)).toHaveLength(0);

            const app4 = mount(componentToUse(routes[3]));
            expect(app4.find(Details)).toHaveLength(0);

            const app5 = mount(componentToUse(routes[4]));
            expect(app5.find(Details)).toHaveLength(0);
        });
    });

    describe('Details v2:', () => {
        it('El componente "Details v2" se debería renderizar solamente en la ruta "/v2/details/1"', () => {
            const app = mount(componentToUse(routes[6]));
            expect(app.find(Nav)).toHaveLength(1);
            expect(app.find(Details)).toHaveLength(1);
            expect(app.find(Footer)).toHaveLength(1);
            expect(app.find(Home)).toHaveLength(0);
            expect(app.find(SearchList)).toHaveLength(0);
            expect(app.find(Create)).toHaveLength(0);
            expect(app.find(About)).toHaveLength(0);
            expect(app.find(Favorites)).toHaveLength(0);
        });
        it('El componente "Details v2" no deberia mostrarse en ninguna otra ruta', () => {
            const app = mount(componentToUse(routes[0]));
            expect(app.find(Details)).toHaveLength(0);

            const app2 = mount(componentToUse(routes[1]));
            expect(app2.find(Details)).toHaveLength(0);

            const app3 = mount(componentToUse(routes[2]));
            expect(app3.find(Details)).toHaveLength(0);

            const app4 = mount(componentToUse(routes[3]));
            expect(app4.find(Details)).toHaveLength(0);

            const app5 = mount(componentToUse(routes[4]));
            expect(app5.find(Details)).toHaveLength(0);
        });
    });

});
