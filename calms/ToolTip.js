var new_window

function open_new_window(sKey,sLabel) 
{
	new_window = window.open("http://www.umcom.org/calms/com_CalmsHelp.asp?HelpKey=" + sKey + "&Label=" + sLabel,"hoverwindow","width=300,height=220,align=center,scrollbars=yes");
}

function close_window() 
{
	if (new_window != null)
	{
		new_window.close()
		new_window = null
	}
}

function validate()
{
	var theForm = document.createForm;
	var x = 0;
	
	for ( i=0; i < theForm.radio.length; i++ )
	{
		if ( theForm.radio[i].checked == false )
			x += 1
	}
	
	if ( x == 3 )
	{
		alert("Please select a resource to create.");
		return false;
	}
	
	return true;
}