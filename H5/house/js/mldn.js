// JavaScript Document
//通用定义函数
/*判断输入内容是否为空*/
function validateEmpty(eleName){
	 var obj = document.getElementById(eleName);
	 var msg = document.getElementById(eleName+"Msg");
	 if(obj.value !=""){
		 obj.className="right";
		 if(msg!=null){
			 msg.innerHTML="<font color='#0000FF'>内容输入正确！</font>";
			 }
		 return true;
		 }else{
			 obj.className="wrong";
			 if(msg !=null){
				 msg.innerHTML="<font color='#FF0000'>内容不允许为空！</font>";
				 }
			 return false;
			 }
	}
/*对输入内容进行正则判断*/
function validateRegex(eleName,regex){
	var obj = document.getElementById(eleName);
	var msg = document.getElementById(eleName+"Msg");
	if(regex.test(obj.value)){
		obj.className="right";
		if(msg !=null){
			msg.innerHTML="<font color='#0000FF'>内容输入正确！</font>";
			}
		return true;
		}else{
			obj.className="wrong";
			if(msg !=null){
				msg.innerHTML="<font color='#FF0000'>内容输入格式错误！</font>";
				}
			return false;
			}
	}
/*改变颜色*/
function changeColor(obj,color){
	obj.bgColor = color;
	}
/*精确位数的四舍五入*/
function round(num,scale){
	return Math.round(num*Math.pow(10,scale))/Math.pow(10,scale);
	}
/*取得元素中的值*/
function getValue(eleName){
	if(document.getElementById(eleName)){
		return document.getElementById(eleName).value;
		}
	}