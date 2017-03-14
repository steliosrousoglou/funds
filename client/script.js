	//used to denote which query is currently being handled, toggles as links between queries are clicked, resets when all forms are cleared
	var queryType = 0;

	function clearAllForms() {
	    document.getElementById("awardFormSearch").style.display="none";
	    document.getElementById("awardFormUpdate").style.display="none";
	    document.getElementById("awardFormAdd").style.display="none";
  		document.getElementById("allocationFormSearch").style.display="none";
  		document.getElementById("allocationFormUpdate").style.display="none";
  		document.getElementById("allocationFormAdd").style.display="none";
  		document.getElementById("studentFormSearch").style.display="none";
  		document.getElementById("studentFormUpdate").style.display="none";
  		document.getElementById("studentFormAdd").style.display="none";
  		document.getElementById("collaboratorFormSearch").style.display="none";
  		document.getElementById("collaboratorFormUpdate").style.display="none";
  		document.getElementById("collaboratorFormAdd").style.display="none";
  		document.getElementById("resultTable").innerHTML="";
  		document.getElementById("tableLeft").innerHTML = "";
  		document.getElementById("tableRight").innerHTML = "";
  		document.getElementById("awardFormUpdate").reset();
  		document.getElementById("awardFormAdd").reset();
  		document.getElementById("allocationFormUpdate").reset();
  		document.getElementById("allocationFormAdd").reset();
  		document.getElementById("studentFormUpdate").reset();
  		document.getElementById("studentFormAdd").reset();
  		queryType = 0;
  		
	}

  	window.onload=function() {
  	    //Initial form displays
  	    clearAllForms();

  	    var awardFormSearch = document.getElementById("awardSearch");
  	    var awardFormUpdate = document.getElementById("awardUpdate");
  	    var awardFormAdd = document.getElementById("awardAdd");
  	    var awardShowAll = document.getElementById("showAllAward");

  	    var allocationFormSearch = document.getElementById("allocationSearch");
  	    var allocationFormUpdate = document.getElementById("allocationUpdate");
  	    var allocationFormAdd = document.getElementById("allocationAdd");
  	    var allocationShowAll = document.getElementById("showAllAllocation");

  		var studentFormSearch = document.getElementById("studentSearch");
  		var studentFormUpdate = document.getElementById("studentUpdate");
  		var studentFormAdd = document.getElementById("studentAdd");
  		var studentShowAll = document.getElementById("showAllStudent");

  		var collaboratorFormSearch = document.getElementById("collaboratorSearch");
  		var collaboratorFormUpdate = document.getElementById("collaboratorUpdate");
  		var collaboratorFormAdd = document.getElementById("collaboratorAdd");
  		var collaboratorShowAll = document.getElementById("showAllCollaborator");

  		awardFormSearch.addEventListener("click", awardFormReq, false);
  		awardFormSearch.req = 0;
  		awardFormUpdate.addEventListener("click", awardFormReq, false);
  		awardFormUpdate.req = 1;
  		awardFormAdd.addEventListener("click", awardFormReq, false);
  		awardFormAdd.req = 2;
  		awardShowAll.addEventListener("click", awardFormReq, false);
  		awardShowAll.req = 3;

  		allocationFormSearch.addEventListener("click", allocationFormReq, false);
  		allocationFormSearch.req = 0;
  		allocationFormUpdate.addEventListener("click", allocationFormReq, false);
  		allocationFormUpdate.req = 1;
  		allocationFormAdd.addEventListener("click", allocationFormReq, false);
  		allocationFormAdd.req = 2;
  		allocationShowAll.addEventListener("click", allocationFormReq, false);
  		allocationShowAll.req = 3;

  		studentFormSearch.addEventListener("click", studentFormReq, false);
  		studentFormSearch.req = 0;
  		studentFormUpdate.addEventListener("click", studentFormReq, false);
  		studentFormUpdate.req = 1;
  		studentFormAdd.addEventListener("click", studentFormReq, false);
  		studentFormAdd.req = 2;
  		studentShowAll.addEventListener("click", studentFormReq, false);
  		studentShowAll.req = 3;

  		collaboratorFormSearch.addEventListener("click", collaboratorFormReq, false);
  		collaboratorFormSearch.req = 0;
  		collaboratorFormUpdate.addEventListener("click", collaboratorFormReq, false);
  		collaboratorFormUpdate.req = 1;
  		collaboratorFormAdd.addEventListener("click", collaboratorFormReq, false);
  		collaboratorFormAdd.req = 2;
  		collaboratorShowAll.addEventListener("click", collaboratorFormReq, false);
  		collaboratorShowAll.req = 3;
	}
	
	
	//For Award search, provide a show all awards list, with hyperlinks that bring up a specific award view
	function studentFormReq (evt) {
		evt.preventDefault();
		queryType = 3;
		var endpoint = '';
		var formInputs;
		switch (evt.target.req) {
			case 0:
				formInputs = document.getElementById("studentFormSearch").elements;
				endpoint = '/get_student';
				break;
			case 1:
				formInputs = document.getElementById("studentFormUpdate").elements;
				endpoint = '/update_student';
				break;
			case 2:
				formInputs = document.getElementById("studentFormAdd").elements;
				endpoint = '/add_student';
				break;
			case 3:
				formInputs = document.getElementById("studentFormSearch").elements;
				endpoint = '/get_all_students';
				break;
		}
		var obj = {};
		console.log(formInputs);
		var invalid = false;
		for(var i = 0 ; i < formInputs.length ;i++) {
	        var item = formInputs.item(i);
	        // to weed out empty form inputs
	        if (item.value.length <= 1) {
	        	invalid = true;
	        	console.log("HERE");
	        }
	        else {
	          obj[item.name] = item.value;
	          console.log(item.value);
	        }
	    }
	    //clear up the check on which fields are required for add
	    // if (invalid && evt.target.dbReq == 1) {
	    // 	throw("Please complete all fields");
	    // }
	    console.log(obj);
	    var jsonObj = JSON.stringify(obj);
	    //try catch here maybe?
	    console.log(jsonObj);
	    // var body = evt.target.dbReq == 2? "" : body;
	    fetch(endpoint, {
		    method:'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: jsonObj })
		    .then(res => res.json())
		    .then (res => renderResults(res))
		    //it is still catching an error?
		    // .then(res => console.log(res))
		  //   .then(res => {
		  //     if (res === 'fail') alert("Student Query Failed");
		  //     else JSON.parse(res.text())
		  //     })
		  // .then(res => console.log(res)) // Pass json to a results displaying function
		  .catch((e) => console.log(e));
	};

	
	function allocationFormReq (evt) {
		evt.preventDefault();
		queryType = 2;
		var endpoint = '';
		var formInputs;
		switch (evt.target.req) {
			case 0:
				formInputs = document.getElementById("allocationFormSearch").elements;
				endpoint = '/get_project';
				break;
			case 1:
				formInputs = document.getElementById("allocationFormUpdate").elements;
				endpoint = '/update_project';
				break;
			case 2:
				formInputs = document.getElementById("allocationFormAdd").elements;
				endpoint = '/add_project';
				break;
			case 3:
				formInputs = document.getElementById("allocationFormSearch").elements;
				endpoint = '/get_all_projects';
				break;
		}
		var obj = {};
		console.log(formInputs);
		var invalid = false;
		for(var i = 0 ; i < formInputs.length ;i++) {
	        var item = formInputs.item(i);
	        // to weed out empty form inputs
	        if (item.value.length <= 1) {
	        	invalid = true;
	        	console.log("HERE");
	        }
	        else {
	          obj[item.name] = item.value;
	          console.log(item.value);
	        }
	    }
	    //clear up the check on which fields are required for add
	    // if (invalid && evt.target.dbReq == 1) {
	    // 	throw("Please complete all fields");
	    // }
	    console.log(obj);
	    var jsonObj = JSON.stringify(obj);
	    //try catch here maybe?
	    console.log(jsonObj);
	    // var body = evt.target.dbReq == 2? "" : body;
	    console.log(endpoint);
	    fetch(endpoint, {
		    method:'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: jsonObj })
		    .then(res => res.json())
		    .then (res => renderResults(res))
		    //it is still catching an error?
		    // .then(res => console.log(res))
		  //   .then(res => {
		  //     if (res === 'fail') alert("Award Query Failed");
		  //     else JSON.parse(res.text())
		  //     })
		  // .then(res => console.log(res)) // Pass json to a results displaying function
		  .catch((e) => console.log(e));
		
	};
	
	function collaboratorFormReq (evt) {
		evt.preventDefault();
		queryType = 4;
	};

	function awardFormReq (evt) {
		evt.preventDefault();
		queryType = 1;
		var endpoint = '';
		var formInputs;
		switch (evt.target.req) {
			case 0:
				formInputs = document.getElementById("awardFormSearch").elements;
				endpoint = '/get_award';
				break;
			case 1:
				formInputs = document.getElementById("awardFormUpdate").elements;
				endpoint = '/update_award';
				break;
			case 2:
				formInputs = document.getElementById("awardFormAdd").elements;
				endpoint = '/add_award';
				break;
			case 3:
				formInputs = document.getElementById("awardFormSearch").elements;
				endpoint = '/get_all_awards';
				break;
		}
		var obj = {};
		console.log(formInputs);
		var invalid = false;
		for(var i = 0 ; i < formInputs.length ;i++) {
	        var item = formInputs.item(i);
	        // to weed out empty form inputs
	        if (item.value.length <= 1) {
	        	invalid = true;
	        	console.log("HERE");
	        }
	        else {
	          obj[item.name] = item.value;
	          console.log(item.value);
	        }
	    }
	    //clear up the check on which fields are required for add
	    // if (invalid && evt.target.dbReq == 1) {
	    // 	throw("Please complete all fields");
	    // }
	    console.log(obj);
	    var jsonObj = JSON.stringify(obj);
	    //try catch here maybe?
	    console.log(jsonObj);
	    // var body = evt.target.dbReq == 2? "" : body;
	    fetch(endpoint, {
		    method:'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: jsonObj })
		    .then(res => res.json())
		    .then(res => renderResults(res))
		    // .then (res => renderResults(res))
		    //it is still catching an error?
		    // .then(res => console.log(res))
		  //   .then(res => {
		  //     if (res === 'fail') alert("Award Query Failed");
		  //     else JSON.parse(res.text())
		  //     })
		  // .then(res => console.log(res)) // Pass json to a results displaying function
		  .catch((e) => console.log(e));
	};
	
	function detailedResult (json) {
		var tableLeft = document.getElementById("tableLeft");
	    tableLeft.innerHTML = "";
	    var tableRight = document.getElementById("tableRight");
		tableRight.innerHTML = "";
		var jsonObj = JSON.parse(json);
		var left = true;
		for (var key in jsonObj) {
			// console.log(key + jsonObj[key]);
			var tableInsert = left? tableLeft: tableRight;
			left = left? false : true;
			var row = tableInsert.insertRow(-1);
			var col1 = row.insertCell(-1);
			var col2 = row.insertCell(-1);
			col1.innerHTML = key;
			col2.innerHTML = jsonObj[key];
		}
		var leftRows = tableLeft.rows;
		var rightRows = tableRight.rows;
		createResultLinks(leftRows);
		createResultLinks(rightRows);
		
	};
	
	function createResultLinks(rows) {
		console.log("current type is " + queryType);
		for (var i = 0; i < rows.length; i++) {
			//award -> allocation
			if (queryType == 1 && (rows[i].cells[0].innerHTML == "finance_award_no"
			|| rows[i].cells[0].innerHTML == "funding_body_ref")) {
				var obj = {};
				obj[rows[i].cells[0].innerHTML] = rows[i].cells[1].innerHTML;
				var jsonObj = JSON.stringify(obj);
				console.log("adding allocation click");
				createAllocationClick(rows[i], jsonObj);
			}
			//award or allocation -> student
			if (queryType != 3 && rows[i].cells[0].innerHTML == "my_finance_code") {
				var obj = {};
				obj[rows[i].cells[0].innerHTML] = rows[i].cells[1].innerHTML;
				var jsonObj = JSON.stringify(obj);
				console.log("adding student click");
				createStudentClick(rows[i], jsonObj);
			}
			//allocation -> award
			if (queryType == 2 && (rows[i].cells[0].innerHTML == "finance_award_no"
			|| rows[i].cells[0].innerHTML == "funding_body_ref")) {
				var obj = {};
				obj[rows[i].cells[0].innerHTML] = rows[i].cells[1].innerHTML;
				var jsonObj = JSON.stringify(obj);
				console.log("adding award click");
				createAwardClick(rows[i], jsonObj);
			}
			//student -> allocation
			if (queryType == 3 && rows[i].cells[0].innerHTML == "my_finance_code") {
				var obj = {};
				obj[rows[i].cells[0].innerHTML] = rows[i].cells[1].innerHTML;
				var jsonObj = JSON.stringify(obj);
				console.log("adding allocation click");
				createAllocationClick(rows[i], jsonObj);
			} 
		}	
	};
	
		
	function createAwardClick(row, jsonObj) {
		row.onclick = function () { 
			awardLinkQuery(jsonObj);
		};
		//function to call a get request/search endpoint, and if successful clear forms, then render results}
	};
	
	function createAllocationClick(row, jsonObj) {
		//function to call a get request/search endpoint, and if successful clear forms, then render results}
		row.onclick = function () {
			allocationLinkQuery(jsonObj);
		};
	}
	
	function createStudentClick(row, jsonObj) {
		//function to call a get request/search endpoint, and if successful clear forms, then render results}
		row.onclick = function () {
			studentLinkQuery(jsonObj);
		};
	}
	
	function awardLinkQuery(jsonObj) {
		console.log("queryType was " + queryType.toString());
		queryType = 1;
		console.log("searching for awardLink with " + jsonObj);
		fetch('/get_award', {
		    method:'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: jsonObj })
		    .then(res => res.json())
		    //change query type here within a function/kind of like try/catching
		    .then (res => renderResults(res))
		    //it is still catching an error?
		    // .then(res => console.log(res))
		  //   .then(res => {
		  //     if (res === 'fail') alert("Award Query Failed");
		  //     else JSON.parse(res.text())
		  //     })
		  // .then(res => console.log(res)) // Pass json to a results displaying function
		  .catch((e) => console.log(e));
	}
	
	function allocationLinkQuery(jsonObj) {
		console.log("queryType was " + queryType.toString());
		queryType = 2;
		console.log("searching for allocationLink with " + jsonObj);
		fetch('/get_project', {
		    method:'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: jsonObj })
		    .then(res => res.json())
		    .then (res => renderResults(res))
		    //it is still catching an error?
		    // .then(res => console.log(res))
		  //   .then(res => {
		  //     if (res === 'fail') alert("Award Query Failed");
		  //     else JSON.parse(res.text())
		  //     })
		  // .then(res => console.log(res)) // Pass json to a results displaying function
		  .catch((e) => console.log(e));
	}
	
	function studentLinkQuery(jsonObj) {
		console.log("queryType was " + queryType.toString());
		queryType = 3;
		console.log("searching for studentLink with " + jsonObj);
		fetch('/get_student', {
		    method:'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: jsonObj })
		    .then(res => res.json())
		    .then (res => renderResults(res))
		    //it is still catching an error?
		    // .then(res => console.log(res))
		  //   .then(res => {
		  //     if (res === 'fail') alert("Award Query Failed");
		  //     else JSON.parse(res.text())
		  //     })
		  // .then(res => console.log(res)) // Pass json to a results displaying function
		  .catch((e) => console.log(e));
	}
	
	// award -> allocation search by myFinance award no and FundingBody reference
	// award -> student search by myFinance project code
	
	// allocation->award search by myFinance award no
	// allocation->student search by myFinance project code
	
	// student can only get to allocation
	// 	via search by myFinance project code
	
	function createRowClick(row, text) {
		row.onclick = function () {
			detailedResult(text);
		};
	}

	function renderResults(jsonObj) {
		console.log("rendering");
		console.log(jsonObj);
		if (jsonObj.length == 0) {
			console.log("No results returned.");
			return;
		}
		//create table, then create header table
		var table = document.createElement("TABLE");
    	table.border = "1";
    	var columns = jsonObj[0].length;
    	var row = table.insertRow(-1); 
    	//headers of result table will be the keys of database
    	for (var key in jsonObj[0]) {
    		var headerCell = row.insertCell(-1);
	        headerCell.innerHTML = key;
    	}
    	//add the search data
		for (var i = 0; i < jsonObj.length; i++){
			row = table.insertRow(-1);
		    var obj = jsonObj[i];
		    for (var key in obj){
		    	var cell = row.insertCell(-1);
		    	cell.innerHTML = obj[key];
		    }
		    var jsonCell = row.insertCell(-1);
		    jsonCell.innerHTML = JSON.stringify(jsonObj[i]);
		    jsonCell.id = "jsonText";
		    jsonCell.style.display="none";
		    console.log(jsonObj[i]);
		}
		//set up the clickable links
		var rows = table.rows;
		for (var i = 1; i < rows.length; i++) {
			createRowClick(rows[i], rows[i].cells["jsonText"].innerHTML);
		}
		var resultTable = document.getElementById("resultTable");
	    resultTable.innerHTML = "";
	    resultTable.appendChild(table);

	}
	
	function renderAwardForm(a) {
		console.log("calling award form function");
	    switch (a) {
	        case 0:
	            document.getElementById("awardFormSearch").style.display="none";
        	    document.getElementById("awardFormUpdate").style.display="none";
        	    document.getElementById("awardFormAdd").style.display="none";
	            break;
	        case 1:
	            document.getElementById("awardFormSearch").style.display="block";
        	    document.getElementById("awardFormUpdate").style.display="none";
        	    document.getElementById("awardFormAdd").style.display="none";
        	    break;
            case 2:
	            document.getElementById("awardFormSearch").style.display="none";
        	    document.getElementById("awardFormUpdate").style.display="block";
        	    document.getElementById("awardFormAdd").style.display="none";
        	    break;
            case 3:
	            document.getElementById("awardFormSearch").style.display="none";
        	    document.getElementById("awardFormUpdate").style.display="none";
        	    document.getElementById("awardFormAdd").style.display="block";
        	    break; 
	    }
	}
	
	
function renderAllocationForm(a) {
	    switch (a) {
	        case 0:
	            document.getElementById("allocationFormSearch").style.display="none";
        	    document.getElementById("allocationFormUpdate").style.display="none";
        	    document.getElementById("allocationFormAdd").style.display="none";
	            break;
	        case 1:
	            document.getElementById("allocationFormSearch").style.display="block";
        	    document.getElementById("allocationFormUpdate").style.display="none";
        	    document.getElementById("allocationFormAdd").style.display="none";
        	    break;
            case 2:
	            document.getElementById("allocationFormSearch").style.display="none";
        	    document.getElementById("allocationFormUpdate").style.display="block";
        	    document.getElementById("allocationFormAdd").style.display="none";
        	    break;
            case 3:
	            document.getElementById("allocationFormSearch").style.display="none";
        	    document.getElementById("allocationFormUpdate").style.display="none";
        	    document.getElementById("allocationFormAdd").style.display="block";
        	    break; 
	    }
	}

function renderStudentForm(a) {
	    switch (a) {
	        case 0:
	            document.getElementById("studentFormSearch").style.display="none";
        	    document.getElementById("studentFormUpdate").style.display="none";
        	    document.getElementById("studentFormAdd").style.display="none";
	            break;
	        case 1:
	            document.getElementById("studentFormSearch").style.display="block";
        	    document.getElementById("studentFormUpdate").style.display="none";
        	    document.getElementById("studentFormAdd").style.display="none";
        	    break;
            case 2:
	            document.getElementById("studentFormSearch").style.display="none";
        	    document.getElementById("studentFormUpdate").style.display="block";
        	    document.getElementById("studentFormAdd").style.display="none";
        	    break;
            case 3:
	            document.getElementById("studentFormSearch").style.display="none";
        	    document.getElementById("studentFormUpdate").style.display="none";
        	    document.getElementById("studentFormAdd").style.display="block";
        	    break; 
	    }
	}

function renderCollaboratorForm(a) {
	    switch (a) {
	        case 0:
	            document.getElementById("collaboratorFormSearch").style.display="none";
        	    document.getElementById("collaboratorFormUpdate").style.display="none";
        	    document.getElementById("collaboratorFormAdd").style.display="none";
	            break;
	        case 1:
	            document.getElementById("collaboratorFormSearch").style.display="block";
        	    document.getElementById("collaboratorFormUpdate").style.display="none";
        	    document.getElementById("collaboratorFormAdd").style.display="none";
        	    break;
            case 2:
	            document.getElementById("collaboratorFormSearch").style.display="none";
        	    document.getElementById("collaboratorFormUpdate").style.display="block";
        	    document.getElementById("collaboratorFormAdd").style.display="none";
        	    break;
            case 3:
	            document.getElementById("collaboratorFormSearch").style.display="none";
        	    document.getElementById("collaboratorFormUpdate").style.display="none";
        	    document.getElementById("collaboratorFormAdd").style.display="block";
        	    break; 
	    }
	}

	

	function renderForm(a) {
		switch (a) {
			case 0:
				document.getElementById("awardForm").style.display="block";
				document.getElementById("allocationForm").style.display="none";
				document.getElementById("studentForm").style.display="none";
			    document.getElementById("collaborationForm").style.display="none";
			    break;
			case 1:
				document.getElementById("awardForm").style.display="none";
				document.getElementById("allocationForm").style.display="block";
				document.getElementById("studentForm").style.display="none";
			    document.getElementById("collaborationForm").style.display="none";
			    break;
			case 2:
				document.getElementById("awardForm").style.display="none";
				document.getElementById("allocationForm").style.display="none";
				document.getElementById("studentForm").style.display="block";
			    document.getElementById("collaborationForm").style.display="none";
			    break;
			case 3:
				document.getElementById("awardForm").style.display="none";
				document.getElementById("allocationForm").style.display="none";
				document.getElementById("studentForm").style.display="none";
			    document.getElementById("collaborationForm").style.display="block";
			    break;

		}
	}