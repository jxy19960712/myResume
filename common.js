/**
 * Created by JXY on 2017/4/22.
 */
function i$(id) {
    return document.getElementById(id)
};

// 获取第一个元素的兼容代码---------------------------------------------------
function getFirstChildren(element) {
    if(typeof element.firstElementChild!="undefined"){
        return element.firstElementChild;
    }
    else{
        var fstND=element.firstChild;
        while(fstND.nodeType!=1){
            fstND=fstND.nextSibling;
        }
        return fstND;
    };
};
// 匀速移动动画封装函数---------------------------------------------------
function mov(element,target) {
    clearInterval(element.timeid)
    element.timeid=setInterval(function () {
        var now=element.offsetLeft;
        var step=target-now>0?1:-1;
        if((Math.abs(target-now))>Math.abs(step)){
            element.style.left=(now+=step)+"px";
        }
        else{
            clearInterval(element.timeid)
            element.style.left=target+"px";
        }
    },1)
};
// 获取滚轮卷曲上边距和左边距的封装函数---------------------------------------------------
function getScroll() {
    return{
        left:document.body.scrollLeft||document.documentElement.scrollLeft||window.pageXOffset||0,
        top:document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset||0
    }
}
// 终级缓速动画封装函数---------------------------------------------------
function animateSlow(element,attr,fn) {
    clearInterval(element.timeid)
    element.timeid=setInterval(function () {
        var flag=true;      //这里引用一个变量来作为所有条件达成的标记
        for( var i in attr){    //这里使用for in 遍历json里所有的数据  i为下标  i即为属性名
            if(i=="opacity"){
                var now =getComputedStyleAttr(element,i)*100;
                var step = (attr[i]*100 - now) / 10;
                step=step>0?Math.ceil(step):Math.floor(step)
                if(now!==attr[i]*100){
                    element.style[i]=(now+=step)/100;
                    flag=false;
                }
            }
            else if(i=="zIndex"){
                element.style[i]=attr[i];
            }
            else{
                var now =parseInt(getComputedStyleAttr(element,i));
                var step=(attr[i]-now)/10;
                step=step>0?Math.ceil(step):Math.floor(step)
                if(now!==attr[i]){
                    element.style[i]=(now+=step)+"px";
                    flag=false;
                }
            }
        }
        if(flag){
            clearInterval(element.timeid);
            if(fn){
                fn()
            }
        }
        console.log("step=="+step)
    },20)
};
// 获取任意元素的任意计算后的任意属性值---------------------------------------------------
function getComputedStyleAttr(element,attr) {
    return window.getComputedStyle?window.getComputedStyle(element,null)[attr]:element.currentStyle[attr]
};
//clinet兼容函数
function getclinet() {
    return{
        width:window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth,
        height:window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight
    }
}