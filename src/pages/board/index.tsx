import React from 'react'
import { createGlobalStyle } from 'styled-components'

import {Board} from '../../components/board'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #4bcffa;
  }
`
const BoardPage = () => {

  return <>
    <Board />

    <GlobalStyle />
  </>
}

export default BoardPage;