import React from 'react'
import { BrowserRouter  } from 'react-router-dom'
import { Content } from './Content'
import { Header } from './Header'
export const App = () => {
  return (
    <div>
    <Header/>
    <BrowserRouter>
    <Content/>
    </BrowserRouter >
    </div>
  )
}
