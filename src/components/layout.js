import React from "react"
import { Link } from "gatsby"

import "../../content/assets/scss/theme.scss";

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <>
        <div class="page-container">
          <header class="header">
            <h1 class="header__site-title">sticksnglue</h1>
            <p class="header__tag">building for the fun of it</p>
            <div class="header__angle-bracket"></div>
            <div class="header__curly-bracket"></div>
          </header>
        </div>


        <div class="page-container">
        <main class="main-content">
            <main>{children}</main>
        </main>
      </div>

        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </>
    )
  }
}

export default Layout
