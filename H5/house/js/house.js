// JavaScript Document
window.onload = function(){
	document.getElementById("unitprice").addEventListener("blur",validateUnitprice,false);
	document.getElementById("rent").addEventListener("blur",validateRent,false);
	document.getElementById("cost").addEventListener("blur",validateCost,false);
	document.getElementById("area").addEventListener("blur",validateArea,false);
	document.getElementById("interest").addEventListener("blur",validateInterest,false);
	var row = document.all("row");
	for(var i=0;i<row.length;i++){
		row[i].addEventListener("mouseover",function(){changeColor(this,'#FF0000');},false);
	    row[i].addEventListener("mouseout",function(){changeColor(this,'#00FFFF');},false);
		}
	document.getElementById("calbut").addEventListener("click",cal,false);
	}
function validateUnitprice(){
	return validateRegex("unitprice",/^\d+(\.\d{1,2})?$/);
	}
function validateRent(){
	return validateRegex("rent",/^\d+(\.\d{1,2})?$/);
	}
function validateCost(){
	return validateRegex("cost",/^\d+(\.\d{1,2})?$/);
	}
function validateArea(){
	return validateRegex("area",/^\d+(\.\d{1,2})?$/);
	}
function validateInterest(){
	return validateRegex("interest",/^\d+(\.\d{1,2})?$/);
	}
/*进行计算*/
function validate(){
	return validateUnitprice()&&
	       validateRent()&&
		   validateCost()&&
		   validateArea()&&
		   validateInterest();
	}
function cal(){
	if(validate()){
		var unitprice = parseFloat(getValue("unitprice"));//平米单价
		var area = parseFloat(getValue("area"));//面积
		var rent = parseFloat(getValue("rent"));//租金
		var cost = parseFloat(getValue("cost"));//物业费
		var first = parseInt(getValue("first"))/10;//首付比例
		var interest = parseInt(getValue("interest"))/100;//贷款利息
		/*首付金额*/
		document.getElementById("firstResult").innerHTML=round(unitprice*area*first,2)+"元";
		/*贷款总额*/
		document.getElementById("totalResult").innerHTML=round(unitprice*area*(1-first),2)+"元";
		/*每月利息*/
		document.getElementById("monthResult").innerHTML=round(unitprice*area*(1-first)*interest/12,2)+"元";
		/*每月业务费*/
		document.getElementById("costResult").innerHTML=round(area*cost,2)+"元";
		/*每月租金*/
		document.getElementById("rentResult").innerHTML=round(area*rent,2)+"元";
		}
	}

