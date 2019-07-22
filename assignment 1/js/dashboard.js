let tableData = JSON.parse(JSON.stringify(data)); //PARSE JSON TO JS ARRAY
let tableBody = document.getElementById('tableBody'); //TABLE BODY TO APPEND DATA

// INPUTS AND BUTTONS VIA THEIR IDS
let countryInput = document.getElementById('country'); 
let stateInput = document.getElementById('state');
let cityInput = document.getElementById('city');
let searchInput = document.getElementById('searchQuery');
let applyFilters = document.getElementById('applyFilters');
let resetButton = document.getElementById('resetButton');

//INITIAL FILTER AND SEARCH RESULTS i.e, Complete DATA
let results = tableData;

//FUNCTION TO INSTANTIATE SELECT ELEMENT FOR FILTERS
let instantiateSelects = function(tableInfo){
    var countries = Array();
    var states = Array();
    var cities = Array();
    tableInfo.forEach(element => {
        countries.push(element.country);
        states.push(element.state);
        cities.push(element.city);
    });
    var countries = countries.filter( onlyUnique );
    var states = states.filter( onlyUnique );
    var cities = cities.filter( onlyUnique );
    let countryOptions = `<option value="">Select Country</option>`;
    countries.forEach(element => {
        countryOptions += `<option value="${element}">${element}</option>`;
    });
    countryInput.innerHTML = countryOptions;

    let stateOptions = `<option value="">Select State</option>`;
    states.forEach(element => {
        stateOptions += `<option value="${element}">${element}</option>`;
    });
    stateInput.innerHTML = stateOptions;

    let cityOptions = `<option value="">Select State</option>`;
    cities.forEach(element => {
        cityOptions += `<option value="${element}">${element}</option>`;
    });
    cityInput.innerHTML = cityOptions;
};

//FUNCTION TO FILL FILTERED RESULTS INTO TABLE BODY
let fillTable = function (tableInfo){
    let fillable = "";
    tableInfo.forEach(element => {
        fillable += "<tr>";
            fillable += `<td>${element.id}</td>`;
            fillable += `<td>${element.city}</td>`;
            fillable += `<td>${element.phone}</td>`;
            fillable += `<td>${element.state}</td>`;
            fillable += `<td>${element.country}</td>`;
        fillable += "</tr>";
    });
    tableBody.innerHTML = fillable;
};

//REMOVES DUPLICATE ELEMENTS FROM ARRAY
function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

//FILTER RESULTS BY COUNTRY
let filterCountryResults = function (countryValue,type){
    let search = Array();
    results.forEach(element => {
        if(element.country == countryValue)
            {
                search.push(element);
            }
    });
    results = search;
};

//FILTER RESULTS BY STATE
let filterStateResults = function (stateValue){
    let search = Array();
    results.forEach(element => {
        if(element.state == stateValue)
            {
                search.push(element);
            }
    });
    results = search;
};

//FILTER RESULTS BY CITY
let filterCityResults = function (cityValue){
    let search = Array();
    results.forEach(element => {
        if(element.city == cityValue)
            {
                search.push(element);
            }
    });
    results = search;
};

//APPLY FILTER FUNCTION
let processApplyFilters = () => {
    if(countryInput.value.length <= 0 && stateInput.value.length <= 0 && cityInput.value.length <= 0)
        {
            alert("Please Select at least one of the filter");
            results = tableData;
            fillTable(results);
        }   
    else 
        {
            results = tableData;

            if(countryInput.value.length > 0)
                {
                    filterCountryResults(countryInput.value);
                }

            if(stateInput.value.length > 0)
                {
                    filterStateResults(stateInput.value);
                }

            if(cityInput.value.length > 0)
                {
                    filterCityResults(cityInput.value);
                }

            fillTable(results);
        }
};

//RESET ALL SEARCH AND FILTERS
let processResetFilters = function(){
    results = tableData;
    fillTable(results);
};

//SEARCH FUNCTION
let processSearch = function(){
    if(searchInput.value.length <= 0)
        {
            alert("Please Enter Query to Serch !");
        }
    else
        {
            let search = Array();
            tableData.forEach(element => {
                if(element.id.toString(10).includes(searchInput.value) || element.city.includes(searchInput.value) || element.state.includes(searchInput.value) || element.country.includes(searchInput.value) || element.phone.includes(searchInput.value))
                    {
                        search.push(element);
                    }
            });
            if(search.length <= 0)
                {
                    alert("Sorry ! No Results with that Query ");
                }
            results = search;
            fillTable(results);
        }
};

//EVENT LISTENERS FOR EACH BUTTON
applyFilters.addEventListener("click",processApplyFilters);
resetButton.addEventListener("click",processResetFilters);
searchButton.addEventListener("click",processSearch);

//INITIAL CONFIGURATION ON PAGE LOAD
instantiateSelects(tableData);
fillTable(results);