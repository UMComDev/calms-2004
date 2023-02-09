//open parish text popup function
function openParishText() {
	window.open('parish_text.html','parishtext','scrollbars=yes,width=600,height=400,top=10,left=10');
}
// Newsletter registration functions
buttonClicked = false;

function regWindow()
{
	regwin = window.open('about:blank','regform','width=500,height=500');
}

function checkEmail()
{
	var x = 0;

	if ( isEmail(document.subForm.email.value) == false )
	{
		alert("Please enter a valid e-mail address.");
		document.subForm.email.focus();
		return false;
	}

	buttonClicked = true
	regWindow();
	setTimeout('document.subForm.submit()',500);
}

function isEmail(string)
{
	if (string.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
		return true;
	else
		return false;
}

// Netscape 4.7x is picky. that's why this is here.
function netscape()
{
	checkEmail();
}

