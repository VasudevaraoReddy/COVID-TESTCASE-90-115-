import {Link} from 'react-router-dom'

const EachRow = props => {
  const {details} = props
  const {
    confirmed,
    name,
    active,
    deceased,
    recovered,
    population,
    stateCode,
  } = details
  console.log(typeof confirmed)
  const internationalNumberFormat = new Intl.NumberFormat('en-US')
  return (
    <li>
      <p className="tro">
        <Link to={`/state/${stateCode}`} className="link-item">
          {name}
        </Link>
      </p>
      <p className="tr1">{confirmed}</p>
      <p className="tr2">{active}</p>
      <p className="tr3">{recovered}</p>
      <p className="tr4">{deceased}</p>
      <p className="tr4">{population}</p>
    </li>
  )
}

export default EachRow
