import Head from "next/head";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";

import InputForm from "./../component/inputForm";
import Footer from "./../component/footer";
import TableResult from "./../component/tableResult";
import Header from "./../component/header";

import { getData } from "./../util/initial";

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await getData();
  const initialData = await res;

  // Pass data to the page via props
  return { props: { initialData } };
}

export default function Home({ initialData }) {
  const [displayTable, setDisplayTable] = useState(true);
  const [data, setData] = useState(initialData);

  const changeData = (newData) => {
    setData(newData);
  };

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
            <InputForm handleNewData={changeData} />
          </Row>
          {displayTable && data && (
            <Row className="justify-content-md-between">
              <Container className="md-container-table">
                <Row className="center-header-table">
                  <hi>List of Records</hi>
                </Row>
                <Row>
                  <TableResult data={data} />
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
