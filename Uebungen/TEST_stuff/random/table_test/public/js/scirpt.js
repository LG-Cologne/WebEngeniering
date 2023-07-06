function generateTable(data) {
    var table = document.createElement("table");
  
    // Create table header row
    var headerRow = table.insertRow();
    for (var key in data[0]) {
      var headerCell = document.createElement("th");
      headerCell.textContent = key;
      headerRow.appendChild(headerCell);
    }
  
    // Create table rows and cells
    data.forEach(function (rowData) {
      var row = table.insertRow();
      for (var key in rowData) {
        var cell = row.insertCell();
        cell.textContent = rowData[key];
      }
    });
  
    var outputDiv = document.getElementById("output");
    outputDiv.appendChild(table);
  }
  
  var data = [
    { Name: "John Doe", Age: 25, City: "New York" },
    { Name: "Jane Smith", Age: 30, City: "San Francisco" },
    { Name: "Bob Johnson", Age: 35, City: "Chicago" }
  ];
  
  generateTable(data);
  