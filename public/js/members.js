$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  $.get("/api/employees").then(function(data) {
    console.log(data);
    renderAllEmployeeData(data);
  });

  function renderAllEmployeeData(data) {
    console.log(data);
    let renderAllHTML = `<table><thead><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Birthday</th>
      <th>Hire Date</th><th>Orientation Complete</th><th>Compliance Training Complete</th></thead><tbody>`;
    data.forEach(function(data) {
      const tableRow = `<tr>
          <th>${data.first_name}</th>
          <th>${data.last_name}</th>
          <th>${data.email}</th>
          <th>${data.birthday}</th>
          <th>${data.hire_date}</th>
          <th>${data.orientationComplete}</th>
          <th>${data.compliance_trainingComplete}</th>
        </tr>`;

      renderAllHTML += tableRow;
    });

    renderAllHTML += `</tbody></table>`;
    $("#search-results").append(renderAllHTML);
  }
});
