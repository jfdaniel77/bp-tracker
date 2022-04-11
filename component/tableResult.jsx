
import Table from 'react-bootstrap/Table'

export default function TableResult(props) {

    const { data } = props
    var orderedData = data.sort((a, b) => (a.timestamp > b.timestamp) ? -1 : 1)
    
    return (
        
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Date</th>
                <th>Systolic</th>
                <th>Diastolic</th>
                </tr>
            </thead>
            <tbody>
            { !orderedData
                ? (
                  <tr >
                    <td colSpan="3"><i>Loading...</i></td>
                  </tr>
                )
                : (orderedData.length === 0
                  ? (
                    <tr >
                      <td colSpan="3">Data is not available</td>
                    </tr>
                  )
                  : orderedData.map((item, index) => (
            
                    <tr key={index}>
                    <td>{item.dateTaken}</td>
                    <td>{item.systolic}</td>
                    <td>{item.diastolic}</td>
                    </tr>
                
                )))
              }

            </tbody>
           
        </Table>
        
    );
}