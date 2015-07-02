
var BUI = require('bui-common');

var Res = {

	'zh-CN': {
		yearMonthMask: 'yyyy 年 mm 月',
		months : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
		weekDays : ['日','一','二','三','四','五','六'],
		today : "今天",
		clean : "清除",
		submit : "确定",
		cancel : "取消"
	},
	en: {
		yearMonthMask: "MMM yyyy",
		months : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
		weekDays : ['Su','Mo','Tu','We','Th','Fr','Sa'],
		today : "today",
		clean : "clean",
		submit : "submit",
		cancel : "cancel"
	},

	setLanguage: function  (type) {
	   if (Res[type]) {
	   	 BUI.mix(this,Res[type]);
	   }
	}
	
};

Res.setLanguage('zh-CN');
module.exports = Res;