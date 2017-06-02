//Student Name: Di Ma
//Assignment 7
//WEBD-1000
//Term 2 Section 2

var itemDescription = ["MacBook", "The Razer", "WD My Passport", "Nexus 7", "DD-45 Drums"];
var itemPrice = [1899.99, 79.99, 179.99, 249.99, 119.99];
var itemImage = ["mac.png", "mouse.png", "wdehd.png", "nexus.png", "drums.png"];
var numberOfItemsInCart = 0;
var orderTotal = 0;

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e)
{
	hideErrors();
	if(numberOfItemsInCart == 0)
	{
		alert("You have no items in your cart");
		e.preventDefault();
		document.getElementById("qty1").focus();
		return false;
	}
	else if(formHasErrors())
	{
		e.preventDefault();
		return false;

	}
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e)
{
	// Confirm that the user wants to reset the form.
	if ( confirm('Clear order?') )
	{
		// Ensure all error fields are hidden
		hideErrors();
		
		document.location.reload();

		/*var found = false;
		for(var i=0; i<5 && !found;i++)
		{
			if(document.getElementsByClassName("quantityField")[i].style.visibility !="hidden")
			{
				document.getElementsByClassName("qty")[i].focus();
				found = true;
			}

			
	    }
	    if(!found)
	    {
	    	document.getElementById("fullname").focus();

	    }
	    */
				
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();
	
	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;	
}

function formFieldHasInput(fieldElement)
{
	if ( fieldElement.value == null || trim(fieldElement.value) == "" )
	{
		return false;
	}
	
	return true;
}

function checkPostal(postal)
{
	var regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);
    return regex.test(postal.value);
}
function checkEmail(email) 
{
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regex.test(email.value);
}

