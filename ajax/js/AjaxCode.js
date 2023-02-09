
// declare a global  XMLHTTP Request object
var XmlHttpObj;

// create an instance of XMLHTTPRequest Object, varies with browser type, try for IE first then Mozilla
function CreateXmlHttpObj()
{
	// try creating for IE (note: we don't know the user's browser type here, just attempting IE first.)
	try
	{
		XmlHttpObj = new ActiveXObject("Msxml2.XMLHTTP");
	}
	catch(e)
	{
		try
		{
			XmlHttpObj = new ActiveXObject("Microsoft.XMLHTTP");
		} 
		catch(oc)
		{
			XmlHttpObj = null;
		}
	}
	// if unable to create using IE specific code then try creating for Mozilla (FireFox) 
	if(!XmlHttpObj && typeof XMLHttpRequest != "undefined") 
	{
		XmlHttpObj = new XMLHttpRequest();
	}
}

// called from onChange or onClick event of the continent dropdown list
function SectionListOnChange(fac) 
{
    //var SectionList = document.getElementById("SectionList");
    
    // get selected continent from dropdown list
    //var selectedSection = SectionList.options[SectionList.selectedIndex].value;
	var selectedSection = fac;
    //alert (selectedSection);
    // url of page that will send xml data back to client browser
    var requestUrl;
    // use the following line if using asp
    //requestUrl = "/ajax/xml_data_provider.asp" + "?filter=" + encodeURIComponent(selectedSection);
	requestUrl = "/Directory/ajax_Dp_GetUpdatedTimesXML.asp" + "?fac=" + encodeURIComponent(selectedSection);
	//alert ('45: ' + requestUrl);
    // use the following line if using php
    // requestUrl = "xml_data_provider.php" + "?filter=" + encodeURIComponent(selectedContinent);
    
	CreateXmlHttpObj();
	
	// verify XmlHttpObj variable was successfully initialized
	if(XmlHttpObj)
	{
        // assign the StateChangeHandler function ( defined below in this file)
        // to be called when the state of the XmlHttpObj changes
        // receiving data back from the server is one such change
		XmlHttpObj.onreadystatechange = StateChangeHandler;
		
		// define the iteraction with the server -- true for as asynchronous.
		XmlHttpObj.open("GET", requestUrl,  true);
		//alert('got the data from ' + requestUrl);
		
		// send request to server, null arg  when using "GET"
		XmlHttpObj.send(null);		
	}
}

function processXML(obj){
      var dataArray = obj.getElementsByTagName('Services');
      var dataArrayLen = dataArray.length;
      var insertData = '<ul id="list">';
      for (var i=0; i<dataArrayLen; i++){
          insertData += '<li>' + dataArray[i].firstChild.data + '</li>';
      }
      insertData += '</ul>';
	  alert ('76:insertData ' + insertData);
      document.getElementById ('ajaxRequest').innerHTML = insertData;
	  
	  //document.ajaxRequest.innerHTML = insertData;
	  alert ('79:getElementById ajaxRequest is: ' + document.getElementById ('ajaxRequest').innerHTML );
    }




function SectionListOnChange2() 
{
    var SectionList = document.getElementById("SectionList");
    
    // get selected continent from dropdown list
    var selectedSection = SectionList.options[SectionList.selectedIndex].value;
    //alert (selectedSection);
    // url of page that will send xml data back to client browser
    var requestUrl;
    // use the following line if using asp
    requestUrl = "/ajax/xml_data_provider.asp" + "?filter=" + encodeURIComponent(selectedSection);
	
    // use the following line if using php
    // requestUrl = "xml_data_provider.php" + "?filter=" + encodeURIComponent(selectedContinent);
    //var thelist;
	 //thelist = form1.SiteSectionID.value;
	 //alert(thelist);
	 var varSectionList = document.getElementById("SectionList");
    
    // get selected continent from dropdown list
    var varselectedSection = SectionList.options[varSectionList.selectedIndex].value;
	 //var thevar = form1.SectionList.options[SectionList.selectedIndex].value;
	 //alert(varselectedSection);
	 document.form1.SiteSectionID.value = varselectedSection;
	
	
	CreateXmlHttpObj();
	
	// verify XmlHttpObj variable was successfully initialized
	if(XmlHttpObj)
	{
        // assign the StateChangeHandler function ( defined below in this file)
        // to be called when the state of the XmlHttpObj changes
        // receiving data back from the server is one such change
		XmlHttpObj.onreadystatechange = StateChangeHandler2;
		
		// define the iteraction with the server -- true for as asynchronous.
		XmlHttpObj.open("GET", requestUrl,  true);
		//alert('XmlHttpObj.responseXML.parentNode : ' + XmlHttpObj.responseXML.parentNode);
		// send request to server, null arg  when using "GET"
		XmlHttpObj.send(null);		
	}
}


