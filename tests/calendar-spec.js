var $ = require('jquery'),
  expect = require('expect.js'),
  sinon = require('sinon'),
  Panel = require('../src/panel'),
  Header = require('../src/header'),
  Calendar = require('../src/calendar'),
  DatePicker = require('../src/datepicker'),
  MonthPicker = require('../src/monthpicker'),
  Resource = require('../src/resource');

require('bui-dpl/css/bs3/dpl.css');
require('bui-dpl/css/bs3/bui.css');

var CLS_DATE = 'x-datepicker-date',
    CLS_TEXT_YEAR= 'year-text',
    CLS_PREV = 'x-datepicker-prev',
    CLS_NEXT = 'x-datepicker-next';
    CLS_TEXT_MONTH = 'month-text';

$('<div id="c1"></div>').appendTo('body');

$('<div id="c2"></div>').appendTo('body');

$('<div id="c3"></div>').appendTo('body');

$('<div id="c4"></div>').appendTo('body');

$('<div id="c6"></div>').appendTo('body');

$('<div id="c7"></div>').appendTo('body');

function today(){
    var now = new Date();
    return new Date(now.getFullYear(),now.getMonth(),now.getDate());
  }

describe('测试panel', function(){
  var DateUtil = BUI.Date;
    
  var today = new Date(),
    selDay = DateUtil.addDay(10,today),
    panel =new Panel({
      render : '#c1',
      selected : selDay
    });
    
  panel.render();

  var el = panel.get('el');

  describe("测试日期加减",function(){
    var year = 2012,
      month = 9,
      day = 5,
      date = new Date(year,month,day);
    it('测试日期加减',function(){
      expect(DateUtil.addDay(1,date).getDate()).to.be(day + 1);
      expect(DateUtil.addDay(-1,date).getDate()).to.be(day - 1);
      expect(DateUtil.addDay(10,date).getDate()).to.be(day + 10);
    });
    it('测试日期加减',function(){

      expect(DateUtil.addWeek(1,date).getDate()).to.be(day + 7);
      expect(DateUtil.addWeek(-1,date).getDate()).to.be(28);
      expect(DateUtil.addWeek(3,date).getDate()).to.be(day + 21);
    });

  });

  describe('测试日期容器生成',function(){

    it('测试容器生成',function(){
      expect(panel.get('year')).to.be(selDay.getFullYear());
      expect(panel.get('month')).to.be(selDay.getMonth());
    });

    it('测试日期生成',function(){
      expect($('.'+CLS_DATE,el).length).to.be(42);
    });

    it('测试日期选中默认选中日期',function(){
      var view =panel.get('view'),
        selectEl = view._findDateElement(selDay);
      expect(selectEl.length).to.be(1);
    });
  });
  
  describe('测试日期容器方法',function(){

    it('测试容更改月',function(){
      var view =panel.get('view'),
        year = panel.get('year'),
        month = panel.get('month'),
        toMonth = (month + 2)%12;
      panel.setMonth(year,toMonth);

      expect(view._findDateElement(new Date(year,month))).to.be(null);

      expect(view._findDateElement(new Date(year,toMonth))).not.to.be(null);
        

    });

    it('测试容更改年',function(){

      var view =panel.get('view'),
        year = panel.get('year'),
        toYear = year + 2,
        month = panel.get('month'),
        toMonth = (month + 2)%12;
      panel.setMonth(toYear,month);

      expect(view._findDateElement(new Date(year,month))).to.be(null);

      expect(view._findDateElement(new Date(toYear,month))).not.to.be(null);
    });

    it('测试容更改年月',function(){
      var view =panel.get('view'),
        year = panel.get('year'),
        toYear = year + 2,
        month = panel.get('month'),
        toMonth = (month + 2)%12;
      panel.setMonth(toYear,toMonth);

      expect(view._findDateElement(new Date(year,month))).to.be(null);

      expect(view._findDateElement(new Date(toYear,toMonth))).not.to.be(null);
    });

    it('测试选择当月日期',function(){
      var view =panel.get('view'),
        year = panel.get('year'),
        month = panel.get('month'),
        day = 15,
        newDate = new Date(year,month,day);
      panel.set('selected',newDate);
      expect(view._findDateElement(newDate)).not.to.be(null);
    });

    it('测试选择其他月日期',function(){
      var view =panel.get('view'),
        year = panel.get('year'),
        month = panel.get('month') + 1,
        day = 15,
        newDate = new Date(year,month,day);
      panel.set('selected',newDate);
      expect(view._findDateElement(newDate)).not.to.be(null);
    });

  });

});

