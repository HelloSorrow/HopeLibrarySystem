/*修改密码*/
(function(global,$){
	$("#save").click(function(){
		var val1=$("#reset-password").val();
		var val2=$("#config-password").val();
		if(val1.length==0){
			layer.alert('请至少输入6位密码', {
                skin: 'layui-layer-molv', 
                closeBtn: 0,
                shift: 2
            });
            return;
		};
		if(val2.length==0){
			layer.alert('请确认密码', {
                skin: 'layui-layer-molv', 
                closeBtn: 0,
                shift: 2
            });
            return;
		}
		if(val1!==val2){
			layer.alert('两次输入密码不一致', {
                skin: 'layui-layer-molv', 
                closeBtn: 0,
                shift: 2
            });
            return;
		}
		$.ajax({
        	dataType:"json",
        	async:true,
        	data:{"password":val1},
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
                        var p=location.pathname,
                            redirect="/"+p.split("/")[1];
                        location.replace(redirect);
                    },500)
        		},
        	error:function(){
        		/*layer.alert("请求失败，请重试！",{
        			skin: 'layui-layer-molv',  
                    closeBtn: 0,
                    shift: 2 
        		});*/
        	},
        	complete:function(){
        		
        	}

        })
	})
})(window,jQuery)