import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import EachRow from '../EachRow'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'
import EachStateSuggestion from '../EachStateSuggestion'
import statesList from '../../states'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    resultList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    isSearchActive: false,
  }

  componentDidMount() {
    this.getAllStatesCovidCases()
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []
    const keyNames = Object.keys(data)
    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        const stateName = [
          statesList.find(state => state.state_code === keyName),
        ]
        if (stateName[0]?.state_name !== undefined) {
          resultList.push({
            stateCode: keyName,
            confirmed,
            name: stateName[0]?.state_name,
            deceased,
            recovered,
            tested,
            population,
            active: confirmed - (deceased + recovered),
          })
        }
      }
    })
    return resultList
  }

  getAllStatesCovidCases = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedList = this.convertObjectsDataIntoListItemsUsingForInMethod(
        data,
      )
      this.setState({
        resultList: updatedList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderTable = () => {
    const {resultList} = this.state
    return (
      <tbody>
        {resultList.map(each => (
          <EachRow key={each.stateCode} details={each} />
        ))}
      </tbody>
    )
  }

  renderLoadingView = () => (
    <div className="products-loader-container" testid="homeRouteLoader">
      <Loader type="Oval" color="#007bff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail-image"
      />
      <p>Oops! Something Went Wrong</p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.getAllStatesCovidCases}
      >
        Retry
      </button>
    </div>
  )

  onClickAscSortOption = () => {
    const {resultList} = this.state
    const sortedList = resultList.sort((a, b) => {
      const x = a.name.toUpperCase()
      const y = b.name.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({resultList: sortedList})
  }

  onClickDescSortOption = () => {
    const {resultList} = this.state
    const sortedList = resultList.sort((a, b) => {
      const x = a.name.toUpperCase()
      const y = b.name.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({resultList: sortedList})
  }

  renderTableView = () => {
    const {resultList} = this.state
    return (
      <div className="all-states-table" testid="stateWiseCovidDataTable">
        <ul className="table-header">
          <li className="state-name-heading">
            <p className="table-header-title ">States/UT</p>
            <button
              className="order"
              type="button"
              testid="ascendingSort"
              onClick={this.whenAscendingSortButtonClicked}
            >
              <FcGenericSortingAsc className="order-icon" />
            </button>
            <button
              className="order"
              type="button"
              testid="descendingSort"
              onClick={this.whenDescendingSortButtonClicked}
            >
              <FcGenericSortingDesc className="order-icon" />
            </button>
          </li>
          <li className="other-tables-bar">
            <p className="table-header-title">Confirmed</p>
          </li>
          <li className="other-tables-bar">
            <p className="table-header-title">Active</p>
          </li>
          <li className="other-tables-bar">
            <p className="table-header-title">Recovered</p>
          </li>
          <li className="other-tables-bar">
            <p className="table-header-title">Deceased</p>
          </li>
          <li className="other-tables-bar">
            <p className="table-header-title">Population</p>
          </li>
        </ul>
        <ul className="other-tables">
          {resultList.map(each => (
            <EachRow key={each.stateCode} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTableView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    event.preventDefault()
    this.setState({searchInput: event.target.value, isSearchActive: true})
  }

  render() {
    const internationalNumberFormat = new Intl.NumberFormat('en-US')
    const {searchInput, isSearchActive, resultList} = this.state
    const countryWideConfirmedCasesCount = resultList.reduce(
      (prev, current) => prev + current.confirmed,
      0,
    )
    const countryWideActiveCasesCount = resultList.reduce(
      (prev, current) => prev + current.active,
      0,
    )
    const countryWideRecoveredCasesCount = resultList.reduce(
      (prev, current) => prev + current.recovered,
      0,
    )
    const countryWideDeceasedCasesCount = resultList.reduce(
      (prev, current) => prev + current.deceased,
      0,
    )
    const searchResults = statesList.filter(
      each =>
        each.state_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        each.state_code.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <>
        <Header activeTabId="home" />
        <div
          className="home-bg"
          onClick={() => {
            this.setState({isSearchActive: false, searchInput: ''})
          }}
          aria-hidden="true"
        >
          <div className="search-box-cont">
            <BsSearch />
            <input
              type="search"
              value={searchInput}
              placeholder="Enter the State"
              className="search-box"
              onChange={this.onChangeSearchInput}
            />
          </div>
          {isSearchActive ? (
            <ul
              className="search-list-section"
              testid="searchResultsUnorderedList"
            >
              {searchResults.length === 0 ? (
                <p className="no-results-section">
                  There is no State Name with your Search {searchInput}
                </p>
              ) : (
                searchResults.map(each => (
                  <EachStateSuggestion key={each.state_code} details={each} />
                ))
              )}
            </ul>
          ) : (
            <div className="home-icons-section">
              <div className="confirmed" testid="countryWideConfirmedCases">
                <p>Confirmed</p>
                <img
                  src="https://res.cloudinary.com/dbphffmis/image/upload/v1637413101/Group_rtygto.png"
                  alt="country wide confirmed cases pic"
                  className="confirmed-image"
                />
                <p>{countryWideConfirmedCasesCount}</p>
              </div>
              <div className="active" testid="countryWideActiveCases">
                <p>Active</p>
                <img
                  src="https://res.cloudinary.com/dbphffmis/image/upload/v1637413101/protection_1_btp8wk.png"
                  alt="country wide active cases pic"
                  className="confirmed-image"
                />
                <p>{countryWideActiveCasesCount}</p>
              </div>
              <div className="recovered" testid="countryWideRecoveredCases">
                <p>Recovered</p>
                <img
                  src="https://res.cloudinary.com/dbphffmis/image/upload/v1637413101/recovered_1_mnz2xy.png"
                  alt="country wide recovered cases pic"
                  className="confirmed-image"
                />
                <p>{countryWideRecoveredCasesCount}</p>
              </div>
              <div className="deceased" testid="countryWideDeceasedCases">
                <p>Deceased</p>
                <img
                  src="https://res.cloudinary.com/dbphffmis/image/upload/v1637413101/Outline_fqrmo2.png"
                  alt="country wide deceased cases pic"
                  className="confirmed-image"
                />
                <p>{countryWideDeceasedCasesCount}</p>
              </div>
            </div>
          )}
          {!isSearchActive && this.renderAll()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
