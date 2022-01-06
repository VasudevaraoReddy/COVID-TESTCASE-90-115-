import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const EachStateSuggestion = props => {
  const {details} = props
  return (
    <li className="each-state-item">
      <Link to={`/state/${details.state_code}`} className="each-state-link">
        <p className="each-state-name">{details.state_name}</p>
        <div className="each-state-navigation">
          <p>{details.state_code}</p>
          <BiChevronRightSquare />
        </div>
      </Link>
    </li>
  )
}

export default EachStateSuggestion
