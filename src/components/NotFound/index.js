import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not_found_body">
      <img
        src="https://res.cloudinary.com/dbphffmis/image/upload/v1640100361/Group_7484_auqtvd.png"
        alt="not-found-pic"
        className="not_found_image"
      />

      <h1 className="not_found_title">PAGE NOT FOUND</h1>
      <p className="not_found_para">
        we are sorry, the page you requested could not be found
      </p>

      <div className="button_container">
        <Link to="/" className="link-item">
          <button type="button" className="home_button">
            Home
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default NotFound
