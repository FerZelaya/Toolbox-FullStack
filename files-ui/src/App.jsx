import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Table } from "react-bootstrap";
import { useId } from "react";

const API_HOST = "http://localhost:3000";

const App = () => {
  const [files, setFiles] = useState([]);
  const id = useId();
  const filesRoute = `${API_HOST}/files/data`;

  const fetchFilesInformation = async () => {
    const filesData = await axios.get(filesRoute);
    setFiles(filesData.data);
  };

  useEffect(() => {
    fetchFilesInformation();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h2>Files Table</h2>
        <div className="table-container">
          <Table variant="dark" size="sm" striped bordered hover>
            <thead>
              <tr>
                <th scope="col">File Name</th>
                <th scope="col">Text</th>
                <th scope="col">Number</th>
                <th scope="col">Hex</th>
              </tr>
            </thead>
            <tbody>
              {files.length > 0 ? (
                files.map((file, index) => {
                  return file.lines.map((info, indexInfo) => {
                    return (
                      <tr key={id + index + indexInfo}>
                        <td>{file.file}</td>
                        <td>{info.text}</td>
                        <td>{info.number}</td>
                        <td>{info.hex}</td>
                      </tr>
                    );
                  });
                })
              ) : (
                <tr>
                  <td>No Files</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default App;
