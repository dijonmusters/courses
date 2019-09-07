import React from "react"
import Provider from './src/apollo/provider'

export const wrapRootElement = ({ element }) => (
  <Provider>{element}</Provider>
);