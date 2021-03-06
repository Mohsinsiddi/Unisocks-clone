import React from 'react'
import Web3Provider, { Connectors } from 'web3-react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import GlobalStyle, { ThemeProvider } from '../theme'
import Web3ReactManager from '../components/Web3ReactManager'
import AppProvider from '../context'
import Main from './Main'

const PROVIDER_URL = process.env.REACT_APP_PROVIDER_URL

const { NetworkOnlyConnector, InjectedConnector } = Connectors

const Network = new NetworkOnlyConnector({
  providerURL: PROVIDER_URL
})

const Injected = new InjectedConnector({ supportedNetworks: [1,4,71401] })
const Infura = new NetworkOnlyConnector({
  providerURL: process.env.REACT_APP_PROVIDER_URL
  //providerURL: 'https://mainnet.infura.io/v3/e63e2bf7da29499c99a7560a7a4441b7'
})

const connectors = { Network, Injected, Infura }

export default function App() {
  return (
    <ThemeProvider>
      <>
        <GlobalStyle />
        <Web3Provider connectors={connectors} libraryName={'ethers.js'}>
          <Web3ReactManager>
            <AppProvider>
              <BrowserRouter>
                <Switch>
                  <Route exact strict path="/" render={() => <Main />} />
                  <Route exact strict path="/status" render={() => <Main status />} />
                  <Route exact strict path="/stats" render={() => <Main stats />} />
                  <Redirect to="/" />
                </Switch>
              </BrowserRouter>
            </AppProvider>
          </Web3ReactManager>
        </Web3Provider>
      </>
    </ThemeProvider>
  )
}
