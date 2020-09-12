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
    if (employee.allergy === "Nut") {
      $("#nut").attr("checked", "checked");
    }
    if (employee.allergy === "Milk") {
      $("#milk").attr("checked", "checked");
    }
    if (employee.allergy === "Nut") {
      $("#nut").attr("checked", "checked");
    }
    if (employee.allergy === "Fish") {
      $("#fish").attr("checked", "checked");
    }
    if (employee.allergy === "Shellfish") {
      $("#shellfish").attr("checked", "checked");
    }
    if (employee.hobby === "Sports") {
      $("#sports").attr("checked", "checked");
    }
    if (employee.hobby === "Art") {
      $("#art").attr("checked", "checked");
    }
    if (employee.hobby === "Outdoors") {
      $("#outdoors").attr("checked", "checked");
    }
    if (employee.hobby === "Foodie") {
      $("#foodie").attr("checked", "checked");
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
    console.log(employeeInQuestion);
    const updatedEmployee = {
      first_name: firstNameInput.val(),
      last_name: lastNameInput.val(),
      birthday: birthdayInput.val(),
      email: emailInput.val(),
      hire_date: hireDateInput.val(),
      orientationComplete: orientationCompleteInput.val(),
      compliance_trainingComplete: compliance_trainingCompleteInput.val(),
    };
    console.log(updatedEmployee);

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
    first_name,
    last_name,
    birthday,
    email,
    hire_date,
    orientationComplete,
    compliance_trainingComplete
  ) {
    const apiReference = "/api/employees/" + employeeInQuestion;

    $.ajax({
      method: "PUT",
      url: apiReference,
      data: {
        first_name: first_name,
        last_name: last_name,
        birthday: birthday,
        email: email,
        hire_date: hire_date,
        orientationComplete: orientationComplete,
        compliance_trainingComplete: compliance_trainingComplete,
        food_preference: radiocheckFood(),
        allergy: radiocheckAllergy(),
        hobby: radiocheckHobby(),
      },
    }).then(function() {
      console.log("successfully updated employee");
      window.location.replace("/members");
    });
  }

  function radiocheckFood() {
    const foodpref = $("input[name='food']:checked").val();
    if (foodpref) {
      console.log(foodpref);
      return foodpref;
    }
  }
  function radiocheckAllergy() {
    const allergypref = $("input[name='allergy']:checked").val();
    if (allergypref) {
      console.log(allergypref);
      return allergypref;
    }
  }
  function radiocheckHobby() {
    const hobbypref = $("input[name='hobby']:checked").val();
    if (hobbypref) {
      console.log(hobbypref);
      return hobbypref;
    }
  }
});
