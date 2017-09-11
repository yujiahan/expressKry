var addDishPage = new Vue({
    el: "#addDish",
    data: {
        param: {
            name: "",
            remarks:""
        },
        currentDish : [
        ]
    },
    methods: {
        addDish:function(){
            $.get('/dishType/submit?name='+ addDishPage.param.name +'&remarks=' + addDishPage.param.remarks, function(res){
                if(res.ret){
                    _updateDishList();
                }
            } )
        }
    }
})


_updateDishList();

function _updateDishList(){
    $.get('/dishType/query', function(result){
        addDishPage.currentDish  = result
    })
}