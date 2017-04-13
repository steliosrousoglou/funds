	//used to denote which query is currently being handled, toggles as links between queries are clicked, resets when all forms are cleared
	var queryType = 0;
	var allAccessRights = 1;

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
  		document.getElementById("descriptionList").style.display="none";
  		document.getElementById("resultTable").style.display="none";
  		document.getElementById("resultTable").innerHTML="";
  		document.getElementById("tableLeft").innerHTML = "";
  		document.getElementById("tableRight").innerHTML = "";
  		document.getElementById("awardFormSearch").reset();
  		document.getElementById("awardFormUpdate").reset();
  		document.getElementById("awardFormAdd").reset();
  		document.getElementById("allocationFormSearch").reset();
  		document.getElementById("allocationFormUpdate").reset();
  		document.getElementById("allocationFormAdd").reset();
  		document.getElementById("studentFormSearch").reset();
  		document.getElementById("studentFormUpdate").reset();
  		document.getElementById("studentFormAdd").reset();
  		document.getElementById("collaboratorFormSearch").reset();
  		document.getElementById("collaboratorFormUpdate").reset();
  		document.getElementById("collaboratorFormAdd").reset();
  		queryType = 0;
  		
	}

  	window.onload=function() {
  	    //Initial form displays
  	    clearAllForms();

  	    var awardFormSearch = document.getElementById("awardSearch");
  	    var awardFormAdd = document.getElementById("awardAdd");
  	    var awardShowAll = document.getElementById("showAllAward");

  	    var allocationFormSearch = document.getElementById("allocationSearch");
  	    var allocationFormAdd = document.getElementById("allocationAdd");
  	    var allocationShowAll = document.getElementById("showAllAllocation");

  		var studentFormSearch = document.getElementById("studentSearch");
  		var studentFormAdd = document.getElementById("studentAdd");
  		var studentShowAll = document.getElementById("showAllStudent");

  		var collaboratorFormSearch = document.getElementById("collaboratorSearch");
  		var collaboratorFormAdd = document.getElementById("collaboratorAdd");
  		var collaboratorShowAll = document.getElementById("showAllCollaborator");
  		
  		var awardFormCancel = document.getElementById("awardCancel");
  		var awardFormUpdate = document.getElementById("awardUpdate");
  		var allocationFormCancel = document.getElementById("allocationCancel");
  		var allocationFormUpdate = document.getElementById("allocationUpdate");
  		var studentFormCancel = document.getElementById("studentCancel");
  		var studentFormUpdate = document.getElementById("studentUpdate");
  		var collaboratorFormCancel = document.getElementById("collaboratorCancel");
  		var collaboratorFormUpdate = document.getElementById("collaboratorUpdate");
  		
  		
  		awardFormCancel.addEventListener("click", updatePreventSubmit, false);
  		awardFormUpdate.addEventListener("click", updatePreventSubmit, false);
  		allocationFormCancel.addEventListener("click", updatePreventSubmit, false);
  		allocationFormUpdate.addEventListener("click", updatePreventSubmit, false);
  		studentFormCancel.addEventListener("click", updatePreventSubmit, false);
  		studentFormUpdate.addEventListener("click", updatePreventSubmit, false);
  		collaboratorFormCancel.addEventListener("click", updatePreventSubmit, false);
  		collaboratorFormUpdate.addEventListener("click", updatePreventSubmit, false);

  		awardFormSearch.addEventListener("click", awardFormReq, false);
  		awardFormSearch.req = 0;
  		awardFormAdd.addEventListener("click", awardFormReq, false);
  		awardFormAdd.req = 1;
  		awardShowAll.addEventListener("click", awardFormReq, false);
  		awardShowAll.req = 2;

  		allocationFormSearch.addEventListener("click", allocationFormReq, false);
  		allocationFormSearch.req = 0;
  		allocationFormAdd.addEventListener("click", allocationFormReq, false);
  		allocationFormAdd.req = 1;
  		allocationShowAll.addEventListener("click", allocationFormReq, false);
  		allocationShowAll.req = 2;

  		studentFormSearch.addEventListener("click", studentFormReq, false);
  		studentFormSearch.req = 0;
  		studentFormAdd.addEventListener("click", studentFormReq, false);
  		studentFormAdd.req = 1;
  		studentShowAll.addEventListener("click", studentFormReq, false);
  		studentShowAll.req = 2;

  		collaboratorFormSearch.addEventListener("click", collaboratorFormReq, false);
  		collaboratorFormSearch.req = 0;
  		collaboratorFormAdd.addEventListener("click", collaboratorFormReq, false);
  		collaboratorFormAdd.req = 1;
  		collaboratorShowAll.addEventListener("click", collaboratorFormReq, false);
  		collaboratorShowAll.req = 2;
  		
  		var readWrite = document.getElementById("readWrite");
  		var readOnly = document.getElementById("readOnly");
  		
  		readWrite.addEventListener("click", allRights, false);
  		readOnly.addEventListener("click", limitedRights, false);
  		
	}
	
	function findPos(obj) {
	    var curtop = 0;
	    if (obj.offsetParent) {
	        do {
	            curtop += obj.offsetTop;
	        } while (obj = obj.offsetParent);
	    	return [curtop];
    	}
	}
	
	function allRights(evt) {
		if (allAccessRights != 1) {
			allAccessRights = 1;
			document.getElementById("awardBtnAdd").style.display = "block";
			document.getElementById("allocationBtnAdd").style.display = "block";
			document.getElementById("studentBtnAdd").style.display = "block";
			document.getElementById("collaboratorBtnAdd").style.display = "block";
		}
	}
	
	function limitedRights(evt) {
		console.log("trying to restrict");
		if (allAccessRights != 0) {
			allAccessRights = 0;
			document.getElementById("awardBtnAdd").style.display = "none";
			document.getElementById("allocationBtnAdd").style.display = "none";
			document.getElementById("studentBtnAdd").style.display = "none";
			document.getElementById("collaboratorBtnAdd").style.display = "none";
		    document.getElementById("awardFormUpdate").style.display="none";
		    document.getElementById("awardFormAdd").style.display="none";
	  		document.getElementById("allocationFormUpdate").style.display="none";
	  		document.getElementById("allocationFormAdd").style.display="none";
	  		document.getElementById("studentFormUpdate").style.display="none";
	  		document.getElementById("studentFormAdd").style.display="none";
	  		document.getElementById("collaboratorFormUpdate").style.display="none";
	  		document.getElementById("collaboratorFormAdd").style.display="none";
		}
	}
	
	//cancel prevent default
	function updatePreventSubmit(evt) {
		evt.preventDefault();
	}
		
	//For Award search, provide a show all awards list, with hyperlinks that bring up a specific award view
	function serverRequest(type, request, form) {
		console.log("request for " + type);
		var endpointVar;
		switch (type) {
			case 0:
				endpointVar = "award";
				break;
			case 1:
				endpointVar = "allocation";
				break;
			case 2:
				endpointVar = "student";
				break;
			case 3: 
				endpointVar = "collaborator";
				break;
		}
		var endpoint;
		switch (request) {
			case 0:
				endpoint = "/get_" + endpointVar;
				break;
			case 1:
				endpoint = "/add_" + endpointVar;
				break;
			case 2:
				endpoint = "/get_all_" + endpointVar + "s";
				break;
		}
		var obj = {};
		var formInputs = document.getElementById(form).elements;
		console.log(formInputs);
		for(var i = 0 ; i < formInputs.length ;i++) {
	        var item = formInputs.item(i);
	        if (item.value.length > 1) {
	        	obj[item.name] = item.value;
	        	console.log(item.value);
	        }
	    }
	    console.log(obj);
	    var jsonObj = JSON.stringify(obj);
	    console.log(jsonObj);
	    //add request
	    console.log(endpoint);
	    if (request == 1) {
	    	fetch(endpoint, {
			    method:'POST',
			    headers: {
			      'Content-Type': 'application/json',
			    },
			    body: jsonObj })
			    .then(res => res.text())
				.then(text => {
					 if (text === 'fail') alert('Failed to add ' + endpointVar);
					 else if (text === 'success') {
					 	alert (endpointVar +" Successfully Added");
					 	clearAllForms();
					 }
					})
			  .catch((e) => console.log(e));
	    }
	    else {
	    	fetch(endpoint, {
			    method:'POST',
			    headers: {
			      'Content-Type': 'application/json',
			    },
			    body: jsonObj })
			    .then(res => res.json())
			    .then(res => renderResults(res))
			  .catch((e) => console.log(e));
	    }
	};
	
	function awardFormReq (evt) {
		evt.preventDefault();
		queryType = 1;
		var form = '';
		switch (evt.target.req) {
			case 0:
				form = "awardFormSearch";
				break;
			case 1:
				form = "awardFormAdd";
				break;
			case 2:
				form = "awardFormSearch";
				break;
		}
		serverRequest(0, evt.target.req, form);
	};
	
	function allocationFormReq (evt) {
		evt.preventDefault();
		queryType = 2;
		var form = '';
		switch (evt.target.req) {
			case 0:
				form = "allocationFormSearch";
				break;
			case 1:
				form = "allocationFormAdd";
				break;
			case 2:
				form = "allocationFormSearch";
				break;
		}
		serverRequest(1, evt.target.req, form);
	};
	
	function studentFormReq (evt) {
		evt.preventDefault();
		queryType = 3;
		var form = '';
		switch (evt.target.req) {
			case 0:
				form = "studentFormSearch";
				break;
			case 1:
				form = "studentFormAdd";
				break;
			case 2:
				form = "studentFormSearch";
				break;
		}
		serverRequest(2, evt.target.req, form);
	};
	
	function collaboratorFormReq (evt) {
		evt.preventDefault();
		queryType = 4;
		var form = '';
		switch (evt.target.req) {
			case 0:
				form = "collaboratorFormSearch";
				break;
			case 1:
				form = "collaboratorFormAdd";
				break;
			case 2:
				form = "collaboratorFormSearch";
				break;
		}
		serverRequest(3, evt.target.req, form);
	};
	
	function detailedResult (json) {
		var tableLeft = document.getElementById("tableLeft");
	    tableLeft.innerHTML = "";
	    var tableRight = document.getElementById("tableRight");
		tableRight.innerHTML = "";
		var jsonObj = JSON.parse(json);
		var left = true;
		console.log(json);
		console.log(jsonObj);
		for (var key in jsonObj) {
			// console.log(key + jsonObj[key]);
			var tableInsert = left? tableLeft: tableRight;
			left = left == true? false : true;
			var row = tableInsert.insertRow(-1);
			var col1 = row.insertCell(-1);
			var col2 = row.insertCell(-1);
			col1.innerHTML = key;
			if ((key === "start_date" || key === "end_date" || key == "form_s" || key == "fes_due") && (jsonObj[key] != null && jsonObj[key].length >= 10)) {
		    		col2.innerHTML = jsonObj[key].substring(0, 10);
		    }
		    else col2.innerHTML = jsonObj[key];
		}
		var leftRows = tableLeft.rows;
		var rightRows = tableRight.rows;
		createResultLinks(leftRows);
		createResultLinks(rightRows);
		if (allAccessRights == 1) {
			if (!left) tableRight.insertRow(-1).insertCell(-1);
			var row = tableLeft.insertRow(-1);
			var col1 = row.insertCell(-1);
			col1.innerHTML = "Update";
			createUpdateClick(row, json);
			var row2 = tableRight.insertRow(-1);
			var col2 = row2.insertCell(-1);
			col2.innerHTML = "Remove";
			createRemoveClick(row2, json);
		}
		window.scroll(0, tableLeft);
	};
	
	function createUpdateClick(row, json) {
		row.onclick = function (event) {
			updateRender(json, event);
		};
	}
	
	function createRemoveClick(row, json) {
		row.onclick = function (event) {
			var confirmation = confirm("Delete this entry?");
			if (confirmation) {
			    removeReq(json, event);
			}
		};
	}
	
	function removeReq(json, event) {
		event.preventDefault();
		var endpoint = '';
		switch (queryType) {
			case (1):
				endpoint = '/remove_award';
				break;
			case (2):
				endpoint = '/remove_allocation';
				break;
			case (3):
				endpoint = '/remove_student';
				break;
			case (4):
				endpoint = '/remove_collaborator';
				break;
		}
		var nonNullObj = JSON.parse(json);
		console.log(json);
		for (var key in nonNullObj) {
			if (!nonNullObj[key] || nonNullObj[key] === "") delete nonNullObj[key];
		}
		console.log(JSON.stringify(nonNullObj));
	    fetch(endpoint, {
		    method:'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: JSON.stringify(nonNullObj) })
		    .then(res => res.text())
				.then(text => {
					 if (text === 'fail') alert('Failed to remove at ' + endpoint);
					 //add function to maybe refresh the page echoing "succesful add"
					 else if (text === 'success') {
					 	alert("Removal was succesful");
					 	clearAllForms();
					 }
					})
		  .catch((e) => console.log());

	}
	
	function updateRender(json, event) {
		//store it to set after form clear
		event.preventDefault();
		var qT = queryType;
		var tableLeft = document.getElementById("tableLeft");
	    tableLeft.innerHTML = "";
	    var tableRight = document.getElementById("tableRight");
		tableRight.innerHTML = "";
		var updateForm = '', updateButton = '', cancelButton = '';
		switch (queryType) {
			case (1):
				updateForm = 'awardFormUpdate';
				updateButton = 'awardUpdate';
				cancelButton = 'awardCancel';
				break;
			case (2):
				updateForm = 'allocationFormUpdate';
				updateButton = 'allocationUpdate';
				cancelButton = 'allocationCancel'
				break;
			case (3):
				updateForm = 'studentFormUpdate';
				updateButton = 'studentUpdate';
				cancelButton = 'studentCancel'
				break;
			case (4):
				updateForm = 'collaboratorFormUpdate';
				updateButton = 'collaboratorUpdate';
				cancelButton = 'collaboratorCancel'
				break;
		}
		document.getElementById(updateForm).reset();
		document.getElementById(updateForm).style.display = 'block';
		console.log(json);
		var formFill = JSON.parse(json);
		console.log(formFill);
		var formElements = document.getElementById(updateForm).elements;
		for (var i = 0; i < formElements.length; i++) {
			var item = formElements.item(i);
			console.log(item);
    		if ((item.name === "start_date" || item.name === "end_date" || 
    		item.name == "form_s" || item.name == "fes_due") && (formFill[item.name] != null)) {
    			item.value = formFill[item.name].substring(0,10);
    		}
			else if (formFill[item.name] != null) {
				item.value = formFill[item.name];
			}
		}
		//any input into the form that is greater than null, will be updated
		document.getElementById(updateButton).onclick = function () {
			//prevent sql error with null parameters
			for (var key in formFill) {
				if (!formFill[key] || formFill[key] === "") {
					delete formFill[key];
				}
			}
			updateReq(JSON.stringify(formFill), updateForm);
		};
		document.getElementById(cancelButton).onclick = function () {
			document.getElementById(updateForm).reset();
			document.getElementById(updateForm).style.display = 'none';
			detailedResult(json);
		};
		window.scroll(0, updateForm);
	}
	
	function updateReq(params, updateForm) {
		console.log("params are " + params);
		// sending JSON stringified object array length 2
		var jsonUpdates = {};
		var jsonParams = JSON.parse(params);
		var endpoint = '';
		switch (queryType) {
			case (1):
				endpoint = '/update_award';
				// obj["myfinance_award_number"] = jsonParams["myfinance_award_number"];
				break;
			case (2):
				endpoint = '/update_allocation';
				break;
			case (3):
				endpoint = '/update_student';
				break;
			case (4):
				endpoint = '/update_collaborator';
				break;
		}
		// var obj = JSON.parse(params);
		// obj["split"] = "split";
		var formInputs = document.getElementById(updateForm).elements;
		for(var i = 0 ; i < formInputs.length ;i++) {
	        var item = formInputs.item(i);
	        if (item.name != "update" && item.name != "cancel") jsonUpdates[item.name] = item.value;
	        console.log(item.value);
	        
	    }
	    var obj = {};
	    obj[0] = jsonUpdates;
	    obj[1] = jsonParams;
	    var jsonObj = JSON.stringify(obj);
	    //an object with two jsons becomes jsonified
	    console.log(endpoint);
	    console.log(jsonObj);
	    fetch(endpoint, {
		    method:'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: jsonObj })
		    .then(res => res.text())
				.then(text => {
					 if (text === 'fail') alert('Failed to update ' + endpoint);
					 //add function to maybe refresh the page echoing "succesful add"
					 else if (text === 'success') {
					 	alert("Update was succesful");
					 	clearAllForms();
					 }
					})
		  .catch((e) => console.log());
	    
	}
	
	function createResultLinks(rows) {
		console.log("current type is " + queryType);
		for (var i = 0; i < rows.length; i++) {
			//award -> allocation
			if (rows[i].cells[1].innerHTML == "" ) continue;
			if (queryType == 1 && (rows[i].cells[0].innerHTML == "myfinance_award_number"
			|| rows[i].cells[0].innerHTML == "funding_body_reference")) {
				var obj = {};
				obj[rows[i].cells[0].innerHTML] = rows[i].cells[1].innerHTML;
				var jsonObj = JSON.stringify(obj);
				console.log("adding allocation click");
				createAllocationClick(rows[i], jsonObj);
			}
			//allocation -> student
			if (queryType == 2 && rows[i].cells[0].innerHTML == "myfinance_code") {
				var obj = {};
				obj[rows[i].cells[0].innerHTML] = rows[i].cells[1].innerHTML;
				var jsonObj = JSON.stringify(obj);
				console.log("adding student click");
				createStudentClick(rows[i], jsonObj);
			}
			//allocation -> award
			if (queryType == 2 && (rows[i].cells[0].innerHTML == "myfinance_award_no"
			|| rows[i].cells[0].innerHTML == "funding_body_reference")) {
				var obj = {};
				obj[rows[i].cells[0].innerHTML] = rows[i].cells[1].innerHTML;
				var jsonObj = JSON.stringify(obj);
				console.log("adding award click");
				createAwardClick(rows[i], jsonObj);
			}
			//student -> allocation
			if (queryType == 3 && rows[i].cells[0].innerHTML == "myfinance_code") {
				var obj = {};
				obj[rows[i].cells[0].innerHTML] = rows[i].cells[1].innerHTML;
				var jsonObj = JSON.stringify(obj);
				console.log("adding allocation click");
				createAllocationClick(rows[i], jsonObj);
			} 
			//student -> collaborator
			if (queryType == 3 && rows[i].cells[0].innerHTML == "collaborator_code") {
				var obj = {};
				obj["myfinance_code"] = rows[i].cells[1].innerHTML;
				var jsonObj = JSON.stringify(obj);
				console.log("adding collaborator click");
				createCollaboratorClick(rows[i], jsonObj);
			} 
			//collaborator -> student
			if (queryType == 4 && rows[i].cells[0].innerHTML == "myfinance_code") {
				var obj = {};
				obj["collaborator_code"] = rows[i].cells[1].innerHTML;
				var jsonObj = JSON.stringify(obj);
				console.log("adding student click");
				createStudentClick(rows[i], jsonObj);
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
	
	function createCollaboratorClick(row, jsonObj) {
		//function to call a get request/search endpoint, and if successful clear forms, then render results}
		row.onclick = function () {
			collaboratorLinkQuery(jsonObj);
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
		  .catch((e) => console.log(e));
	}
	
	function allocationLinkQuery(jsonObj) {
		console.log("queryType was " + queryType.toString());
		queryType = 2;
		console.log("searching for allocationLink with " + jsonObj);
		fetch('/get_allocation', {
		    method:'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: jsonObj })
		    .then(res => res.json())
		    .then (res => renderResults(res))
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
	
	function collaboratorLinkQuery(jsonObj) {
		console.log("queryType was " + queryType.toString());
		queryType = 4;
		console.log("searching for collaboratorLink with " + jsonObj);
		fetch('/get_collaborator', {
		    method:'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: jsonObj })
		    .then(res => res.json())
		    //change query type here within a function/kind of like try/catching
		    .then (res => renderResults(res))
		  .catch((e) => console.log(e));
	}
	
	function createRowClick(row, text) {
		row.onclick = function () {
			detailedResult(text);
		};
	}

	function renderResults(jsonObj) {
		console.log(jsonObj);
		document.getElementById("awardFormSearch").style.display="none";
		document.getElementById("allocationFormSearch").style.display="none";
		document.getElementById("studentFormSearch").style.display="none";
		document.getElementById("collaboratorFormSearch").style.display="none";
		document.getElementById("descriptionList").style.display="block";
		console.log("rendering");
		console.log(jsonObj);
		if (jsonObj.length == 0) {
			alert("No results returned.");
			clearAllForms();
		}
		//create table, then create header table
		var table = document.createElement("TABLE");
    	table.setAttribute("class", "table table-responsive table table-hover");
    	var tableHead = document.createElement("THEAD");
    	tableHead.setAttribute("class", "thead-default");
    	var columns = jsonObj[0].length;
    	var row = document.createElement("TR");
    	//headers of result table will be the keys of database
    	for (var key in jsonObj[0]) {
    		var headerCell = document.createElement("TH");
    		var cellText = document.createTextNode(key);
    		headerCell.appendChild(cellText);
	        row.appendChild(headerCell);
    	}
    	tableHead.appendChild(row);
    	table.appendChild(tableHead);
    	var tableBody = document.createElement("TBODY");
    	//add the search data
		for (var i = 0; i < jsonObj.length; i++){
			row = document.createElement("TR");
		    var obj = jsonObj[i];
		    for (var key in obj){
		    	var cell = document.createElement("TD");
		    	var cellText;
		    	if ((key === "start_date" || key === "end_date" || key == "form_s" || key == "fes_due") && (obj[key] != null && obj[key].length >= 10)) {
		    		cellText = document.createTextNode(obj[key].substring(0, 10));
		    	}
		    	else cellText = document.createTextNode(obj[key]);
		    	cell.appendChild(cellText);
		    	row.appendChild(cell);
		    }
		    var jsonCell = document.createElement("TD");
		    jsonCell.innerHTML = JSON.stringify(jsonObj[i]);
		    jsonCell.id = "jsonText";
		    jsonCell.style.display="none";
		    row.appendChild(jsonCell);
		    tableBody.appendChild(row);
		}
		//set up the clickable links
		var rows = tableBody.rows;
		for (var i = 0; i < rows.length; i++) {
			createRowClick(rows[i], rows[i].cells["jsonText"].innerHTML);
		}
		table.appendChild(tableBody);
		var resultTable = document.getElementById("resultTable");
	    resultTable.innerHTML = "";
	    resultTable.style.display = "block";
	    resultTable.appendChild(table);
	    window.scroll(0,findPos(resultTable));

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
	    if (allAccessRights == 0) document.getElementById("awardFormAdd").style.display="none";
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
	    if (allAccessRights == 0) document.getElementById("allocationFormAdd").style.display="none";
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
	    if (allAccessRights == 0) document.getElementById("studentFormAdd").style.display="none";
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
	    if (allAccessRights == 0) document.getElementById("collaboratorFormAdd").style.display="none";
	}
