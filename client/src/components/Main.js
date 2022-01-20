import { Component } from 'react';
import AddItem from './AddItem';
import Home from './Home';
import { Routes, Route, BrowserRouter, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Cart from './Cart';
import Orders from './Order';

// Routing of the webpage to their URLs

class Main extends Component {
    render(){
        return(
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path='/home'>
                            <Home/>
                        </Route>
                        <Route path='/addItem'>
                            <AddItem/>
                        </Route>
                        <Route path='/cart'>
                            <Cart/>
                        </Route>
                        <Route path='/orders'>
                            <Orders/>
                        </Route>
                        {/* <Redirect to='/home'/> */}
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default withRouter(connect()(Main));