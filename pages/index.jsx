import Head from 'next/head'
import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'

import InputForm from './../component/inputForm'
import ChartResult from './../component/chartResult'
import Footer from './../component/footer'
import TableResult from './../component/tableResult'

import { getData } from "./../util/initial";

// This gets called on every request
export async function getServerSideProps() {
  console.log("Fetch data from MongoDB Atlas.... ")
  
  // Fetch data from external API
  const res = await getData()
  const data = await res

  // Pass data to the page via props
  return { props: { data } }
}

export default function Home({data}) {

  return (
    <Container className="md-container">
      <Head>
        <title>Health Concept - BP Tracker</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container>
        <div className="left-header">
        <h1>
          Welcome to BP - Tracker!
        </h1>
        
        </div>
        <div className='left-intro'>
        <p>
          Get started by inputting your result...
        </p>
        </div>
        <Container>
          <Row className="justify-content-md-between">
            <InputForm />
          </Row>
          <Row className="justify-content-md-between">
            { data && <TableResult data={data}/> }
          </Row>
          <Row className="justify-content-md-between">
            { data && <ChartResult data={data}/>}
          </Row>
        </Container>
      </Container>

     <Footer />
    </Container>
  )
}