function checkExpireDate(date)
{
	var d = new Date();
	var month = d.getMonth();
	var year = d.getYear();
	if(date.getYear()>year)
	{
		return true;
	}
	else if(date.getYear()==year && date.getMonth()>=(month+1))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function checkCreditCardNumber(numberText)
{
	var checkingFactors = "432765432";
	var accumulator = 0;
	if(isNaN(numberText) || numberText.length != 10)
	{
		return false;
	}
	for(var i=0; i<checkingFactors.length;i++)
	{
		accumulator += parseInt(numberText.charAt(i)) * parseInt(checkingFactors.charAt(i));
	}
	return ((11-(accumulator%11)) == parseInt(numberText.charAt(9)));
}
/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors()
{
	var errorFlag = false;

	var requiredFields = ["fullname","address","city","province","postal","email","cardname","month","cardnumber"];

	for(var i = 0; i< requiredFields.length; i++)
	{
		var field = document.getElementById(requiredFields[i]);

		if(!formFieldHasInput(field))
		{
			document.getElementById(requiredFields[i]+ "_error").style.display = "block";
			if(!errorFlag)
			{
				field.focus();
				if(i==0 || i==1||i==2||i==4||i==5||i==6||i==8)
				{
					field.select();
				}
			}
			errorFlag = true;

		}

	}
	if(!checkPostal(document.getElementById("postal")))
	{
		if(formFieldHasInput(document.getElementById("postal")))
		{
			document.getElementById("postalformat_error").style.display = "block";
		
		}
		if(!errorFlag)
		{
			document.getElementById("postal").focus();
			document.getElementById("postal").select();
		}
		errorFlag = true;
	}
	if(!checkEmail(document.getElementById("email")))
	{
		if(formFieldHasInput(document.getElementById("email")))
		{
			document.getElementById("emailformat_error").style.display = "block";
		
		}
		if(!errorFlag)
		{
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}
		errorFlag = true;
	}

    var radioInputs = ["visa","amex","mastercard"];
    var checked = false;
	for(var i=0;i<radioInputs.length;i++)
	{
		if(document.getElementById(radioInputs[i]).checked)
		{
			checked = true;
		}
	}
	if(!checked)
	{
		document.getElementById("cardtype_error").style.display = "block";
		if(!errorFlag)
		{
			document.getElementById("cardtype").focus();
			
		}
		errorFlag = true;
	}
    
    var date = new Date(document.getElementById("year").value,document.getElementById("month").value, 1);
	if(!checkExpireDate(date))
	{
		if(formFieldHasInput(document.getElementById("month")))
		{
			document.getElementById("expiry_error").style.display = "block";
		
		}
		if(!errorFlag)
		{
			document.getElementById("month").focus();
		}
		errorFlag = true;
	}
	
	var numberText = document.getElementById("cardnumber").value;
	if(!checkCreditCardNumber(numberText))
	{
		if(formFieldHasInput(document.getElementById("cardnumber")))
		{
			document.getElementById("invalidcard_error").style.display = "block";
		
		}
		if(!errorFlag)
		{
			document.getElementById("cardnumber").focus();
		}
		errorFlag = true;
	}
			
	

	return errorFlag;
}

/*
 * Adds an item to the cart and hides the quantity and add button for the product being ordered.
 *
 * param itemNumber The number used in the id of the quantity, item and remove button elements.
 */
function addItemToCart(itemNumber)
{
	// Get the value of the quantity field for the add button that was clicked 
	var quantityValue = trim(document.getElementById("qty" + itemNumber).value);

	// Determine if the quantity value is valid
	if ( !isNaN(quantityValue) && quantityValue != "" && quantityValue != null && quantityValue != 0 && !document.getElementById("cartItem" + itemNumber) )
	{
		// Hide the parent of the quantity field being evaluated
		document.getElementById("qty" + itemNumber).parentNode.style.visibility = "hidden";

		// Determine if there are no items in the car
		if ( numberOfItemsInCart == 0 )
		{
			// Hide the no items in cart list item 
			document.getElementById("noItems").style.display = "none";
		}

		// Create the image for the cart item
		var cartItemImage = document.createElement("img");
		cartItemImage.src = "images/" + itemImage[itemNumber - 1];
		cartItemImage.alt = itemDescription[itemNumber - 1];

		// Create the span element containing the item description
		var cartItemDescription = document.createElement("span");
		cartItemDescription.innerHTML = itemDescription[itemNumber - 1];

		// Create the span element containing the quanitity to order
		var cartItemQuanity = document.createElement("span");
		cartItemQuanity.innerHTML = quantityValue;

		// Calculate the subtotal of the item ordered
		var itemTotal = quantityValue * itemPrice[itemNumber - 1];

		// Create the span element containing the subtotal of the item ordered
		var cartItemTotal = document.createElement("span");
		cartItemTotal.innerHTML = formatCurrency(itemTotal);

		// Create the remove button for the cart item
		var cartItemRemoveButton = document.createElement("button");
		cartItemRemoveButton.setAttribute("id", "removeItem" + itemNumber);
		cartItemRemoveButton.setAttribute("type", "button");
		cartItemRemoveButton.innerHTML = "Remove";
		cartItemRemoveButton.addEventListener("click",
			// Annonymous function for the click event of a cart item remove button
			function()
			{
				// Removes the buttons grandparent (li) from the cart list
				this.parentNode.parentNode.removeChild(this.parentNode);

				// Deteremine the quantity field id for the item being removed from the cart by
				// getting the number at the end of the remove button's id
				var itemQuantityFieldId = "qty" + this.id.charAt(this.id.length - 1);

				// Get a reference to quanitity field of the item being removed form the cart
				var itemQuantityField = document.getElementById(itemQuantityFieldId);
				
				// Set the visibility of the quantity field's parent (div) to visible
				itemQuantityField.parentNode.style.visibility = "visible";

				// Initialize the quantity field value
				itemQuantityField.value = "";

				// Decrement the number of items in the cart
				numberOfItemsInCart--;

				// Decrement the order total
				orderTotal -= itemTotal;

				// Update the total purchase in the cart
				document.getElementById("cartTotal").innerHTML = formatCurrency(orderTotal);

				// Determine if there are no items in the car
				if ( numberOfItemsInCart == 0 )
				{
					// Show the no items in cart list item 
					document.getElementById("noItems").style.display = "block";
				}				
			},
			false
		);

		// Create a div used to clear the floats
		var cartClearDiv = document.createElement("div");
		cartClearDiv.setAttribute("class", "clear");

		// Create the paragraph which contains the cart item summary elements
		var cartItemParagraph = document.createElement("p");
		cartItemParagraph.appendChild(cartItemImage);
		cartItemParagraph.appendChild(cartItemDescription);
		cartItemParagraph.appendChild(document.createElement("br"));
		cartItemParagraph.appendChild(document.createTextNode("Quantity: "));
		cartItemParagraph.appendChild(cartItemQuanity);
		cartItemParagraph.appendChild(document.createElement("br"));
		cartItemParagraph.appendChild(document.createTextNode("Total: "));
		cartItemParagraph.appendChild(cartItemTotal);		

		// Create the cart list item and add the elements within it
		var cartItem = document.createElement("li");
		cartItem.setAttribute("id", "cartItem" + itemNumber);
		cartItem.appendChild(cartItemParagraph);
		cartItem.appendChild(cartItemRemoveButton);
		cartItem.appendChild(cartClearDiv);

		// Add the cart list item to the top of the list
		var cart = document.getElementById("cart");
		cart.insertBefore(cartItem, cart.childNodes[0]);

		// Increment the number of items in the cart
		numberOfItemsInCart++;

		// Increment the total purchase amount
		orderTotal += itemTotal;

		// Update the total puchase amount in the cart
		document.getElementById("cartTotal").innerHTML = formatCurrency(orderTotal);
	}		
}

/*
 * Hides all of the error elements.
 */
function hideErrors()
{
	var errorFields = document.getElementsByClassName("error");

	for(var i = 0; i<errorFields.length;i++)
	{
		errorFields[i].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function onLoad()
{
	hideErrors();
	document.getElementById("orderform").reset();
	document.getElementById("qty1").focus();

	document.getElementById("orderform").addEventListener("submit",validate,false);
	document.getElementById("orderform").addEventListener("reset",resetForm,false);

	document.getElementById("addMac").addEventListener("click",function(){addItemToCart("1")},false);
	document.getElementById("addMouse").addEventListener("click",function(){addItemToCart("2")},false);
	document.getElementById("addWD").addEventListener("click",function(){addItemToCart("3")},false);
	document.getElementById("addNexus").addEventListener("click",function(){addItemToCart("4")},false);
	document.getElementById("addDrums").addEventListener("click",function(){addItemToCart("5")},false);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", onLoad, false);