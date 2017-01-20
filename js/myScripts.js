/*************************************************************
* My Treehouse Projects
*
* FSJS proj #3
* 
* Interactive Form
*
* Robert Manolis, Milwaukie OR, January - 2017  :)
**************************************************************/
(function(window, document) { 
	"use strict";

	/**************************************************************
	* PROJECT VARIABLES
	***************************************************************/ 
	const myForm = document.getElementById("myForm");

	// Job title
	const title = document.getElementById("title");
	const otherTitle = document.getElementById("other-title");

	// T-shirts
	const design = document.getElementById("design");
	const colorsJS = document.getElementById("colors-js-puns");
	const colorPunsWrap = document.getElementById("colorPunsWrap");
	const colorLoveWrap = document.getElementById("colorLoveWrap");

	// Activities
	const activitiesCheckbox = document.getElementsByClassName("activitiesCheckbox");
	const activitiesTotal = document.getElementById("activitiesTotal");

	// Payment choices
	const payment = document.getElementById("payment");
	const creditCard = document.getElementById("credit-card");
	const paypal = document.getElementById("paypal");
	const bitcoin = document.getElementById("bitcoin");
	const ccDetails = document.getElementsByClassName("ccDetails");

	// error handling
	const naim = document.getElementById("name");
	const mail = document.getElementById("mail");
	const ccNum = document.getElementById("cc-num");
	const zip = document.getElementById("zip");
	const cvv = document.getElementById("cvv");
	const submitButton = document.getElementById("submitButton");
	const errorMessage = document.getElementsByClassName("errorMessage");
	/**************************************************************/


	/**************************************************************
	* GET FORM TO DESIRED INITIAL STATE
	***************************************************************/ 
	// RESET FORM ON LOAD OR PAGE REFRESH
	myForm.reset();

	// BRING FOXUS TO NAME FIELD
	naim.focus();

	// ENABLE CHECKBOXES ON LOAD OR REFRESH
	[].forEach.call(activitiesCheckbox, (vally, indy, arry) => {
		vally.disabled = false;
	});

	// ARRAY OF ELEMENTS TO HIDE
	let disappear = [otherTitle, colorsJS, colorPunsWrap, colorLoveWrap, paypal, bitcoin];

	// HIDE OPTIONS
	disappear.forEach((vally, indy, arry) => {
		vally.style.display = "none";
	});
	/**************************************************************/


	/**************************************************************
	* JOB ROLE SECTION
	***************************************************************/  
	// IF "OTHER TITLE" SELECTED, ADD FORM INPUT
	title.addEventListener("change", () => {
		if(title.value === "other") {
			otherTitle.style.display = "block";
		}
	});
	/**************************************************************/


	/**************************************************************
	* T-SHIRT SECTION
	***************************************************************/  
	// CONDITIONALLY MAKE COLOR OPTIONS AVAILABLE
	design.addEventListener("change", () => {
		if(design.value !== null || design.value !== "Select Theme") {
			colorsJS.style.display = "block";
			if (design.value === "js puns") {
				colorLoveWrap.style.display = "none";
				colorPunsWrap.style.display = "block";
			} else if (design.value === "heart js") {
				colorPunsWrap.style.display = "none";
				colorLoveWrap.style.display = "block";
			}
		}
	});
	/**************************************************************/


	/**************************************************************
	* ACTIVITY SECTION
	***************************************************************/  
	// GET DOLLAR AMOUNT OF ACTIVITY SELECTIONS
	function howMuch(elly) {
		let dollarIndy = elly.indexOf("$");
		let amount = elly.substring(dollarIndy + 1);
		return Number(amount);
	}

	// GET DAY OF ACTIVITY
	function whatDay(elly) {
		let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
		let day = days.filter((vally, indy, arry) => {
			if (elly.includes(vally)) {
				return vally;
			}
		});
		return day[0] || "Sorry, day not defined";
	}

	// GET START TIME OF ACTIVITY
	function whatTime(elly) {
		let startTime = elly.match(/\d/);
		return startTime[0] || "Sorry, time not defined";
	}

	// CALCULATE TOTAL ACTIVITY COST AND PRINT TO THE SCREEN
	let bill = 0;
	function moneyDisplay(elly) {
		let cost = howMuch(elly.parentNode.textContent);	
		if (elly.checked) {
			bill += cost;
			activitiesTotal.style.display = "block";
			activitiesTotal.innerHTML = "Total $" + bill;
		}
		if (!elly.checked) {
			bill -= cost;
			activitiesTotal.innerHTML = "Total $" + bill;
			if (!bill) {
				activitiesTotal.style.display = "none";
			}
		}
	}

	// CHECK ACTIVITY TIMES AND DISABLE CONFLICTING CHECKBOXES
	function handleConflicts(elly, col) {
		let text = elly.parentNode.textContent;
		let day = whatDay(text);
		let hour = whatTime(text);
		
		[].forEach.call(col, (vally, indy, arry) => {
			let textToCheck = vally.parentNode.textContent;
			let dayToCheck = whatDay(textToCheck);
			let hourToCheck = whatTime(textToCheck);
			
			if (day === dayToCheck) {
				if (hour === hourToCheck) {
					if (elly.checked && !vally.checked) {
						vally.disabled = true;
					}
					
					if (!elly.checked && vally.disabled) {
						vally.disabled = false;
					}
				}
			}
		});
	}
	 
	// CREATE EVENT LISTENER FOR ACTIVITY CHECKBOXES
	function activitiesCheck(elly, arr) {
		elly.addEventListener("change", () => {
			moneyDisplay(elly);
			handleConflicts(elly, arr);
			
		});
	}

	// ATTACH EVENT LISTENER TO ACTIVITY CHECKBOXES
	[].forEach.call(activitiesCheckbox, (vally, indy, arry) => {
		activitiesCheck(vally, activitiesCheckbox);
	});
	/**************************************************************/


	/**************************************************************
	* PAYMENT SECTION
	***************************************************************/ 
	function paymentMethod(vally, show, hide1, hide2) {
		if (payment.value === vally) {
			show.style.display = "block";
			hide1.style.display = "none";
			hide2.style.display = "none";
		}
	}

	// SHOW APPROPRIATE PAYMENT OPTION BASED ON USER SELECTION
	payment.addEventListener("change", () => {
		paymentMethod("credit card", creditCard, paypal, bitcoin);
		paymentMethod("paypal", paypal, creditCard, bitcoin);
		paymentMethod("bitcoin", bitcoin, creditCard, paypal);
	});
	/**************************************************************/



	/**************************************************************
	* HANDLE FORM ERRORS
	***************************************************************/ 
	// STICK AN ERROR MESSAGE RIGHT INSIDE THE FORM FIELD
	function inputErrorMessage(input, message) {
		input.value = message;
	}

	// ON FOCUS, REMOVE ERROR BORDER AND RESET INPUT VALUE
	let requiredFields = [naim, ccNum, zip, cvv];
	requiredFields.forEach((vally, indy, arry) => {
		vally.addEventListener("focus", () => {
			errorBorder(vally, "off");
			if (!vally.isOn) {
				vally.value = "";
			}
		});
	});

	// ADD/REMOVE ERROR BORDER ON INCORRECT INPUT
	function errorBorder(input, state) {
		if (state === "on") {
			input.classList.toggle("errorBorder", true);
		} else if (state === "off") {
			input.classList.toggle("errorBorder", false);
		}
	}

	// HANDLE ERROR FOR EMPTY INPUT
	function isEmptyError(input) {
		let val = input.value;
		if (val === "") {
			input.isOn = false;
			errorBorder(input, "on");
			inputErrorMessage(input, "Oops, this field is stil empty");
		} else {
			input.isOn = true;
		}
	}
	
	// ON BLUR, VALIDATE NAME FIELD
	naim.addEventListener("blur", () => {
		isEmptyError(naim);
	});

	// CHECK INPUT FOR VALIDLY FORMATTED EMAIL ADDRESS
	function emailFormatError(input) {
		let val = input.value;
		if (val === "" || val.indexOf("@") === -1 || val.indexOf(".") === -1) {
			input.isOn = false;
			errorBorder(input, "on");
			inputErrorMessage(input, "You must enter a validly foramtted email address");
		} else {
			input.isOn = true;
		}
	}

	// CREATE TOOLTIP STYLE ERROR MESSAGE AND APPEND TO PAGE
	function toolTipErrorMessage(container, input, message) {
		let text = document.createTextNode(message);
		let span = document.createElement("span");
		span.setAttribute("class", "errorMessage");
		span.appendChild(text);
		container.insertBefore(span, input);
		input.toolTip = true;
		return span;
	}

	// ON FOCUS, RESET INPUT VALUE AND SHOW TOOLTIP ERROR MESSAGE
	mail.addEventListener("focus", () => {
		errorBorder(mail, "off");
		if (!mail.isOn) {
			mail.value = "";
			if (!mail.toolTip) {
				toolTipErrorMessage(mail.parentNode, mail, "You must enter a validly foramtted email address");
			}
		}
	});

	// ON KEYUP, CHECK FOR VALIDLY FORMATTED EMAIL, IF FOUND, REMOVE TOOLTIP
	mail.addEventListener("keyup", () => {
		let val = mail.value;
		if (val.indexOf("@") !== -1 && val.indexOf(".") !== -1) {
			if(val.indexOf("com") !== -1 || val.indexOf("net") !== -1 || val.indexOf("org") !== -1) {
				mail.parentNode.removeChild(errorMessage[0]);
				mail.toolTip = false;
			}
		}
		
		if (val === "") {
			mail.isOn = false;
		}
	});
	
	// ON BLUR, VALIDATE EMAIL FIELD
	mail.addEventListener("blur", () => {
		emailFormatError(mail);
	});

	// GOT THIS SNIPPET FROM https://gist.github.com/DiegoSalazar/4075533,
	// takes the form field value and returns true on valid number, (slighlty modified)
	function valid_credit_card(value) {
	  // accept only digits, dashes or spaces
		if (/[^0-9-\s]+/.test(value)) return false;
		if (value === "") return false; 
		// The Luhn Algorithm. It's so pretty.
		var nCheck = 0, nDigit = 0, bEven = false;
		value = value.replace(/\D/g, "");
		for (var n = value.length - 1; n >= 0; n--) {
			var cDigit = value.charAt(n);
				nDigit = parseInt(cDigit, 10);

			if (bEven) {
				if ((nDigit *= 2) > 9) nDigit -= 9;
			}
			nCheck += nDigit;
			bEven = !bEven;
		}
		return (nCheck % 10) === 0;
	}
	// HERE'S A FAKE BUT VALID CC NUMBER FOR TESTING 
	// 4556997460143545, FOUND HERE, http://www.freeformatter.com/credit-card-number-generator-validator.html
	
	// VALIDATE CC RELATED INPUTS
	function ccError(input) {
		let val = input.value;
		if (input === ccNum) {
			if (!valid_credit_card(val)) {
				errorBorder(input, "on");
				inputErrorMessage(input, "CC number must be valid");
			}
		}
		if (input === zip) {
			if (val.length !== 5 || isNaN(val)) {
				errorBorder(input, "on");
				inputErrorMessage(input, "5 digit zip");
			}
		}
		if (input === cvv) {
			if (val.length !== 3 || isNaN(val)) {
				errorBorder(input, "on");
				inputErrorMessage(input, "3 digit code");
			}
		}
	}

	// ON BLUR, CHECK CC INPUTS FOR VALID ENTRIES
	[].forEach.call(ccDetails, (vally, indy, arry) => {
		vally.addEventListener("blur", () => {
			ccError(vally);
		});
	});

	// CHECK ARRAY OF FIELDS FOR PRESSENCE OF ERROR CLASS
	function checkForErrors(arr) {
		let error = false;
		arr.forEach((vally, indy, arry) => {
			let klasArr = [].slice.call(vally.classList);
			if (klasArr.indexOf("errorBorder") !== -1) {
				error = true;
			}
		});
		return error;
	}

	// CHECK ACTIVITIES SECTION 
	function checkTheBoxes(arr) {
		let isNotChecked = true;
		[].forEach.call(arr, (vally, indy, arry) => {
			if (vally.checked) {
				isNotChecked = false;
			}
		});
		return isNotChecked;
	}

	// IF ERRORS, STOP SUBMISSION AND INFORM USER, ELSE SUBMIT
	submitButton.addEventListener("click", (e) => {
		e.preventDefault();
		let toBeChecked = [naim, mail, ccNum, zip, cvv];
		let emptyInputs = checkForErrors(toBeChecked);
		let emptyheckboxes = checkTheBoxes(activitiesCheckbox);
		if (emptyInputs) {
			toolTipErrorMessage(myForm, submitButton, "Please double check the form fields above");
		} 
		if (emptyheckboxes) {
			toolTipErrorMessage(myForm, submitButton, "Please register for activities above");
		} 
		if (!emptyInputs && !emptyheckboxes) {
			alert("success!");
			myForm.submit();
		}
	});
	/**************************************************************/
})(window, document);