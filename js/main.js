/*
Project 1
Edward M Murray Jr
ASD 1301
*/
$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

/*var storeData = function(data){
	console.log(data);
};*/
	
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
	
	function getSelectedRadio(){
		var radios = document.forms[0].category;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				categoryValue = radios[i].value;
			}
		}
	}
	
	function storeData(key){
		var id					= Math.floor(Math.random()*100000001);
		getSelectedRadio()
		var item				= {};
			item.rname 			= ["Recipe Name:", $('#rname').val()];
			item.dateadded 		= ["Date Added:", $('#dateadded').val()];
			item.rating 		= ["Rating:", $('#rating').val()];
			item.category 		= ["Category:", categoryValue];
			item.rtype 			= ["Recipe Type:", $('#rtype').val()];
			item.ringredients 	= ["Recipe Ingredients:", $('#ringredients').val()];
			item.rdirections 	= ["Recipe Directions:", $('#rdirections').val()];
			
		//Save into local storage
		localStorage.setItem(id, JSON.stringify(item));
		alert("Recipe Saved!");
	}
	
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};

