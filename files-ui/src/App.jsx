import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Table } from "react-bootstrap";

const API_HOST = "http://localhost:3000";

const App = () => {
  const [files, setFiles] = useState([]);
  const filesRoute = `${API_HOST}/files/data`;

  const fetchFilesInformation = async () => {
    const filesData = await axios.get(filesRoute);
    console.log(filesData);
  };

  useEffect(() => {
    fetchFilesInformation();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h2>Files Table</h2>
        <Table variant="dark" size="small" striped bordered hover>
          <thead>
            <tr>
              <th scope="col">File Name</th>
              <th scope="col">Text</th>
              <th scope="col">Number</th>
              <th scope="col">Hex</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default App;