// this function called when state of  XmlHttpObj changes
// we're interested in the state that indicates data has been
// received from the server
function StateChangeHandler()
{
	// state ==4 indicates receiving response data from server is completed
	if(XmlHttpObj.readyState == 4)
	{
		
		// To make sure valid response is received from the server, 200 means response received is OK
		if(XmlHttpObj.status == 200)
		{			
			
			
			//var theStuff
			//theStuff = XmlHttpObj.responseXML
			//alert (theStuff);
			//alert('status ' + XmlHttpObj.status);
			//alert('XmlHttpObj.responseText : ' + XmlHttpObj.responseText);
			
			
			
			//alert ('153: stop before processXML with : ' + XmlHttpObj.responseText);
			PopulateSubSectionList(XmlHttpObj.responseText);
			//processXML(XmlHttpObj.responseText);
			// writing a list from XML -----sample code ...not enough info
			//list = XmlHttpObj.responseXML.documentElement;
				//if((items = list.childNodes).length > 0) {
					//list = document.createElement("UL");
					//list.id = type+"List";
					//BuildCategoryItems(list, items, type);
					//obj.appendChild(list);
				//}
			
			
			
		}
		else
		{
			alert("problem retrieving data from the server, status code: "  + XmlHttpObj.status);
		}
	}
}

// received from the server
function StateChangeHandler2()
{
	// state ==4 indicates receiving response data from server is completed
	if(XmlHttpObj.readyState == 4)
	{
		// To make sure valid response is received from the server, 200 means response received is OK
		if(XmlHttpObj.status == 200)
		{			
			PopulateSubSectionList2(XmlHttpObj.responseXML.documentElement);
		}
		else
		{
			alert("problem retrieving data from the server, status code: "  + XmlHttpObj.status);
		}
	}
}

// populate the contents of the country dropdown list
function PopulateSubSectionList(theHTMLoutput)
{
    alert ('196: PopulateSubSectionList , theHTMLoutput: ' + theHTMLoutput);
	
	document.getElementById ("ajaxRequest").innerHTML = theHTMLoutput
	
	alert ('ajaxRequest data HTML : ' & document.getElementById ("ajaxRequest").innerHTML);
	//showResponse(theHTMLoutput);
	var SubSectionList = document.getElementById("SubSectionList");
	// clear the country list 
	//for (var count = SubSectionList.options.length-1; count >-1; count--)
	//{
	//	SubSectionList.options[count] = null;
	//}

	//var SubSectionNodes = SubSectionNode.getElementsByTagName('STypes');
	
	//var SubSectionNodes = SubSectionNode.getElementsByTagName('SubSection');
	//var SubSectionNodes = SubSectionNode.getElementsByTagName('SubSection');
	//var idValue;
	//var textValue; 
	//var optionItem;
	// populate the dropdown list with data from the xml doc
	//for (var count = 0; count < SubSectionNodes.length; count++)
	//{
   		//textValue = GetInnerText(SubSectionNodes[count]);
		//idValue = SubSectionNodes[count].getAttribute("id");
		//optionItem = new Option( textValue, idValue,  false, false);
		//SubSectionList.options[SubSectionList.length] = optionItem;
	//}
}


// populate the contents of the country dropdown list in Edit Mode
function PopulateSubSectionList2(SubSectionNode)
{
    var SubSectionList = document.getElementById("SubSectionList");
	// clear the country list 
	for (var count = SubSectionList.options.length-1; count >-1; count--)
	{
		SubSectionList.options[count] = null;
	}

	var SubSectionNodes = SubSectionNode.getElementsByTagName('SubSection');
	var idValue;
	var textValue; 
	var optionItem;
	// populate the dropdown list with data from the xml doc
	for (var count = 0; count < SubSectionNodes.length; count++)
	{
   		textValue = GetInnerText(SubSectionNodes[count]);
		idValue = SubSectionNodes[count].getAttribute("id");
		optionItem = new Option( textValue, idValue,  false, false);
		SubSectionList.options[SubSectionList.length] = optionItem;
	}
	//alert (idValue);
	//alert ('textValue is:' + textValue);
	//alert ('count is:' + count);
	//alert ('idValue is:' + idValue);
	//document.form1.SubSectionList.selected.value = 0;
	document.form1.SiteSubSectionID.value = idValue;
}

// populate the contents of the subsection dropdown list in Edit Mode
function PopulateSubSectionList3(SubSectionNode)
{
    var SubSectionList = document.getElementById("SubSectionList");
	// clear the country list 
	for (var count = SubSectionList.options.length-1; count >-1; count--)
	{
		SubSectionList.options[count] = null;
	}

	var SubSectionNodes = SubSectionNode.getElementsByTagName('SubSection');
	var idValue;
	var textValue; 
	var optionItem;
	// populate the dropdown list with data from the xml doc
	for (var count = 0; count < SubSectionNodes.length; count++)
	{
   		textValue = GetInnerText(SubSectionNodes[count]);
		idValue = SubSectionNodes[count].getAttribute("id");
		optionItem = new Option( textValue, idValue,  false, false);
		SubSectionList.options[SubSectionList.length] = optionItem;
	}
	//alert (idValue);
	form1.SiteSubSectionID.value = idValue;
}


