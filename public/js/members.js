$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  $.get("/api/employees").then(function(data) {
    renderAllEmployeeData(data);
  });

  const addEmployee = $(".addEmployee");
  const viewMilestones = $(".viewMilestones");
  const onboardingRequirements = $(".onboardingRequirements");
  const submitSearch = $("#submitSearch");
  const updateEmployee = $(".updateEmployee");

  // When the signup button is clicked, we validate the email and password are not blank
  addEmployee.on("click", function(event) {
    event.preventDefault();
    window.location.replace("/addemployee");
  });

  updateEmployee.on("click", function(event) {
    event.preventDefault();
    window.location.replace("/updateemployee");
  });

  //loops through all employees in the database and prints them to the home page at members.html
  function renderAllEmployeeData(data) {
    let renderAllHTML = `<table><thead><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Birthday</th>
      <th>Hire Date</th><th>Dietary Preference</th></thead><tbody>`;
    data.forEach(function(data) {
      const tableRow = `<tr>
          <th>${data.first_name}</th>
          <th>${data.last_name}</th>
          <th>${data.email}</th>
          <th>${moment(data.birthday).format("MMMM Do YYYY")}</th>
          <th>${moment(data.hire_date).format("MMMM Do YYYY")}</th>
          <th>${data.food_preference}</tr>`;

      renderAllHTML += tableRow;
    });

    renderAllHTML += `</tbody></table>`;
    $("#search-results").append(renderAllHTML);
  }

  // event listener for the view milestones button
  viewMilestones.on("click", function(event) {
    event.preventDefault();
    $.get("/api/employees").then(function(data) {
      const thisMonthsBdays = [];
      const thisMonthsWorkAnniversaries = [];
      data.forEach(function(employees) {
        const splitBday = employees.birthday.split("-");
        const splitHire_Date = employees.hire_date.split("-");
        const hireMonth = splitHire_Date[1];
        const bdayMonth = splitBday[1];
        const currentMonth = moment().format("MM");
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
    let bdayHTML = `<br><h3>This month's birthdays</h3><br><table><thead><tr><th>First Name</th><th>Last Name</th><th>Birthday</th></thead><tbody>`;
    data.forEach(function(data) {
      const tableRow = `<tr>
          <th>${data.first_name}</th>
          <th>${data.last_name}</th>
          <th>${moment(data.birthday).format("MMMM Do YYYY")}</th>
        </tr>`;
      bdayHTML += tableRow;
    });
    bdayHTML += `</tbody></table>`;
    $("#search-results").append(bdayHTML);
  }

  function renderThisMonthsWorkAnniversaries(data) {
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
      const yearsEmployed = currentYear - hireYear;
      const tableRow = `<tr>
          <th>${data.first_name}</th>
          <th>${data.last_name}</th>
          <th>${moment(data.hire_date).format("MMMM Do YYYY")}</th>
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

    $.get("/api/employees").then(function(data) {
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
    <table><thead><tr><th><strong>Missing Requirement</strong></th><th>Name</th>
    </thead><tbody><tr>`;

    noCompliance.forEach(function(data) {
      const tableRow = `<tr>
      <th><strong>Compliance training incomplete</strong></th>
      <th>${data.first_name} ${data.last_name}</th></tr>`;
      missingOnboardingRequirementsHTML += tableRow;
    });

    noOrientation.forEach(function(data) {
      const tableRow = `<tr>
      <th><strong>Orientation incomplete</strong></th>
      <th>${data.first_name} ${data.last_name}</th></tr>`;
      missingOnboardingRequirementsHTML += tableRow;
    });

    missingOnboardingRequirementsHTML += `</tbody></table>`;
    console.log(missingOnboardingRequirementsHTML);
    $("#search-results").append(missingOnboardingRequirementsHTML);
  }

  //event listener for the search button
  submitSearch.on("click", function(event) {
    event.preventDefault();
    $("#myChart").empty();
    const searchResults = [];
    const searchInput = $("#searchInput")
      .val()
      .trim()
      .toLowerCase();

    $.get("/api/employees").then(function(data) {
      data.forEach(function(employees) {
        if (
          employees.first_name.toLowerCase() === searchInput ||
          employees.last_name.toLowerCase() === searchInput ||
          employees.food_preference.toLowerCase() === searchInput ||
          employees.email.toLowerCase() === searchInput
        ) {
          searchResults.push(employees);
        }
        // if (employees.last_name.toLowerCase() === searchInput) {
        //   searchResults.push(employees);
        // }
      });
      renderSearchResults(searchResults);
    });
  });

  function renderSearchResults(searchResults) {
    let searchResultsHTML = `<table><thead><tr><th>First Name</th><th>Last Name</th><th>Email</th><th>Birthday</th>
      <th>Hire Date</th><th>Dietary Preference</th><th>Orientation</th><th>Compliance Training</th></thead><tbody>`;
    searchResults.forEach(function(data) {
      if (data.orientationComplete === "1900-01-01") {
        data.orientationComplete = "Incomplete";
      } else {
        data.orientationComplete = moment(data.orientationComplete).format(
          "MMMM Do YYYY"
        );
      }

      if (data.compliance_trainingComplete === "1900-01-01") {
        data.compliance_trainingComplete = "Incomplete";
      } else {
        data.compliance_trainingComplete = moment(
          data.compliance_trainingComplete
        ).format("MMMM Do YYYY");
      }

      const tableRow = `<tr>
          <th>${data.first_name}</th>
          <th>${data.last_name}</th>
          <th>${data.email}</th>
          <th>${moment(data.birthday).format("MMMM Do YYYY")}</th>
          <th>${moment(data.hire_date).format("MMMM Do YYYY")}</th>
          <th>${data.food_preference}</th>
          <th>${data.orientationComplete}</th>
          <th>${data.compliance_trainingComplete}</th></tr>`;

      searchResultsHTML += tableRow;
    });

    searchResultsHTML += `</tbody></table>`;
    $("#search-results").empty();
    $("#search-results").append(searchResultsHTML);
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

  const ViewFood = $(".companyfood");

  ViewFood.on("click", function(event) {
    event.preventDefault();
    $("#search-results").empty();

    $.get("/api/veggie").then(function(data) {
      const veggie = data.length;
      console.log(veggie);
      $.get("/api/vegan").then(function(data) {
        const vegan = data.length;
        $.get("/api/np").then(function(data) {
          const np = data.length;
          const chart = new Chart(ctx, {
            type: "doughnut",
            data: {
              labels: ["Vegetarian", "Vegan", "No Preference"],
              datasets: [
                {
                  label: "Employees",
                  backgroundColor: ["#F1C40F", "#58D68D", "#A569BD"],
                  fontColor: "white",
                  data: [veggie, vegan, np],
                },
              ],
            },
            options: {
              title: {
                display: true,
                text: "Food Preferences for our Company",
                fontColor: "white",
              },
              legend: {
                labels: {
                  fontColor: "white",
                },
              },
            },
          });
        });
      });
    });
    const foodchart = `<canvas id="myChart"></canvas>`;
    $("#search-results").append(foodchart);
    const ctx = $("#myChart");
  });

  const viewAllergies = $(".allergies");

  viewAllergies.on("click", function(event) {
    event.preventDefault();
    $("#search-results").empty();

    $.get("/api/nut").then(function(data) {
      const nut = data.length;
      console.log(nut);
      $.get("/api/milk").then(function(data) {
        const milk = data.length;
        $.get("/api/soy").then(function(data) {
          const soy = data.length;
          $.get("/api/fish").then(function(data) {
            const fish = data.length;
            $.get("/api/shellfish").then(function(data) {
              const shellfish = data.length;
              const chart = new Chart(ctx, {
                type: "doughnut",
                data: {
                  labels: ["Nut", "Milk", "Soy", "Fish", "Shellfish"],
                  fontColor: "white",
                  datasets: [
                    {
                      label: "Employees",
                      backgroundColor: [
                        "#F1C40F",
                        "#58D68D",
                        "#A569BD",
                        "#E74C3C",
                        "#F8C471",
                      ],
                      data: [nut, milk, soy, fish, shellfish],
                    },
                  ],
                },
                options: {
                  title: {
                    display: true,
                    text: "Allergies",
                    fontColor: "white",
                  },
                  legend: {
                    labels: {
                      fontColor: "white",
                    },
                  },
                },
              });
            });
          });
        });
      });
    });
    const foodchart = `<canvas id="myChart"></canvas>`;
    $("#search-results").append(foodchart);
    const ctx = $("#myChart");
  });

  const viewHobbies = $(".hobbies");

  viewHobbies.on("click", function(event) {
    event.preventDefault();
    $("#search-results").empty();
    insertHobbyChart();
    renderHobbiesHTML();
  });

  function insertHobbyChart() {
    $.get("/api/foodie").then(function(data) {
      const foodie = data.length;

      $.get("/api/outdoors").then(function(data) {
        const outdoors = data.length;
        $.get("/api/sports").then(function(data) {
          const sports = data.length;
          $.get("/api/art").then(function(data) {
            const art = data.length;
            const chart = new Chart(ctx, {
              type: "doughnut",
              data: {
                labels: ["Foodie", "Outdoors", "Sports", "Art"],
                datasets: [
                  {
                    label: "Employees",
                    backgroundColor: [
                      "#F1C40F",
                      "#58D68D",
                      "#A569BD",
                      "#E74C3C",
                    ],
                    data: [foodie, outdoors, sports, art],
                  },
                ],
              },
              options: {
                title: {
                  display: true,
                  text: "Hobbies",
                  fontColor: "white",
                },
                legend: {
                  labels: {
                    fontColor: "white",
                  },
                },
              },
            });
          });
        });
      });
    });
    const chart = `<canvas id="myChart"></canvas>`;
    $("#search-results").prepend(chart);
    const ctx = $("#myChart");
  }

  function renderHobbiesHTML() {
    const hobbiesHTML = `<div>
    <div><h3>Foodie</h3><ul id = "foodiediv"></ul></div>
    <div><h3>Outdoors</h3><ul id = "outdoorsdiv"></ul></div>
    <div><h3>Sports</h3><ul id = "sportsdiv"> </ul></div>
    <div><h3>Art</h3><ul id = "artdiv"></ul></div>
    </div>`;

    $("#search-results").append(hobbiesHTML);
    $.get("/api/foodie").then(function(data) {
      data.forEach(function(employees) {
        const foodies = `
          <li>${employees.first_name} ${employees.last_name}</li>`;
        $("#foodiediv").append(foodies);
      });
    });

    $.get("/api/outdoors").then(function(data) {
      data.forEach(function(employees) {
        const outdoors = `
          <li>${employees.first_name} ${employees.last_name}</li>`;
        $("#outdoorsdiv").append(outdoors);
      });
    });

    $.get("/api/sports").then(function(data) {
      data.forEach(function(employees) {
        const sports = `
          <li>${employees.first_name} ${employees.last_name}</li>`;
        $("#sportsdiv").append(sports);
      });
    });

    $.get("/api/art").then(function(data) {
      data.forEach(function(employees) {
        const art = `
          <li>${employees.first_name} ${employees.last_name}</li>`;
        $("#artdiv").append(art);
      });
    });
  }
});
