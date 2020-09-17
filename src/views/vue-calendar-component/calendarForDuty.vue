
<template>
  <section class="wh_container" @touchstart="moveClick" @touchmove="moveEv" @touchend="moveEnd">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate,false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{dateTop}}</li>
        <li @click="NextMonth(myDate,false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(tag,tagindex) in textTop" :key="tagindex">
          <div class="wh_top_tag">
            {{tag}}
          </div>
        </div>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(item,index) in list" :key="index" @click="clickDay(item,index)">
          <span v-if="item.markClassName" :class="[{show_soild:item.markClassName=='mark2'},{show_soild_red:item.markClassName=='mark1'}]"></span>
					<div class="wh_item_date" v-bind:class="[{ wh_isMark: item.isMark},{wh_other_dayhide:item.otherMonth!=='nowMonth'},{wh_want_dayhide:item.dayHide},{wh_isToday:item.isToday},{wh_chose_day:item.chooseDay},{wh_isweek_end:item.isWeekEnd}]"><!-- ,setClass(item) -->
            {{item.id}}
          </div>
					
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import timeUtil from './calendar.js';
export default {
  data() {
    return {
      textTop: ['日','一', '二', '三', '四', '五', '六'],
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: '',
      swcount:0,
			pageXI:0,
			pageYI:0,
    };
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    agoDayHide: { type: String, default: `0` },
    futureDayHide: { type: String, default: `2554387200` }
  },
  created() {
    this.myDate = new Date();
  },
  methods: {
    setClass(data) {
      let obj = {};
			console.log(data.markClassName)
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay: function (item, index) {
      if (item.otherMonth === 'nowMonth' && !item.dayHide) {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== 'nowMonth') {
        item.otherMonth === 'preMonth'
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date);
      }
    },
    ChoseMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = new Date(date);
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    PreMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'preMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth: function (date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, 'nextMonth');
      this.$emit('changeMonth', timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs: function () {
      let markDate = this.markDate;
      for (let i = 0; i < markDate.length; i++) {
        markDate[i] = timeUtil.dateFormat(markDate[i]);
      }
      let markDateMore = this.markDateMore;
      for (let i = 0; i < markDateMore.length; i++) {
        markDateMore[i].date = timeUtil.dateFormat(markDateMore[i].date);
      }
      return [markDate, markDateMore];
    },
    getList: function (date, chooseDay, isChosedDay = true) {
      const [markDate, markDateMore] = this.forMatArgs();
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      let arr = timeUtil.getMonthList(this.myDate);
      let weeknum=0;
      for (let i = 0; i < arr.length; i++) {
        let markClassName = '';
        let k = arr[i];
        k.chooseDay = false;
        k.isWeekEnd=false;//定义是否为周末
        if(i==0||i%7==0){
        	k.isWeekEnd=true;
        	weeknum++;
        }
        if(i%6==weeknum-1){
        	k.isWeekEnd=true;
        }

        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || '';
          }
        }
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        //无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        if (k.isToday) {
          this.$emit('isToday', nowTime);
        }
        let flag = !k.dayHide && k.otherMonth === 'nowMonth';
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit('choseDay', nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime && !chooseDay && flag
        ) {
          k.chooseDay = true;
        }
      }
      this.list = arr;
    },
    moveEv(e){
    	this.swcount++;
		if(this.swcount>5){
			let pageY=e.changedTouches[0].pageY;
			//console.log("yvalue=>"+(pageY-this.pageYI)*4)
			let pageX=e.changedTouches[0].pageX;


		}else{
			//this.locky=false;
		}
  	},
  	moveEnd(e){
  	 		let pageX=e.changedTouches[0].pageX;
  	 		console.log(pageX+"===>"+this.pageXI)
  	 		/*左右滑*/
			if(pageX+50<this.pageXI){
				  console.log("进入右滑")
				  this.NextMonth();
  				this.swcount=0;
			}else if(pageX>this.pageXI+50){
					console.log("进入左滑")
					this.PreMonth();
  				this.swcount=0;
			}
  	},
  	moveClick(e){
  		this.swcount=0;
  		console.log("moveClick==>"+e.changedTouches[0].pageX)
  		this.pageXI=e.changedTouches[0].pageX;
  		this.pageYI=e.changedTouches[0].pageY;
  	}
  },
  mounted() {
    this.getList(this.myDate);
  },
  watch: {
    markDate(val, oldVal) {
      this.getList(this.myDate);
    },
    markDateMore(val, oldVal) {
      this.getList(this.myDate);
    },
    agoDayHide(val, oldVal) {
      this.agoDayHide = parseInt(val);
      this.getList(this.myDate);
    },
    futureDayHide(val, oldVal) {
      this.futureDayHide = parseInt(val);
      this.getList(this.myDate);
    }
  }
};
</script>
<style scoped>
@media screen and (min-width: 460px) {
  .wh_item_date:hover {
    background: #71c7a5;
    cursor: pointer;
  }
}
* {
  margin: 0;
  padding: 0;
}

.wh_container {
  max-width: 410px;
  margin: auto;
  height: 335px;
}
.show_soild{
	  width: 20px;
    height: 3px;
    background: #3FBB3C;
    display: block;
    margin-left: 14px;
    border-radius: 30px;
		position: absolute;
    top: 32px;
}
.show_soild_red{
	  width: 20px;
    height: 3px;
    background: red;
    display: block;
    margin-left: 14px;
    border-radius: 30px;
		position: absolute;
    top: 32px;
}

li {
  list-style-type: none;
}
.wh_top_changge {
  display: flex;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: black;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}


.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: .8;
}
.wh_content_all {
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
    "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
  /*background-color: #0fc37c;*/
  background-color: white;
  /*background: url(http://192.168.88.222:8088/hg/resources/upload/background/1.jpg);*/
  width: 100%;
  overflow: hidden;
  height: 100%;
  /*padding-bottom: 8px;*/
}
.wh_isweek_end{
	color: red;
}
.wh_content {
  display: flex;
  flex-wrap: wrap;
  padding: 0 3% 0 3%;
  width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}

.wh_content_item,
wh_content_item_tag {
  font-size: 15px;
  width: 13.4%;
  text-align: center;
  color: black;
  position: relative;
}
.wh_content_item {
  height: 40px;
}

.wh_top_tag {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid black;
  border-left: 2px solid black;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  transform: rotate(45deg);
}
.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  background: blue;
  z-index: 2;
}
.wh_content_item .wh_other_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
  color: #bfbfbf;
}
.wh_content_item .wh_isToday {
  background: #c9d2ea;
  border-radius: 100px;
}
.wh_content_item .wh_chose_day {
  background: #c9ead9;
  border-radius: 100px;
}

.mark1 {
  margin: auto;
  border-radius: 100px;
  background: #f6ecc6;
  z-index: 2;
}

.mark2 {
  margin: auto;
  border-radius: 100px;
  z-index: 2;
  background-color: #e8c5f4;
}
.mark3 {
  margin: auto;
  border-radius: 100px;
  z-index: 2;
  background-color: aquamarine;
}
</style>
