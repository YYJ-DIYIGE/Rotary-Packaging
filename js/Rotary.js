  class Swiper{
  constructor(props){
    this.state = {
      id: props.id, 
      leftbtn: props.leftbtn,
      rightbtn: props.rightbtn,
      index: 0,
      duration: 500,
      isLock: false,
      translateX: 0,
      defaultLenght: null,
      itemWidth: null
    };
    this._init();
    }
    _init(){
      this._clone();
      this._bing();
    }
    _bing(){
      let swiperPrev = document.getElementById(this.state.leftbtn);
      let swiperNext = document.getElementById(this.state.rightbtn);
      swiperPrev.addEventListener('click',this.swiperPrev.bind(this));
      swiperNext.addEventListener('click',this.swiperNext.bind(this));
      window.addEventListener('resize',this.swiperReset.bind(this));
    }
    swiperReset(e) {
      let swiperList = document.getElementById(this.state.id);
      let swiperItemWidth = swiperList.offsetWidth;
      let index = this.state.index;
      let translateX = - (swiperItemWidth + swiperItemWidth * index);
      this.state.itemWidth = swiperItemWidth;
      this.state.translateX = translateX;
      swiperList.style.transform = `translateX(${translateX}px)`;
    }
    _clone(){
      let swiperList = document.getElementById(this.state.id);
      let swiperItemLength = swiperList.childElementCount;
      console.log(swiperList.childElementCount)
      let firstItem = swiperList.firstElementChild.cloneNode();
      let lastItem = swiperList.lastElementChild.cloneNode();
      let index = this.state.index;
      let swiperItemWidth = swiperList.offsetWidth;
      this.state.defaultLenght = swiperItemLength;
      this.state.itemWidth = swiperItemWidth;
      this.state.translateX = - (swiperItemWidth + swiperItemWidth * index);
      swiperList.appendChild(firstItem);
      swiperList.prepend(lastItem);
      this.goIndex(index);
    }
    swiperPrev() {
      let index = this.state.index;
      this.goIndex(index - 1);
    }
    swiperNext() {
      let index = this.state.index;
      this.goIndex(index + 1);
    }
    goIndex(index){
      let swiperDuration = this.state.duration;
      let swiperItemWidth = this.state.itemWidth;
      let beginTranslateX = this.state.translateX;

      let endTranslateX = - (swiperItemWidth + swiperItemWidth * index);
      let swiperList = document.getElementById(this.state.id);

      let isLock = this.state.isLock;
      if(isLock){
        return
      }
      this.state.isLock = true;
      let that = this ;
      this.animateTo(beginTranslateX,endTranslateX,swiperDuration,function(value){
        swiperList.style.transform = `translateX(${value}px)`;
      },function(value){
        let swiperLength = that.state.defaultLenght;
        if(index === -1){
          index = swiperLength - 1;
          value =  - (swiperItemWidth + swiperItemWidth * index);
        }
        if(index === swiperLength){
          index = 0;
          value =  - (swiperItemWidth + swiperItemWidth * index);
        }

        swiperList.style.transform = `translateX(${value}px)`;
        that.state.index = index;
        that.state.translateX = value;
        that.state.isLock = false;

        })
      }
     animateTo(begin,end,duration,changeCallback,finishCallback){
      let startTime = Date.now();
      let than = this ;
      requestAnimationFrame(function update(){
        let dataNow = Date.now();
        let time = dataNow - startTime;
        let value = than.linear(time,begin,end,duration);
        typeof changeCallback === 'function' && changeCallback(value)
        if(startTime + duration > dataNow){
          requestAnimationFrame(update)
        }else{
          typeof finishCallback === 'function' && finishCallback(end)
        }
      })
    }
    linear(time, begin, end, duration) { 
      return ( end - begin ) * time / duration + begin;
    }
  }