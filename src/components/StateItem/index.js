import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import './index.css'
import statesList from '../../states'
import TopDistrictItems from '../TopDistrictItems'
import Header from '../Header'
import LineChartItem from '../LineChartItem'
import boxes from '../../boxes'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class StateItem extends Component {
  state = {
    stateData: [],
    allDistrictsData: [],
    activeBox: 'confirmed',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getStateDetails()
  }

  getStateDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const {total, meta, districts} = data[id]
    console.log(data[id])
    const confirmed = total.confirmed ? total.confirmed : 0
    const deceased = total.deceased ? total.deceased : 0
    const recovered = total.recovered ? total.recovered : 0
    const tested = total.tested ? total.tested : 0
    const internationalNumberFormat = new Intl.NumberFormat('en-US')
    const population = data[id].meta.population ? data[id].meta.population : 0
    const lastUpdateDate = new Date(meta.last_updated)
    const stateName = [statesList.find(state => state.state_code === id)]
    const date = lastUpdateDate.getDate()
    const year = lastUpdateDate.getUTCFullYear()
    const month = months[lastUpdateDate.getMonth()]
    const overallDate = `${month} ${date} ${year}`
    const updatedStateData = {
      confirmed,
      deceased,
      recovered,
      tested,
      population,
      active: confirmed - (deceased + recovered),
      overallDate,
      stateName: stateName[0]?.state_name,
      stateImg: stateName[0]?.url,
    }
    this.setState({
      stateData: updatedStateData,
      apiStatus: apiStatusConstants.success,
    })
    const updatedDistrictsList = []
    const districtKeyNames = Object.keys(data[id].districts)
    districtKeyNames.forEach(eachDistrictName => {
      if (districts[eachDistrictName]) {
        const districtWiseConfirmed =
          districts[eachDistrictName].total?.confirmed
        const districtWiseDeceased = districts[eachDistrictName].total?.deceased
        const districtWiseRecovered =
          districts[eachDistrictName].total?.recovered
        const updatedEachDistrict = {
          districtWiseConfirmed,
          districtWiseRecovered,
          districtWiseDeceased,
          districtWiseActive:
            districtWiseConfirmed -
            (districtWiseDeceased + districtWiseRecovered),
          districtName: eachDistrictName,
        }
        updatedDistrictsList.push(updatedEachDistrict)
      }
    })
    this.setState({allDistrictsData: updatedDistrictsList})
  }

  onClickBox = id => {
    this.setState({activeBox: id})
  }

  sortData = () => {
    const {allDistrictsData, activeBox} = this.state
    switch (activeBox) {
      case 'confirmed':
        return allDistrictsData.sort(
          (a, b) => b.districtWiseConfirmed - a.districtWiseConfirmed,
        )
      case 'recovered':
        return allDistrictsData.sort(
          (a, b) => b.districtWiseRecovered - a.districtWiseRecovered,
        )
      case 'deceased':
        return allDistrictsData.sort(
          (a, b) => b.districtWiseDeceased - a.districtWiseDeceased,
        )
      case 'active':
        return allDistrictsData.sort(
          (a, b) => b.districtWiseActive - a.districtWiseActive,
        )
      default:
        return null
    }
  }

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
        onClick={this.getStateDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="state-loader-container" testid="stateDetailsLoader">
      <Loader type="Oval" color="#007bff" height="50" width="50" />
    </div>
  )

  renderStateItem = () => {
    const {stateData, activeBox} = this.state
    const a = this.sortData()
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className="state-bg">
        <div className="state-top">
          <div className="state-left-section">
            <h1 className="state-name-heading">{stateData.stateName}</h1>
            <p>Last Updated On {stateData.overallDate}</p>
          </div>
          <div className="state-right-section">
            <p>Tested</p>
            <p className="tested-count">{stateData.tested}</p>
          </div>
        </div>
        <div className="ul-boxes-container">
          <div
            testid="stateSpecificConfirmedCasesContainer"
            className={
              activeBox === boxes[0]?.id
                ? 'li-box confirmed12 confirmed1'
                : 'li-box confirmed12'
            }
          >
            <li onClick={() => this.onClickBox(boxes[0]?.id)}>
              <p>Confirmed</p>
              <img
                src={boxes[0]?.imageUrl}
                alt="state specific confirmed cases pic"
                className="confirmed-image"
              />
              <p>{stateData?.confirmed}</p>
            </li>
          </div>
          <div
            testid="stateSpecificActiveCasesContainer"
            className={
              activeBox === boxes[1]?.id
                ? 'li-box recovered12 recovered1'
                : 'li-box recovered12'
            }
          >
            <li onClick={() => this.onClickBox(boxes[1]?.id)}>
              <p>Active</p>
              <img
                src={boxes[1]?.imageUrl}
                alt="state specific active cases pic"
                className="confirmed-image"
              />
              <p>{stateData?.active}</p>
            </li>
          </div>
          <div
            testid="stateSpecificRecoveredCasesContainer"
            className={
              activeBox === boxes[2]?.id
                ? 'li-box active12 active1'
                : 'li-box active12'
            }
          >
            <li onClick={() => this.onClickBox(boxes[2]?.id)}>
              <p>Recovered</p>
              <img
                src={boxes[2]?.imageUrl}
                alt="state specific recovered cases pic"
                className="confirmed-image"
              />
              <p>{stateData?.recovered}</p>
            </li>
          </div>
          <div
            testid="stateSpecificDeceasedCasesContainer"
            className={
              activeBox === boxes[3]?.id
                ? 'li-box deceased12 deceased1'
                : 'li-box deceased12'
            }
          >
            <li onClick={() => this.onClickBox(boxes[3]?.id)}>
              <p>Deceased</p>
              <img
                src={boxes[3]?.imageUrl}
                alt="state specific deceased cases pic"
                className="confirmed-image"
              />
              <p>{stateData?.deceased}</p>
            </li>
          </div>
        </div>
        <div className="state-image-cont">
          <img
            src={stateData.stateImg}
            alt={stateData.stateName}
            className="state-image"
          />
          <div className="state-text-content">
            <h1>NCP Report</h1>
            <div className="reports-counts">
              <div>
                <p>Population</p>
                <h1>{stateData.population}</h1>
              </div>
              <div>
                <p>Tested</p>
                <h1>{stateData.tested}</h1>
              </div>
            </div>
          </div>
        </div>
        <h1 className={`top-districts-head ${activeBox}12`}>Top Districts</h1>
        <TopDistrictItems details={a} activeBox={activeBox} />
        <div testid="lineChartsContainer">
          <LineChartItem sName={id} activeBox={activeBox} />
        </div>
      </div>
    )
  }

  renderAll = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderStateItem()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="state-body">
        <Header />
        {this.renderAll()}
        <Footer />
      </div>
    )
  }
}

export default StateItem