describe('测试header', function(){
  var today = new Date(),
    DateUtil = BUI.Date,
    year = today.getFullYear(),
    month = today.getMonth(),
    header = new Header({
      year: year,
      month :month,
      render : '#c2'
    });

  header.render();
  headerEl = header.get('el');

  describe('日期头生成',function(){
    it('测试头部生成',function(){
      expect(headerEl.length).to.be(1);
      expect(headerEl.find('.x-datepicker-month').length).not.to.be(0);
    });

    it('测试年月显示',function(){
      expect(headerEl.find('.bui-year-month-text').text().indexOf(year.toString())).not.to.be(-1);
      expect(headerEl.find('.bui-year-month-text').text().indexOf((month+1).toString())).not.to.be(-1);
    });
  });

  describe('改变年月',function(){
    it('更改月',function(){
      header.setMonth(year,month+2)
      expect(headerEl.find('.bui-year-month-text').text().indexOf((month+3).toString())).not.to.be(-1);
    });

    it('更改年',function(){
      header.setMonth(year+2,month+2)
      expect(headerEl.find('.bui-year-month-text').text().indexOf((year+2).toString())).not.to.be(-1)
    });
  });

  describe('点击更改月',function(){

    it('上一月',function(){
      var year = header.get('year'),
        month = header.get('month');

      //jasmine.simulate(headerEl.find('.'+CLS_PREV)[0],'click');
      //.fire('click');
      headerEl.find('.'+CLS_PREV).trigger('click');
      expect(header.get('month')).to.be((month-1)%12);
    });

    it('下一月',function(){
       var year = header.get('year'),
        month = header.get('month');

      //jasmine.simulate(headerEl.find('.'+CLS_NEXT)[0],'click');
      headerEl.find('.'+CLS_NEXT).trigger('click');
      expect(header.get('month')).to.be((month+1)%12);
    });
  });
 
});

describe('测试calendar生成', function(){

  var calendar = new Calendar({
    render:'#c3'
  }),
  DateUtil = BUI.Date;
  calendar.render();
 
  var el = calendar.get('el'),
    header = calendar.get('header'),
    panel = calendar.get('panel');

  describe('测试生成',function(){

    it('测试生成头',function(){
      expect(el.find('.bui-calendar-header').length).not.to.be(0);
    });

    it('测试生成容器',function(){
      expect(el.find('.bui-calendar-panel').length).not.to.be(0);
    });

    it('测试选中默认日期',function(){
      var equals = DateUtil.isDateEquals(panel.get('selected'),today());
      expect(equals).to.be.ok();
    });
  });
});

describe('测试日期范围', function(){

  var calendar = new Calendar({
    render:'#c6',
    minDate : '2010-01-01',
    selectedDate : new Date('2013/06/05'),
    maxDate : '2013-06-06'
  }),
  DateUtil = BUI.Date;
  calendar.render();
 
  var el = calendar.get('el'),
    header = calendar.get('header'),
    panel = calendar.get('panel'),
    pview = panel.get('view');

  describe('测试日期范围',function(){

    it('测试日期范围内的日期',function(){
      var itemEl = pview._findDateElement(new Date('2013/06/06'));
      expect(itemEl.hasClass('x-datepicker-disabled')).to.be(false);
    });

    it('测试日期范围外的日期',function(){
      var itemEl = pview._findDateElement(new Date('2013/06/07'));
      expect(itemEl.hasClass('x-datepicker-disabled')).to.be(true);
    });

    it('测试日期最小值外的日期',function(){
      panel.set('selected',new Date('2010/01/01'));
      var itemEl = pview._findDateElement(new Date('2009/12/31'));
      expect(itemEl.hasClass('x-datepicker-disabled')).to.be(true);

      var itemEl = pview._findDateElement(new Date('2010/01/02'));
      expect(itemEl.hasClass('x-datepicker-disabled')).to.be(false);
    });

    it('更改最小值',function(){
      calendar.set('minDate','2010-10-06');
      var itemEl = pview._findDateElement(new Date('2010/01/02'));
      expect(itemEl.hasClass('x-datepicker-disabled')).to.be(true);
    });

    it('更改最大值',function(){
       calendar.set('maxDate','2013-06-10');
      panel.set('selected',new Date('2013/06/13'));
      var itemEl = pview._findDateElement(new Date('2013/06/07'));
      expect(itemEl.hasClass('x-datepicker-disabled')).to.be(false);
    });

  });
});

