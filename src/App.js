import React from 'react';
import ReactDOM from 'react-dom';
import csv from 'csv';
import Dropzone from 'react-dropzone';

import './App.css';

function createTable (props) {
    let table = []
    // Outer loop to create parent
    for (let i = 0; i < props.length; i++) {
      let children = []
      //Inner loop to create children
      for (let j = 0; j < props[i].length; j++) {
        children.push(<td>{props[i][j]}</td>)
      }
      //Create the parent and add the children
      table.push(<tr>{children}</tr>)
    };
    table.push(<tr><td align="center" colSpan={props[0].length}><input type="button" value="Save" /></td></tr>);
    return table;
}

function App() {
  console.log("TEST");
  return (
  <div className="App">
    <header className="App-header">
      Ventera Code Challange by John Sun, 08.16.2019
    </header>

    <p>Student Unit Conversion Grade.</p>

    <Dropzone onDrop={file => {
        var reader = new FileReader();
        reader.onload = function(event) {
           // event.target.result contains base64 encoded image
            console.log("==>"+event.target.result);
			csv.parse(event.target.result, (err, data) => {
				console.log(data);
				ReactDOM.render(<table> { createTable(data) }</table>, document.getElementById('results'));
			});
        };
        reader.readAsBinaryString(file[0]);
     }}>
     {({getRootProps, getInputProps}) => (
	    <div className="container">
	      <div
	        {...getRootProps({
	          className: 'dropzone',
	        })}
	      >
	        <input {...getInputProps()} />
	        <p>Drag 'n' drop student.csv files here, or click to select files</p>
	      </div>
          <div id="results" align="center"/>
	    </div>
	  )}
	  </Dropzone>
    <p><a href="https://codepen.io/gaearon/pen/GjPyQr?editors=">Try It on CodePan</a></p>
    </div>
  );
}
export default App;
