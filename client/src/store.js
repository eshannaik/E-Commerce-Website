import { createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleWare = [thunk];

// redux has only a single store with a single root reducing function and doesnt support a dispatcher.
// it holds the current state of the system. it is not a class but is just an object with a few methods
// standard way to setup redux
const store = createStore(rootReducer,initialState,compose(
    applyMiddleware(...middleWare),
    window.__REDUX_DEVTOOLS_EXTENSION__ && 
    window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;

/* WORKFLOW

    Store : Stores the current state of the application.
    Action : The actions a user can take to change the state of the application.
    Reducers : They take the action done by the user and the current state and produces the new state which is stored in the store.
    View : It is the view of the application (FRONTEND).

    action -> reduce -> store -> view ->
    |__________________________________|
*/