function _(selector){
    return document.querySelector(selector)
}
function __(selector){
    return document.querySelectorAll(selector)
}
function getCss(dom,cssName){
    return getComputedStyle(dom)[cssName]
}
function setCss(dom,cssName,cssValue){
    if(cssName=="opacity"){
        cssValue=cssValue/100
    }else if(cssName=="zIndex"){

    }else{
        cssValue=cssValue+"px"
    }
    dom.style[cssName]=cssValue
}
function css(dom,cssName,cssValue){
    if(cssValue==undefined){
        return getCss(dom,cssName)
    }else{
        setCss(dom,cssName,cssValue)
    }
}
function animate(dom,options,completeFn){
    var start,step,dest
    clearInterval(dom.timer)
    for(var key in options){
        if(key=="opacity"){
            options[key]*=100
        }
    }
    dom.timer=setInterval(()=>{
        var flag=true
        for(var prop in options){
            var val=css(dom,prop)
            val == 'auto' && (val = 0);
            start=prop=="opacity"?val*100:parseInt(val)
            // if(prop=="opacity"){
            //     start=css(dom,prop)*100
            // }else{
            //     start=parseInt(css(dom,prop))
            // }
            dest=options[prop]
            step=(dest-start)/10
            step=step>0?Math.ceil(step):Math.floor(step)
            start+=step
            if(start!=dest){
                flag=false
            }
            css(dom,prop,start)
        }
        if(flag){
            completeFn && completeFn(dom)
            clearInterval(dom.timer)
        }
    },20)
}
function removeClass(dom,cls){
    dom.classList.remove(cls)
}
function addClass(dom,cls){
    dom.classList.add(cls)
}
function each(likeArray,callback){
    var i=0
    var l=likeArray.length
    for(;i<l;i++){
        if(callback(likeArray[i],i)===false){
            break
        }
    }
}