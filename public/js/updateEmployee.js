$(document).ready(function() {
  fillDropdownMenu();
  const employeeOptions = $("#employeeOptions");
  const nextButton = $(".selectEmployeeToUpdate");
  const firstNameInput = $("#first_name");
  const lastNameInput = $("#last_name");
  const emailInput = $("#email");
  const birthdayInput = $("#birthday");
  const hireDateInput = $("#hire_date");
  const orientationCompleteInput = $("#orientationComplete");
  const compliance_trainingCompleteInput = $("#compliance_trainingComplete");
  const updateEmployeeButton = $(".updateEmployeeButton");
  let allEmployees = {};
  let employeeInQuestion;

  function fillDropdownMenu() {
    $.get("/api/employees").then(function(data) {
      let optionsHTML = ``;
      allEmployees = data;
      data.forEach(function(employees) {
        optionsHTML += `<option value= ${employees.id}>${employees.first_name} ${employees.last_name} </option>`;
      });
      employeeOptions.append(optionsHTML);
    });
  }

  function renderPreFilledForm(employee) {
    firstNameInput.text(`${employee.first_name}`);
    lastNameInput.text(`${employee.last_name}`);
    emailInput.text(`${employee.email}`);
    hireDateInput.text(`${employee.hire_date}`);
    birthdayInput.text(`${employee.birthday}`);
    orientationCompleteInput.text(`${employee.orientationComplete}`);
    compliance_trainingCompleteInput.text(
      `${employee.compliance_trainingComplete}`
    );
    if (employee.food_preference === "Vegan") {
      $("#vegan").attr("checked", "checked");
    }
    if (employee.food_preference === "Vegetarian") {
      $("#vegetarian").attr("checked", "checked");
    }
    if (employee.food_preference === "No Preference") {
      $("#np").attr("checked", "checked");
    }
    employeeInQuestion = employee.id;
  }

  nextButton.on("click", function(event) {
    event.preventDefault();
    const selectedEmployeeID = $("#employeeOptions").val();
    allEmployees.forEach(function(data) {
      if (JSON.parse(data.id) === JSON.parse(selectedEmployeeID)) {
        renderPreFilledForm(data);
      }
    });
  });

  updateEmployeeButton.on("click", function(event) {
    event.preventDefault();
    const updatedEmployee = {
      id: employeeInQuestion,
      first_name: firstNameInput.val().trim(),
      last_name: lastNameInput.val().trim(),
      birthday: birthdayInput.val().trim(),
      email: emailInput.val().trim(),
      hire_date: hireDateInput.val().trim(),
      orientationComplete: orientationCompleteInput.val().trim(),
      compliance_trainingComplete: compliance_trainingCompleteInput
        .val()
        .trim(),
    };

    if (!updatedEmployee.orientationCompete) {
      updatedEmployee.orientationComplete = "1900-01-01";
    }

    if (!updatedEmployee.compliance_trainingComplete) {
      updatedEmployee.compliance_trainingComplete = "1900-01-01";
    }

    if (
      !updatedEmployee.first_name ||
      !updatedEmployee.last_name ||
      !updatedEmployee.birthday ||
      !updatedEmployee.email ||
      !updatedEmployee.hire_date
    ) {
      return;
    }

    updateEmployee(
      updatedEmployee.id,
      updatedEmployee.first_name,
      updatedEmployee.last_name,
      updatedEmployee.birthday,
      updatedEmployee.email,
      updatedEmployee.hire_date,
      updatedEmployee.orientationComplete,
      updatedEmployee.compliance_trainingComplete
    );

    firstNameInput.val("");
    lastNameInput.val("");
    orientationInput.val("");
    emailInput.val("");
    complianceTrainingInput.val("");
    birthdayInput.val("");
    hireDateInput.val("");
  });

  function updateEmployee(
    id,
    first_name,
    last_name,
    birthday,
    email,
    hire_date,
    orientationComplete,
    compliance_trainingComplete,
    food_preference
  ) {
    const apiReference = `"/api/employees/${id}"`;
    //logging correctly
    console.log(apiReference);
    $.put(apiReference, {
      first_name: first_name,
      last_name: last_name,
      birthday: birthday,
      email: email,
      hire_date: hire_date,
      orientationComplete: orientationComplete,
      compliance_trainingComplete: compliance_trainingComplete,
      food_preference: radiocheck(),
    })
      .then(function(data) {
        window.location.replace("/members");
        console.log("employee updated");
      })
      .catch(updateEmployeeError);
  }

  function updateEmployeeError(err) {
    console.log(err.responseJSON);
  }

  function radiocheck() {
    const foodpref = $("input[name='food']:checked").val();
    if (foodpref) {
      console.log(foodpref);
      return foodpref;
    }
  }
});
