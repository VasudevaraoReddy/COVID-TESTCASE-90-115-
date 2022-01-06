import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiOutlineMenuFold} from 'react-icons/ai'
import {ImCancelCircle} from 'react-icons/im'
import './index.css'

const tabItems = [
  {id: 'home', displayText: 'Home'},
  {id: 'vaccination', displayText: 'Vaccination'},
  {id: 'about', displayText: 'About'},
]
const Header = props => {
  const [isClicked, setIsClicked] = useState(false)
  const onClickHomeIcon = () => {
    setIsClicked(true)
  }

  const onClickCancelIcon = () => {
    setIsClicked(false)
  }

  const {activeTabId} = props

  return (
    <>
      <nav className="navbar">
        <div className="mobile-view">
          <Link to="/" className="link-item">
            <ul className="mobile-logo">
              <li className="covid-name">COVID19</li>
              <li className="india-name">INDIA</li>
            </ul>
          </Link>
          <AiOutlineMenuFold className="home-icon" onClick={onClickHomeIcon} />
        </div>

        <div className="desktop-view">
          <ul className="icons-2">
            <li>
              <Link
                to="/"
                className={
                  activeTabId === tabItems[0].id
                    ? 'link-item active-class-name'
                    : 'link-item'
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/vaccination"
                className={
                  activeTabId === tabItems[1].id
                    ? 'link-item active-class-name'
                    : 'link-item'
                }
              >
                Vaccination
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={
                  activeTabId === tabItems[2].id
                    ? 'link-item active-class-name'
                    : 'link-item'
                }
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {isClicked ? (
        <div className="navbar-below-mobile">
          <ul className="mobile-below">
            <li>
              <Link
                to="/"
                className={
                  activeTabId === tabItems[0].id
                    ? 'link-item active-class-name'
                    : 'link-item'
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/vaccination"
                className={
                  activeTabId === tabItems[1].id
                    ? 'link-item active-class-name'
                    : 'link-item'
                }
              >
                Vaccination
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={
                  activeTabId === tabItems[2].id
                    ? 'link-item active-class-name'
                    : 'link-item'
                }
              >
                About
              </Link>
            </li>
          </ul>
          <ImCancelCircle className="cancel-icon" onClick={onClickCancelIcon} />
        </div>
      ) : null}
    </>
  )
}
export default withRouter(Header)
