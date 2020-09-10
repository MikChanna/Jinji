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

  const addEmployee = $(".addEmployee");
  const viewMilestones = $(".viewMilestones");
  const onboardingRequirements = $(".onboardingRequirements");

  // When the signup button is clicked, we validate the email and password are not blank
  addEmployee.on("click", function(event) {
    event.preventDefault();
    console.log("You're on a new page");
    window.location.replace("/addemployee");
  });

  //loops through all employees in the database and prints them to the home page at members.html
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

  // event listener for the view milestones button
  viewMilestones.on("click", function(event) {
    event.preventDefault();
    console.log("view milestones button clicked");
    $.get("/api/employees").then(function(data) {
      console.log(data);
      const thisMonthsBdays = [];
      const thisMonthsWorkAnniversaries = [];
      data.forEach(function(employees) {
        const splitBday = employees.birthday.split("-");
        const splitHire_Date = employees.hire_date.split("-");
        const hireMonth = splitHire_Date[1];
        const bdayMonth = splitBday[1];
        const currentMonth = moment().format("MM");
        console.log(
          "current month is: " +
            currentMonth +
            " and bday month is: " +
            bdayMonth +
            " and hire month is: " +
            hireMonth
        );
        if (bdayMonth === currentMonth) {
          thisMonthsBdays.push(employees);
        }
        if (hireMonth === currentMonth) {
          thisMonthsWorkAnniversaries.push(employees);
        }
      });
      renderThisMonthsBdays(thisMonthsBdays);
      renderThisMonthsWorkAnniversaries(thisMonthsWorkAnniversaries);
    });
  });

  function renderThisMonthsBdays(data) {
    $("#search-results").empty();
    console.log(data);
    let bdayHTML = `<br><h3>This month's birthdays</h3><br><table><thead><tr><th>First Name</th><th>Last Name</th><th>Birthday</th></thead><tbody>`;
    data.forEach(function(data) {
      const tableRow = `<tr>
          <th>${data.first_name}</th>
          <th>${data.last_name}</th>
          <th>${data.birthday}</th>
        </tr>`;
      bdayHTML += tableRow;
    });
    bdayHTML += `</tbody></table>`;
    $("#search-results").append(bdayHTML);
  }

  function renderThisMonthsWorkAnniversaries(data) {
    console.log(data);
    let anniversaryHTML = `<br><h3>This month's work anniversaries</h3>
    <br><table><thead>
    <tr><th>First Name</th>
    <th>Last Name</th>
    <th>Hire Date</th>
    <th>Years Employed</th>
    </thead><tbody>`;
    data.forEach(function(data) {
      const hireYear = data.hire_date.slice(0, 4);
      const currentYear = moment().format("YYYY");
      console.log(currentYear);
      console.log(hireYear);
      const yearsEmployed = currentYear - hireYear;
      console.log(yearsEmployed);
      const tableRow = `<tr>
          <th>${data.first_name}</th>
          <th>${data.last_name}</th>
          <th>${data.hire_date}</th>
          <th>${yearsEmployed}</th>
        </tr>`;
      anniversaryHTML += tableRow;
    });
    anniversaryHTML += `</tbody></table>`;
    $("#search-results").append(anniversaryHTML);
  }

  // event listener for the view milestones button
  onboardingRequirements.on("click", function(event) {
    event.preventDefault();
    console.log("onboarding requirements button clicked");
    $.get("/api/employees").then(function(data) {
      console.log(data);
      const incompleteComplianceTraining = [];
      const incompleteOrientation = [];
      data.forEach(function(employees) {
        if (employees.compliance_trainingComplete === "1900-01-01") {
          incompleteComplianceTraining.push(employees);
        }
        if (employees.orientationComplete === "1900-01-01") {
          incompleteOrientation.push(employees);
        }
      });
      renderIncompleteOnboardingTable(
        incompleteComplianceTraining,
        incompleteOrientation
      );
    });
  });

  function renderIncompleteOnboardingTable(noCompliance, noOrientation) {
    $("#search-results").empty();
    let missingOnboardingRequirementsHTML = `<br><h3>Missing onboarding requirements</h3><br>
    <table><thead><tr><th><strong>Missing Requirement</strong></th><th>First name</th>
    <th>Last name</th>
    </thead><tbody><tr>`;

    noCompliance.forEach(function(data) {
      const tableRow = `<tr>
      <th><strong>Compliance training incomplete</strong></th>
      <th>${data.first_name}</th>
      <th>${data.last_name}</th></tr>`;
      missingOnboardingRequirementsHTML += tableRow;
    });

    noOrientation.forEach(function(data) {
      const tableRow = `<tr>
      <th><strong>Orientation incomplete</strong></th>
      <th>${data.first_name}</th>
      <th>${data.last_name}</th></tr>`;
      missingOnboardingRequirementsHTML += tableRow;
    });

    missingOnboardingRequirementsHTML += `</tbody></table>`;
    console.log(missingOnboardingRequirementsHTML);
    $("#search-results").append(missingOnboardingRequirementsHTML);
  }

  // get hobbies from table and render to page.
  const spanHobbies = $("#hobbies");

  $.get("/api/hobbies").then(function(data) {
    console.log(data);
    renderHobbies(data);
  });

  function renderHobbies(data) {
    console.log(data);

    data.forEach(function(data) {
      const hobbyItem = `
        <input type = "checkbox">${data.hobby}<br>`;
      spanHobbies.append(hobbyItem);
    });
  }

  // get allergies from table and render to page.
  const spanAllergies = $("#allergies");

  $.get("/api/allergies").then(function(data) {
    console.log(data);
    renderAllergies(data);
  });

  function renderAllergies(data) {
    console.log(data);

    data.forEach(function(data) {
      const allergyItem = `
          <input type = "checkbox">${data.allergy}<br>`;
      spanAllergies.append(allergyItem);
    });
  }
});
