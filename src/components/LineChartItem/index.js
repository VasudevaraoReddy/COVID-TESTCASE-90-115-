import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'
import './index.css'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const lineGraphs = [
  {
    id: 'confirmed',
    color: '#ff073a',
  },
  {
    id: 'deceased',
    color: ' #6c757d',
  },
  {
    id: 'recovered',
    color: '#28a745',
  },
  {
    id: 'active',
    color: '#007bff',
  },
  {
    id: 'tested',
    color: '#9673B9',
  },
]

class LineChartItem extends Component {
  state = {allGraphData: [], isLoading: true}

  componentDidMount() {
    this.getCovidTimeLineDetails()
  }

  // eslint-disable-next-line consistent-return
  numFormatter = num => {
    if (num > 999 && num < 1000000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    if (num > 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num < 900) {
      return num
    }
  }

  // eslint-disable-next-line consistent-return
  numFormatter1 = (each, color) => {
    if (each === 'confirmed') {
      return <YAxis stroke={color} />
    }
    if (each === 'deceased') {
      return <YAxis stroke={color} />
    }
    if (each === 'recovered') {
      return <YAxis stroke={color} />
    }
    if (each === 'active') {
      return <YAxis stroke={color} />
    }
    if (each === 'tested') {
      return <YAxis stroke={color} />
    }
  }

  // eslint-disable-next-line consistent-return
  barChartYAxisRender = activeBox => {
    if (activeBox === 'confirmed') {
      return <YAxis stroke="#ff073a" />
    }
    if (activeBox === 'deceased') {
      return <YAxis stroke="#6c757d" />
    }
    if (activeBox === 'recovered') {
      return <YAxis stroke="#28a745" />
    }
    if (activeBox === 'active') {
      return <YAxis stroke="#007bff" />
    }
  }

  dateFormatter = d => {
    const monthFromDate = new Date(d).getMonth()
    return months[monthFromDate]
  }

  getCovidTimeLineDetails = async () => {
    const {sName} = this.props
    const graphData = []
    const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data1 = await response.json()
    const datesFromResponse = data1[`${sName}`].dates
    const dateKeys = Object.keys(datesFromResponse)
    dateKeys.forEach(eachDateKey => {
      if (datesFromResponse[eachDateKey]) {
        const {total} = datesFromResponse[eachDateKey]
        const graphConfirmed = total.confirmed ? total.confirmed : 0
        const graphDeceased = total.deceased ? total.deceased : 0
        const graphRecovered = total.recovered ? total.recovered : 0
        const graphTested = total.tested ? total.tested : 0
        const graphDate = eachDateKey
        const graphVaccinated = total.vaccinated1
          ? total.vaccinated1 + total.vaccinated2
          : 0
        const combinedData = {
          confirmed: graphConfirmed,
          deceased: graphDeceased,
          recovered: graphRecovered,
          tested: graphTested,
          date: graphDate,
          vaccinated: graphVaccinated,
          active: graphConfirmed - (graphDeceased + graphRecovered),
        }
        graphData.push(combinedData)
      }
    })
    this.setState({allGraphData: graphData, isLoading: false})
  }

  renderLoadingView = () => (
    <div className="state-loader-container" testid="timelinesDataLoader">
      <Loader type="Oval" color="#007bff" height="50" width="50" />
    </div>
  )

  renderLineChart = (type, color) => {
    const {allGraphData} = this.state
    return (
      <LineChart data={allGraphData} width={800} height={250}>
        <XAxis dataKey="date" stroke={color} tickCount={1} />
        {this.numFormatter1(type, color)}
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={type} stroke={color} />
      </LineChart>
    )
  }

  renderCharts = () => {
    const {allGraphData} = this.state
    const {activeBox} = this.props
    const a = lineGraphs.filter(each => each.id === activeBox)
    const strokeColor = a[0].color
    return (
      <>
        <div className="barchart-container">
          <div className="chart-wrapper">
            <BarChart data={allGraphData.slice(-10)} width={800} height={300}>
              <XAxis dataKey="date" stroke={strokeColor} />
              {this.barChartYAxisRender(activeBox)}
              <Tooltip />
              <Legend />
              <Bar
                dataKey={`${activeBox}`}
                fill={strokeColor}
                className="bar"
                radius={[8, 8, 0, 0]}
                label={{position: 'top', fill: '#fff'}}
              />
            </BarChart>
          </div>
        </div>
        <h1 className="charts-heading">Daily Spread Trends</h1>
        <div testid="lineChartsContainer" className="barcharts-container">
          <div className="charts graph-page-confirmed">
            {this.renderLineChart('confirmed', '#FF073A')}
          </div>
          <div className="charts graph-page-active">
            {this.renderLineChart('active', '#007BFF')}
          </div>
          <div className="charts graph-page-recovered">
            {this.renderLineChart('recovered', '#27A243')}
          </div>
          <div className="charts graph-page-deceased">
            {this.renderLineChart('deceased', '#6C757D')}
          </div>
          <div className="charts graph-page-tested">
            {this.renderLineChart('tested', '#9673B9')}
          </div>
        </div>
      </>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoadingView() : this.renderCharts()
  }
}

export default LineChartItem
