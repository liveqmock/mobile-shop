<template>
<div>
<div class="search-header"> 
    <input type="text" name="" class="search-input" placeholder="输入城市／首字母进行查询">
    <img class="searchLogo" src="../../images/gray-search.png">
</div>
  <div class="city">
    <span class="city-span">当前城市:</span>
    <span class="city-span">深圳市</span>
  </div>
  <div class="DWcity">
    <p class="DWcity-p">定位城市</p>
    <span class="DWcity-span margin-30">深圳</span>
  </div>
  <div class="RMcity">
     <p class="RMcity-p">热门城市</p>
     <ul>
       <li>热门</li>
       <li>热门</li>
       <li>热门</li>
       <li>热门</li>
       <li>热门</li>
     </ul>
  </div>
  <div class="cityList">
      <ul>
        <p>A</p>
        <li>鞍山</li>
      </ul>
  </div>
</div>

</template>

<script type="text/ecmascript-6">

export default {
  data(){
    return{
     
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.search-header{
  height: 1.426667rem;
  width: 100%;
  border-bottom: 1px solid #d7d7d7;
  background-color: #FFF;
  text-align: center;
  line-height: 1.333333rem;
  .search-input{
    height: 0.746667rem;
    width: 9.333333rem;
    background-color:#e6e6e6;
    border-radius: 0.4rem;
    border:none;
    outline: none;
    padding-left: 0.266667rem;
    font-size: 0.373333rem;
    text-align: center;
  }
  .searchLogo{
    position: absolute;
    top: 0.43rem;
    left: 2.33333rem;
    width: 0.48rem;
    height: 0.48rem;
  }
}
.city{
  height: 1.173333rem;
  width: 100%;
  background-color: #FFF;
  line-height: 1.173333rem;
  .city-span{
    margin-left: 0.266667rem;
    font-size: 0.373333rem;
  }
}
.DWcity{
  height: 2.533333rem;
  width: 100%;
  background-color: #f3f3f3;
  padding-top:0.4rem;
  .DWcity-p{
    font-size: 0.373333rem;
    color:#666666;
    padding-left:0.266667rem;
    
  }
  .DWcity-span{
    display: block;
    height: 1.066667rem;
    width: 2.8rem;
    background-color: #FFF;
    text-align: center;
    line-height: 1.066667rem;
    font-size: 0.373333rem;
    color: #666;
    border-radius:0.4rem;
    border:1px solid #f4f4f4;
    margin-left: 0.4rem;
  }
  
}
.RMcity{
  width: 100%;
  background-color: #f3f3f3;
  padding-top:0.4rem;
  overflow: hidden;
  padding-bottom:0.4rem;
  .RMcity-p{
    font-size: 0.373333rem;
    color:#666666;
    padding-left:0.266667rem;
  }
  ul{
    list-style: none;
    margin:0;
    padding:0;
    li{
    height: 1.066667rem;
    width: 2.8rem;
    background-color: #FFF;
    text-align: center;
    line-height: 1.066667rem;
    font-size: 0.373333rem;
    color: #666;
    border-radius:0.4rem;
    border:1px solid #f4f4f4;
    margin-left: 0.4rem;
    margin-top: 0.4rem;
    float: left;
    }
  }
}
.cityList{
  list-style: none;
  margin:0;
  padding:0;
  p{
    font-size: 0.373333rem;
    color: #666;
    padding-left:0.266667rem;
    height: 0.6rem;
    line-height: 0.6rem;
    background-color: #f3f3f3;
  }
  li{
    height: 1.186667rem;
    line-height: 1.186667rem;
    padding-left:0.266667rem;
    border-bottom:1px solid #d7d7d7;
    background-color: #FFF;
  }
}
.margin-30{
    margin-top: 0.4rem;
  }
</style>
