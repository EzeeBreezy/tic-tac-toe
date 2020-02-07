import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedAuthPage as AuthPage } from './AuthPage'
import { LobbyPage } from './LobbyPage'
import { GamePage } from './GamePage'
import { InfoPage } from './InfoPage'

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

