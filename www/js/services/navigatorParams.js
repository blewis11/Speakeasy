angular.module ('starter.navigatorParams', [])

.service('NavigatorParameters',function(){

  var parameters={};  

  return{

    setParameters:function(param)
    {
      parameters=param;
    },

    getParameters:function()
    {
      var object=angular.copy(parameters);
      parameters={};
      return object;
    }
  };


});