import React, { useState } from 'react'
import 'materialize-css'
import { useRoutes } from './pages/routes'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConnectedNavBar as NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { Provider } from 'react-redux'
import store from './reducers/Redux-store'
import { randomAppColor } from './helpers/appColors' 


function App() {
   const [isAuthenticated, setAuthenticated] = useState(store.getState().user.isAuthenticated)
   store.subscribe(() => setAuthenticated(store.getState().user.isAuthenticated))
   const routes = useRoutes(isAuthenticated)

   return (
      <Provider store={store}>
         <Router>
            <header>{isAuthenticated && <NavBar appColor={randomAppColor} />}</header>
            <main className="container">{routes}</main>
            <Footer appColor={randomAppColor} />
         </Router>
      </Provider>
   )
}

export default App


//TODO add loader everywhere (game)

//TODO check all console logs, commented lines, fonts
