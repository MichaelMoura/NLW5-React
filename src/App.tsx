//import { Home } from "./pages/Home";

import {Route,BrowserRouter, Switch,} from 'react-router-dom'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import {AuthContextProvider} from './contexts/AuthContext';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';


function App() {
    return (
        <BrowserRouter>
                <AuthContextProvider>
                    <Switch>
                        <Route path='/' exact component={Home}></Route>
                        <Route path='/rooms/new' exact component={NewRoom}></Route>
                        <Route path='/rooms/:id' exact component={Room}></Route>
                        <Route path='/admin/rooms/:id' exact component={AdminRoom}></Route>
                    </Switch>
                </AuthContextProvider>
        </BrowserRouter>
    );
}
export default App;