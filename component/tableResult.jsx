
import Table from 'react-bootstrap/Table'

export default function TableResult(props) {

    const { data } = props
    
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
            { !data
                ? (
                  <tr >
                    <td colSpan="3"><i>Loading...</i></td>
                  </tr>
                )
                : (data.length === 0
                  ? (
                    <tr >
                      <td colSpan="3">Data is not available</td>
                    </tr>
                  )
                  : data.map((item, index) => (
            
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