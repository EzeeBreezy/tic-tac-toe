import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { LobbyPage } from './pages/LobbyPage'
import { GamePage } from './pages/GamePage'
import { InfoPage } from './pages/InfoPage'

export const useRoutes = isAuthenticated => {
   if (isAuthenticated) {
      return (
         <Switch>
            <Route path="/lobby" exact>
               <LobbyPage />
            </Route>
            <Route path="/game" exact>
               <GamePage />
            </Route>
            <Route path="/info" exact>
               <InfoPage />
            </Route>
            <Redirect to="/lobby" />
         </Switch>
      )
   }

   return (
      <Switch>
         <Route path="/" exact>
            <AuthPage />
         </Route>
         <Redirect to="/" />
      </Switch>
   )
}

{
   /* <Route path='/game/:id' exact>
<GamePage />
</Route> */
}
//TODO remove

//TODO make GAME inactive while there is no game -> useRoutes?