// returns the node text value 
function GetInnerText (node)
{
	 return (node.textContent || node.innerText || node.text) ;
}

function TextChange ()
{
	 var SubSectionList = document.getElementById("SubSectionList");
    
    // get selected continent from dropdown list
    var selectedSubSection = SubSectionList.options[SubSectionList.selectedIndex].value;
    //alert (selectedSection);
    // url of page that will send xml data back to client browser
    //var requestUrl;
    // use the following line if using asp
    //requestUrl = "/ajax/xml_data_provider.asp" + "?filter=" + encodeURIComponent(selectedSection);
    // use the following line if using php
    // requestUrl = "xml_data_provider.php" + "?filter=" + encodeURIComponent(selectedContinent);
    //var thelist;
	 //thelist = form1.SiteSectionID.value;
	 //alert(thelist);
	 //var varSectionList = document.getElementById("SectionList");
    
    // get selected continent from dropdown list
    //var varselectedSection = SectionList.options[varSectionList.selectedIndex].value;
	 //var thevar = form1.SectionList.options[SectionList.selectedIndex].value;
	 //alert (selectedSubSection);
	//alert ('textValue is:' + textValue);
	//alert ('count is:' + count);
	//alert ('idValue is:' + idValue);
	 //alert(selectedSection);
	 document.form1.SiteSubSectionID.value = selectedSubSection;	 
	
}


function getUpdatedTimes(fac)
	{
		//var fac = $F('Instances');
		//var y = $F('lstYears');
		var url = "http://dev.umc.org/Directory/ajax_Dp_GetUpdatedTimesHTML.asp";
		var pars = "fac=" + fac;
		
		var myAjax = new Ajax.Request(
			url, 
			{
				method: 'get', 
				parameters: pars, 
				onComplete: showResponse
			});
		
	}
	
	function trim(str) {
     str = str.replace( /^\s+/g, "" ); // strip leading
     str = str.replace( /\s+$/g, "" ); // strip trailing	
     return str;
} 
	
	function showResponse(originalRequest)
	{
		//put returned XML in the textarea
		//var theStuff;
		//theStuff = trim(originalRequest);
		//alert(' theStuff: ' + theStuff);
		//processXML(theStuff);
		alert ('351: originalRequest.responseText: ' + originalRequest.responseText);
		$('ajaxRequest').innerHTML = originalRequest.responseText;
		theStuff = $('ajaxRequest').innerHTML
		alert ('ajaxrequest local div: ' + theStuff);
		window.opener.document.getElementById("ajaxRequest").innerHTML = originalRequest.responseText
		
		//alert ('351: originalRequest.responseText: ' + originalRequest);
		//$('ajaxRequest').innerHTML = originalRequest.responseText;
		//alert ('353:' + $('ajaxRequest').innerHTML)
		//theStuff = $('ajaxRequest').innerHTML
		//alert ('354: ' + document.getElementById("ajaxRequest").innerHTML);
		//alert ('ajaxrequest local div: ' + theStuff);
		//window.opener.document.getElementById("ajaxRequest").innerHTML = $('ajaxRequest').innerHTML
		//var thelocalDiv;
		//thelocalDiv = $('ajaxRequest').innerHTML; 
		//thelocalDiv = document.getElementById("ajaxRequest").innerHTML
		//alert ('thelocalDiv: ' + thelocalDiv);
		//alert ('the child/local div: ' + thelocalDiv);
		
		//alert ('parent to be:' + $('opener.document.ajaxRequest').innerHTML);
		var parentDiv = opener.document.getElementById("ajaxRequest").innerHTML;
		//alert ('parent div: ' + opener.document.getElementById("ajaxRequest").innerHTML);
		alert (parentDiv);
		//parentDiv =  = $('ajaxRequest').innerHTML;
		
		//alert ('parent div after: ' + parentDiv);
		//opener.document.ajaxRequest.innerHTML = originalRequest.responseText;
		
		//$('ajaxRequest').innerHTML = originalRequest.responseText;		
		//$('result').value = originalRequest.responseText;

	}




function BuildCategoryItems(list, items, type) {
	var sub, subitm, obj, x, len = items.length;
	for(x=0; x<len; ++x) {
		if(items[x].nodeName != "#text") {
			obj = list.appendChild(document.createElement("LI"));
			obj.CCid = items[x].getAttribute('Id');
			obj.CCtype = type;
			obj.onclick = HilightListItem;
			obj.appendChild(document.createTextNode(items[x].getAttribute('Title')));
			if((subitm = items[x].childNodes).length > 0) {
				obj.className = "plus";
				sub = obj.appendChild(document.createElement("UL"));
				sub.style.display = "none";
				BuildCategoryItems(sub, subitm, type);
			} else {
				obj.className = "bullet";
			}
		}
	}
}


