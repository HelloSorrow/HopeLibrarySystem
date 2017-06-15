/*用户自行修改信息的函数*/
(function(global,$){
	$("#save").click(function(){
        var sex=$.trim($(":radio[name=sex]:checked").parent().text());
        var studentNumber=$.trim($("#studentNumber").val());
        var readerEmail=$.trim($("#readerEmail").val());
        var readerPhone=$.trim($("#readerPhone").val());
        var readerMajor=$.trim($("#readerMajor").val());
        var readerGroup=$.trim($(":radio[name=hopeGroup]:checked").parent().text());
        var readerName=$.trim($("#readerName"));
        var readerImgSrc = $('#js-upload-img').attr('src');
        $.ajax({
            dataType:"json",
            async:true,
            data:{"readerName":readerName,"sex":sex,"studentNumber":studentNumber,"readerEmail":readerEmail,"readerPhone":readerPhone,"readerMajor":readerMajor,"readerGroup":readerGroup,'readerImgSrc':readerImgSrc},
            type:"POST",
            beforeSend:function(){
            },
            success:function(response){
                if(response){
                    var success=response.message;
                }
                layer.alert(success,{
                    skin: 'layui-layer-molv',
                    closeBtn: 0,
                    shift: 2
                });
                setTimeout(function(){
                    location.assign("/user");
                },500)
            },
            error:function(){
                layer.alert("请求失败",{
                    skin: 'layui-layer-molv',
                    closeBtn: 0,
                    shift: 2
                });
            },
            complete:function(){
            }
        });
	});
})(window,jQuery);