import {useEffect, useState} from 'react'
import Chart from 'react-apexcharts'
import './App.css'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col} from 'react-bootstrap'
const App =()=> {

const [beer, setBeer] = useState([])

//useState for price-evolution-chart
const [optionsPresence, setObjectPresence] = useState({
  chart: {
    id: 'apexchart-example'
  },
  xaxis: {
    categories: []
  }
})

const [seriesPresence, setSeriesPresence] = useState([{
  name: 'series-1',
  data: []
}])
//useState for price-evolution-chart

//useState for presence-share-chart
  const [optionsPrice, setObjectPrice] = useState({
    chart: {
      id: 'apexchart-example'
    },
    xaxis: {
      categories: []
    }
  })

  const [seriesPrice, setSeriesPrice] = useState([{
    name: 'series-1',
    data: []
  }])
//useState for presence-share-chart

/****price-evolution-chart****/
  useEffect(() =>{

      const name = []
      const price = []

      axios.get('https://atlantia-dev-test.herokuapp.com/api/price-evolution-chart/').then(response =>{
        console.log('presence-share', response)
        response.data.map(item => {
          console.log('item price-evolution-chart', item)
          name.push(item.name)
          price.push(item.price)
        })
        setObjectPrice({
          chart: {
            id: 'apexchart-example'
          },
          xaxis: {
            categories: name
          }
        })
        setSeriesPrice([{
          name: 'series-1',
          data: price
        }])
  
      })
  },[])

  /****presence-share-chart****/
  useEffect(() =>{

    const name = []
    const presenceShare = []

    axios.get('https://atlantia-dev-test.herokuapp.com/api/presence-share-chart/').then(response =>{
      console.log('presence-share', response)
      response.data.map(item => {
        console.log('item presence-share-chart', item)
        name.push(item.name)
        presenceShare.push(item.presenceShare)
      })
      setObjectPresence({
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: name
        }
      })
      setSeriesPresence([{
        name: 'series-1',
        data: presenceShare
      }])

    })
},[])

  /****presence-share-chart****/
  useEffect(() =>{

    async function fetchData(){
        const response = await fetch('https://atlantia-dev-test.herokuapp.com/api/beer-products/')
        const data = await response.json()
        console.log('beer-products', data)
        setBeer(data)
      }
      fetchData()
  },[])

  return (
    <>
    
    <Row>
        <Col>
          <div className='header'>
            <img src='./src/assets/logo.png' className='img-logo'/>
          </div>
        </Col>
    </Row>

  <Container>
    <Row>
        <Col>
          <p className='title'>General Permormance Analysis</p>
        </Col>
    </Row>

    <Row>
      <Col><p className='sub-title'>Price Evolution</p>
        
        <Chart options={optionsPrice} series={seriesPrice} type="line" width={600} height={500} />
      </Col>
      <Col>
        <p className='sub-title'>Presence Share by Product </p>
      <Chart options={optionsPresence} series={seriesPresence} type="bar" width={300} height={500} />
      </Col>
    </Row>

    <Row>
        <Col>
          <p className='sub-title'>Comparative Analysis</p>
        </Col>
    </Row>

    <Row>
        <Col>
        <table>
          <thead>
          <tr className='table-tr'>
            <th></th>
            <th>Nombre</th>
            <th>SKU</th>
            <th>% Presencia</th>
            <th>Av. Price</th>
            <th>Av. Position</th>
          </tr>
          </thead>
          <tbody>
            {beer.map(i =>{
              return(
                <>
                <tr>
                  <td>
                    <img src={i.productImage} className="img-table"/>
                  </td>
                <td>
                  {i.name}
                </td>
                <td>
                  {i.sku}
                </td>
                <td  style={i.persistence > 0 ? { color: '#23B794'} : { color: '#D6215B'} }>{i.persistence} %</td>
                <td>
                  {i.averagePrice}
                  </td>
                <td>
                  {i.averagePosition}
                </td>
                </tr>
                  </>
                )
              })}
            </tbody>
            </table>
        </Col>
    </Row>

  </Container>
    </>
  )

}

export default App