describe('测试日期生成', function(){

  var calendar = new Calendar({
    render:'#c4',
    showTime : true
  }),
  DateUtil = BUI.Date;
  calendar.render();
 
  var el = calendar.get('el'),
    header = calendar.get('header'),
    panel = calendar.get('panel'),
    timePicker = calendar.get('timePicker'),
    footer = calendar.get('footer');

  describe('测试生成',function(){

    it('测试生成头',function(){
      expect(el.find('.bui-calendar-header').length).not.to.be(0);
    });

    it('测试生成容器',function(){
      expect(el.find('.bui-calendar-panel').length).not.to.be(0);
    });

    it('测试选中默认日期',function(){
      var equals = DateUtil.isDateEquals(panel.get('selected'),today());
      expect(equals).to.be.ok();
    });

    it('测试时间生成',function(){
      expect(el.find('.x-datepicker-time').length).not.to.be(0);
    });
  });
});

describe('测试datepicker', function(){
  $('<input type="text" id="dt1" class="calendar-time"/>').appendTo('body');
  var datepicker = new DatePicker({
    trigger:'.calendar-time',
    showTime : true
  }),
  DateUtil = BUI.Date;
  datepicker.render();
  datepicker._initControl();
  var calendar = datepicker.get('calendar'),
    dtInput = $('#dt1'),
    el = calendar.get('el');
  var str = "2007-10-10 22:10:01",
    date = DateUtil.parse(str);
  dtInput.val(str);
  describe('显示时间日期',function(){

    it('点击显示日期控件',function(){
      dtInput.trigger('click');
      expect(datepicker.get('visible')).to.be(true);
    });
    it('测试初始时间',function(){
      expect(el.find('.x-datepicker-time').length).not.to.be(0);
      expect(calendar.get('hour')).to.be(date.getHours());
      expect(calendar.get('minute')).to.be(date.getMinutes());
      expect(calendar.get('second')).to.be(date.getSeconds());
    });

    it('测试选择时，分，秒',function(){
      var hour = parseInt(el.find('.x-datepicker-hour').val());
      expect(hour).to.be(date.getHours());
    });
    it('测试点击确定',function(){

    });
  });
});

describe('测试锁定日期', function(){
  $('<input type="text" id="lt1" class="calendar-time"/>').appendTo('body');
  var lockTime ={minute:55,second:44};
  var datepicker = new DatePicker({
    trigger:'#lt1',
    showTime : true,
    lockTime : lockTime
  });
  datepicker.render();
  datepicker._initControl();
  var calendar = datepicker.get('calendar'),
    dtInput = $('#lt1'),
    el = calendar.get('el');
    describe("测试锁定时间",function(){
        it('点击显示日期控件',function(){
            dtInput.trigger('click');
            expect(datepicker.get('visible')).to.be(true);
        });
        it("测试锁定时间",function(){
            expect(el.find('.x-datepicker-time').length).not.to.be(0);
            expect(calendar.get('minute')).to.be(lockTime.minute);
            expect(calendar.get('second')).to.be(lockTime.second);
        });
    });
});

describe('测试monthpicker', function(){
  var year = 2001,
    month = 10,
    monthpicker = new MonthPicker({
      render:'#m1',
      month:month,
      year:year,
      align : {
        points:['tl','tl']
      },
      success:function(){
        alert(this.get('year') + ' ' + this.get('month'));
      }
    }),
    DateUtil = BUI.Date;
  monthpicker.show();
  var el = monthpicker.get('el'),
    monthPanel = monthpicker.get('monthPanel'),
    yearPanel = monthpicker.get('yearPanel');
  describe('测试生成',function(){

    it('测试月生成',function(){
      expect(monthPanel).not.to.be(undefined);
      expect(el.find('.x-monthpicker-months').length).not.to.be(0);
    });
    it('测试年生成',function(){
      expect(yearPanel).not.to.be(undefined);
      expect(el.find('.x-monthpicker-years').length).not.to.be(0);
    });

    it('测试默认选中的年月',function(){
      expect(monthPanel.getSelectedValue()).to.be(month);
      expect(yearPanel.getSelectedValue()).to.be(year);
    })
  });

});


describe('测试文本替换', function(){
  describe('测试生成',function(){
    var calendar;
    var elMonth;
    var elCalender;
    it('初始化',function () {
      Resource.setLanguage('en');
      calendar = new Calendar({
        render:'#c7'
      }),
      DateUtil = BUI.Date;
      calendar.render();

      monthpicker = new MonthPicker({
          render:'#m2'
        }),
      monthpicker.show();

      elMonth = monthpicker.get('el');
      elCalender = calendar.get('el');
    })
    it('测试星期文本',function(){
      expect(elCalender.find('.x-datepicker-inner').find('th[title="Sunday"]').text()).to.be(Resource.weekDays[0]);
    });

    it('测试月份文本',function(){
     expect(elMonth.find('.x-monthpicker-month:first a').text()).to.be(Resource.months[0]);
    });

    it('测试按钮文本',function(){
      expect(elMonth.find('.x-monthpicker-footer .button-primary').text()).to.be(Resource.submit);
    });
  });

});

