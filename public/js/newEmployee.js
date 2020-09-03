$(document).on("click", ".saveNewEmployee", addNewEmployee);

function addNewEmployee() {
  event.preventDefault;

  const firstNameInput = $("#first_name")
    .val()
    .trim();
  const lastNameInput = $("#last_name")
    .val()
    .trim();
  const birthdayInput = $("#birthday")
    .val()
    .trim();
  const hireDateInput = $("#hire_date")
    .val()
    .trim();
  const orientationInput = $("#orientationComplete")
    .val()
    .trim();
  const complianceTrainingInput = $("#compliance_trainingComplete")
    .val()
    .trim();
  const employeeData = {
    first_name: firstNameInput,
    last_name: lastNameInput,
    birthday: birthdayInput,
    hire_date: hireDateInput,
    orientationComplete: orientationInput,
    compliance_trainingComplete: complianceTrainingInput,
  };
  console.log("save new employee button clicked");
  $.post("/api/employees", employeeData);
}

// //for adding the hobbies and allergies, i think we need something like this
// Promise.all([Employee.create(), Allergy.create()]).then(([allergy, employee]) =>
//   allergyAssociation.create({ userId: user.id, cityId: city.id })
// );
