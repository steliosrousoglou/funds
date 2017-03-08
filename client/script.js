//	initialize hidden forms and submit/add event handlers
  	window.onload=function() {
  	    //Initial form displays
  	    document.getElementById("awardForm").style.display="none";
  		document.getElementById("allocationForm").style.display="none";
  		document.getElementById("studentForm").style.display="none";
  		document.getElementById("collaborationForm").style.display="none";
  		var studentFormSearch = document.getElementById("studentSubmit");
  		
  		//
  		studentFormSearch.addEventListener("click", studentFormReq, false);
  		studentFormSearch.dbReq = 0;
  		var studentFormAdd = document.getElementById("studentAdd");
  		studentFormAdd.addEventListener("click", studentFormReq, false);
  		studentFormAdd.dbReq = 1;
  
  		//add warnings such that students can only be added with minimal required data (date etc)
  		//I think you should put the event listeners into a separate function that gets called
  		//when the window loads, that way it can also return and display errors perhaps
  
  		var awardFormSearch = document.getElementById("awardSearch");
  		awardFormSearch.addEventListener("click", awardFormReq, false);
  		awardFormSearch.dbReq = 0;
  		var awardFormAdd = document.getElementById("awardAdd");
  		awardFormAdd.addEventListener("click", awardFormReq, false);
  		awardFormAdd.dbReq = 1;
  		var awardFormAll = document.getElementById("showAllAward");
  		awardFormAll.addEventListener("click", awardFormReq, false);
  		awardFormAll.dbReq = 2;
	}
	//For Award search, provide a show all awards list, with hyperlinks that bring up a specific award view
	function studentFormReq (evt) {
		evt.preventDefault();
		var formInputs = document.getElementById("studentForm").elements;
		var obj = {};
		console.log(formInputs);
		var invalid = false;
		for(var i = 0 ; i < formInputs.length ;i++) {
	        var item = formInputs.item(i);
	        if (item.value.length <= 1) {
	        	invalid = true;
	        	console.log("HERE");
	        }
	        else {
	          obj[item.name] = item.value;
	          console.log(item.value);
	        }
	    }
	    if (invalid && evt.target.dbReq == 1) {
	    	throw("Please complete all fields");
	    }
	    console.log(obj);
	    var jsonObj = JSON.stringify(obj);
	    //try catch here maybe?
	    console.log(jsonObj);
	    var endpoint = evt.target.dbReq? '/add_student' : '/get_student';
	    //probably havea try-Catch here with promise or something
	    fetch(endpoint, {
		    method: 'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: jsonObj })
		  .then(res => res.text())
		  .then(res => console.log(JSON.parse(res))) // pass to display results function
		  .catch(() => alert("Failed to add award"));
		// update, search, and add will all return a response that can be jsonified
		//	and displayed in a grid
	};

	function awardFormReq (evt) {
		evt.preventDefault();
		var formInputs = document.getElementById("awardForm").elements;
		var obj = {};
		console.log(formInputs);
		var invalid = false;
		for(var i = 0 ; i < formInputs.length ;i++) {
	        var item = formInputs.item(i);
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
	    var endpoint='';
	    switch (evt.target.dbReq) {
	        case 0:
	            endpoint = '/get_award';
	            break;
	        case 1:
	            endpoint = '/add_award';
	            break;
	        case 2:
	            endpoint = '/get_all_awards';
	            break;
	    }
	    // var body = evt.target.dbReq == 2? "" : body;
	    fetch(endpoint, {
		    method:'POST',
		    headers: {
		      'Content-Type': 'application/json',
		    },
		    body: jsonObj })
		    .then(res => res.json())
		    .then(res => console.log(res))
		    //it is still catching an error?
		    // .then(res => console.log(res))
		  //   .then(res => {
		  //     if (res === 'fail') alert("Award Query Failed");
		  //     else JSON.parse(res.text())
		  //     })
		  // .then(res => console.log(res)) // Pass json to a results display function
		  .catch((e) => console.log(e));
	};

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