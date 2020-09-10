$(document).ready(function() {
  const newEmployeeFormSubmit = $(".saveNewEmployee");
  const firstNameInput = $("#first_name");
  const lastNameInput = $("#last_name");
  const birthdayInput = $("#birthday");
  const emailInput = $("#email");
  const hireDateInput = $("#hire_date");
  const orientationInput = $("#orientationComplete");
  const complianceTrainingInput = $("#compliance_trainingComplete");

  newEmployeeFormSubmit.on("click", function(event) {
    event.preventDefault();
    console.log("save button clicked");
    const newEmployee = {
      first_name: firstNameInput.val().trim(),
      last_name: lastNameInput.val().trim(),
      birthday: birthdayInput.val().trim(),
      email: emailInput.val().trim(),
      hire_date: hireDateInput.val().trim(),
      orientationComplete: orientationInput.val().trim(),
      compliance_trainingComplete: complianceTrainingInput.val().trim(),
    };

    if (!newEmployee.orientationCompete) {
      newEmployee.orientationComplete = "1900-01-01";
      console.log(newEmployee.orientationComplete);
    }

    if (!newEmployee.compliance_trainingComplete) {
      newEmployee.compliance_trainingComplete = "1900-01-01";
      console.log(newEmployee.compliance_trainingComplete);
    }

    if (
      !newEmployee.first_name ||
      !newEmployee.last_name ||
      !newEmployee.birthday ||
      !newEmployee.email ||
      !newEmployee.hire_date
    ) {
      return;
    }

    addNewEmployee(
      newEmployee.first_name,
      newEmployee.last_name,
      newEmployee.birthday,
      newEmployee.email,
      newEmployee.hire_date,
      newEmployee.orientationComplete,
      newEmployee.compliance_trainingComplete
    );

    firstNameInput.val("");
    lastNameInput.val("");
    orientationInput.val("");
    emailInput.val("");
    complianceTrainingInput.val("");
    birthdayInput.val("");
    hireDateInput.val("");
  });

  function addNewEmployee(
    first_name,
    last_name,
    birthday,
    email,
    hire_date,
    orientationComplete,
    compliance_trainingComplete,
    food_preference
  ) {
    $.post("api/employees", {
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
        console.log("api called to post new employee");
      })
      .catch(addEmployeeError);
  }

  function addEmployeeError(err) {
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
