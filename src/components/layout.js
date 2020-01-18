import React from "react"
import { Link } from "gatsby"

import "../../content/assets/scss/theme.scss";

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <>
        <div className="page-container">
          <header className="header">
            <Link to="/">
              <h1 className="header__site-title">sticksnglue</h1>
              <p className="header__tag">building for the fun of it</p>
            </Link>
            <div className="header__angle-bracket"></div>
            <div className="header__curly-bracket"></div>
          </header>
        </div>

        <div className="page-container">
          {children}
        </div>
      </>
    )
  }
}

export default Layout
