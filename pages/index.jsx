import Head from "next/head";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";

import InputForm from "./../component/inputForm";
import ChartResult from "./../component/chartResult";
import Footer from "./../component/footer";
import TableResult from "./../component/tableResult";
import Header from "./../component/header";

import { getData } from "./../util/initial";

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await getData();
  const data = await res;

  // Pass data to the page via props
  return { props: { data } };
}

export default function Home({ data }) {
  const [displayTable, setDisplayTable] = useState(false)
  const [displayChart, setDisplayChart] = useState(false)

  return (
    <Container className="md-container">
      <Head>
        <title>Health Concept - BP Tracker</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <Container>
       <Header />
        <Container fluid>
          <Row className="justify-content-center">
            <InputForm />
          </Row>
          {displayTable && data && (
            <Row className="justify-content-md-between">
              <Container>
                <Row>
                  <TableResult data={data} />
                </Row>
              </Container>
            </Row>
          )}
          {displayChart && data && (
            <Row className="justify-content-md-between">
              <Container>
                <Row>
                  <ChartResult data={data} />
                </Row>
              </Container>
            </Row>
          )}
        </Container>
      </Container>

      <Footer />
    </Container>
  );
}
