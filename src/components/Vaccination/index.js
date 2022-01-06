import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Vaccination extends Component {
  render() {
    return (
      <>
        <Header activeTabId="vaccination" />
        <div className="vaccination-body">
          <h1>VACCINE</h1>
        </div>
        <Footer />
      </>
    )
  }
}

export default Vaccination
