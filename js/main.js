/*
Project 1
Edward M Murray Jr
ASD 1301
*/
$('#home').on('pageinit', function(){
});
	
$('#additem').on('pageinit', function(){

		var rform = $('#recipeform');
		    rform.validate({
			invalidHandler: function(form, validator) {
			
			},
			submitHandler: function() {
		var data = rform.serializeArray();
			storeData(data);
		}
	});
	
	//-----Get Radio Value---
	function getSelectedRadio(){
		var radios = document.forms[0].category;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				categoryValue = radios[i].value;
			}
		}
	}
	//---Toggle Controls----
	function toggleControls(n){
		switch(n){
			case "on":
				$('#recipeform').hide();
				$('#clear').show();
				$('#displayLink').hide();
				$('#addNew').show();
				break;
			case "off":
				$('#recipeForm').show();
				$('#clear').show();
				$('#displayLink').show();
				$('#addNew').hide();
				$('#items').hide();
				break;
			default:
				return false;
		}
	}
	//---Save form---
	function storeData(key){

		var id					= Math.floor(Math.random()*100000001);
		
		getSelectedRadio()
		var item				= {};
			item.rname 			= ["Recipe Name:", $('#rname').val()];
			item.dateadded 		= ["Date Added:", $('#dateadded').val()];
			item.category 		= ["Category:", categoryValue];
			item.rtype 			= ["Recipe Type:", $('#rtype').val()];
			item.ringredients 	= ["Recipe Ingredients:", $('#ringredients').val()];
			item.rdirections 	= ["Recipe Directions:", $('#rdirections').val()];
			
		//Save into local storage
		localStorage.setItem(id, JSON.stringify(item));
		alert("Recipe Saved!");
		$("#recipeform").resetForm();
	}
	//---Display Saved Data---
	function getData(){
		toggleControls("on")
		if(localStorage.length === 0){
			alert("There are no recipes stored. Default recipes were added.");
			autoFillData();
		}
		var makeDiv = $('<div>');
		makeDiv.attr("id", "items");
		var makeList = $('<ul>');
		makeDiv.append(makeList);
		$('#savedR').append(makeDiv);
		$('#items').css('display', 'block' );
		for(var i=0, length=localStorage.length; i<length; i++){
			var makeLi = $('<li>');
			var linksLi = $('<li>');
			makeList.append(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = jQuery.parseJSON(value);
			var makeSubList = $('<ul>');
			makeLi.append(makeSubList);
			for (var n in obj){
				var makeSubLi = $('<li>');
				makeSubList.append(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.text(optSubText);
				makeSubList.append(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi);
		}
	}
	//---Create edit and delete item links---
	function makeItemLinks(key, linksLi){
		var editLink = $('<a>');
		editLink.attr("href", "#");
		editLink.attr("key", key);
		var editText = "Edit Recipe";
		editLink.on("click", editItem);
		editLink.text(editText);
		linksLi.append(editLink);
		
		var breakTag = document.createElement('br');
		linksLi.append(breakTag);
		
		var deleteLink = $('<a>');
		deleteLink.attr("href", "#");
		deleteLink.attr("key", key);
		var deleteText = "Delete This recipe";
		deleteLink.on("click", deleteItem);
		deleteLink.text(deleteText);
		linksLi.append(deleteLink);
	}
	//---Edit item function. Can not get it to work---
	function editItem(){ 
		var value = localStorage.getItem($(this).attr("key"));
		var item = jQuery.parseJSON(value);
		
		toggleControls("off");
		$('#displayLink').hide();
		
		$('#rname').val(item.rname[1]);
		$('#dateadded').val(item.dateadded[1]);
		var radios = $('input[name="category"]:checked').val();
		$('#rtype').val(item.rtype[1]);
		$('#ringredients').val(item.ringredients)[1];
		$('#rdirections').val(item.rdirections)[1];
		save.off("click", storeData);
		$('#submit').val("Edit Recipe");	
		var editSubmit = $('#submit');
		editSubmit.on("click");
		editSubmit.attr("key", this.key);
	}
	//---Delete item---
	function deleteItem(){
		var ask = confirm("Are your sure you want to delete this recipe?");
		if(ask){
			localStorage.removeItem($(this).attr("key"));
			alert("Recipe was deleted!");
			window.location.reload();
		}else{
			alert("Recipe was NOT deleted.");
		}
	}
	//---Clear all items in LocalStorage---
	function clearLocal(){
		if(localStorage.length === 0){
			alert("No recipes to clear.");
		}else{
			localStorage.clear();
			alert("All recipes have been deleted!");
			window.location.reload();
			return false;
		}
	}
	//---Auto populate JSON data in to local storage---
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	var displayLink = $('displayLink');
	$('#displayLink').on("click", getData);
	
	var clearLink = $('clear');
	$('#clear').on("click", clearLocal);
	
	var save = $('submit');
	$('#submit').on("click", storeData);
	
	$('#addNew').click(function() {
    location.reload();
    });
	
});


