
var data = 1;

var ning = {};
ning.log=function(str) {
    console.log(str);
}
$(document).ready(function(){
    //<a id="test">no allow</a>
    $("#test").click(function() {
        console.log($(this));
	var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
	    if (xmlhttp.readyState==4) {
		console.log("receive"+xmlhttp.readyState+",receive="+xmlhttp.responseText);  
	    }
        }
        xmlhttp.open("GET","http://xiao.yixun.com:8080/foo", true);
        xmlhttp.send();
    })

    //<a id="test2">allow</a>
    $("#test2").click(function() {
        console.log($(this));
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
	    if (xmlhttp.readyState==4) {
		console.log("receive"+xmlhttp.readyState+",receive="+xmlhttp.responseText);
	    }
        }
        xmlhttp.open("GET","http://ning.yixun.com:8080/foo", true);
        xmlhttp.send();
    })  	

    //<a id="test3">callback</a>
    $("#test3").click(function() {
        console.log($(this));
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
	    if (xmlhttp.readyState==4) {
		console.log("receive"+xmlhttp.readyState+",receive="+xmlhttp.responseText);
	    }
        }
        xmlhttp.open("GET","http://xiao.yixun.com:8080/bar", true);
        xmlhttp.send();
    })

    //<a id="test4">jquery cross</a>
    $("#test4").click(function() {
        $.getJSON("http://xiao.yixun.com:8080/bar?callback=?", function(json) {
            console.log(json);
	    if(json.errno == 0) {
		console.log("success with " + json.data);
	    }
	    else {
		console.log("failed with " + json.data);
	    }
        }); 
    })

    //<a id="test5">jquery cross no callback</a>
    $("#test5").click(function() {
        $.getJSON("http://xiao.yixun.com:8080/bar", function(json) {
            console.log(json);
        }); 
    })

    //<a id="test6">jquery cross with paramters</a>
    $("#test6").click(function() {
	var params = {'action' : 23};
	$.getJSON("http://xiao.yixun.com:8080/bar?callback=?",
		  params,
		  function(json){
		      console.log(json);
		      if(json.errno == 0) {
			  console.log("success with " + json.data);
		      }
		      else {
			  console.log("failed with " + json.data);
		      }
		  }); 
    })

    //<a id="test7">iframe cross</a>
    document.domain = 'yixun.com';
    $("#test7").click(function() {
	var ifr = document.createElement('iframe');
	ifr.src = 'http://xiao.yixun.com:8080/index.html';
	ifr.style.display = 'none';
	document.body.appendChild(ifr);
	ifr.callback = function(data){
	    console.log("get call back from iframe");
	    console.log("get data = "+data.data);
	}
	//ifr.onload = function(){
	//    var doc = ifr.contentDocument || ifr.contentWindow.document;
	//    console.log(doc);
	//}
    })

    if(frameElement != null && typeof frameElement.callback == 'function') {
	var xmlhttp = new XMLHttpRequest();
	console.log("iframe call callback");
        xmlhttp.onreadystatechange=function() {
	    if (xmlhttp.readyState==4) {
		//change text to json
		frameElement.callback(eval('(' + xmlhttp.responseText + ')')); 
	    }
        }
        xmlhttp.open("GET","http://xiao.yixun.com:8080/foo", true);
        xmlhttp.send();
    }

    //<a id="test8">Access-Control-Allow-Origin</a>
    $("#test8").click(function() {
        console.log($(this));
	var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange=function() {
	    if (xmlhttp.readyState==4) {
		console.log("receive"+xmlhttp.readyState+",receive="+xmlhttp.responseText);
	    }
        }
        xmlhttp.open("GET","http://xiao.yixun.com:8080/header", true);
        xmlhttp.send();
    })

    //<a id="test9">POST</a>
    $("#test9").click(function() {
	var data={'test':1, "result":2};
        $.post("http://ning.yixun.com:8080/params", data, function(ret) {
	    console.log(ret);
	})
    })

    //<a id="test10">POST no allow</a>
    $("#test10").click(function() {
	var data={'test':1, "result":2};
        $.post("http://xiao.yixun.com:8080/params", data, function(ret) {
	    console.log(ret);
	})
    })

    //<a id="test11">POST with iframe</a>
    document.domain = 'yixun.com';
    $("#test11").click(function() {
	var data={'test':1, "result":2};

	var ifr = document.createElement('iframe');
	ifr.src = 'http://xiao.yixun.com:8080/index.html';
	ifr.style.display = 'none';
	ifr.name = "frame0"
	document.body.appendChild(ifr);
	var inputs=[];
	$.each(data,function(k,v){
	    inputs.push('<input type="hidden" name="'+k+'" value="'+v+'" />');
	});
	var form=$('<form method="post" id="postform" action="'+'http://xiao.yixun.com:8080/params'+'" accept-charset="utf8" target="ifr">'+inputs.join('')+'</form>');
	
	//need wait for frame be created
	ifr.onload = function() {
	    form.appendTo($(ifr.contentDocument.body));
	    form.submit();
	};
	ifr.postcallback1 = function(ret){
	    console.log("get post call back from iframe");
	    console.log("get post return data = "+ret);
	}
    })

    if(frameElement != null && typeof frameElement.postcallback1 == 'function') {
	console.log("iframe post call callback");
	frameElement.postcallback1();
    }

    //<a id="test12">POST with iframe ajax</a>
    document.domain = 'yixun.com';
    $("#test12").click(function() {
	var data={'test':2, "result":3};

	var ifr = document.createElement('iframe');
	ifr.src = 'http://xiao.yixun.com:8080/index.html';
	ifr.style.display = 'none';
	ifr.name = "frame1"
	document.body.appendChild(ifr);
	var inputs=[];
	$.each(data,function(k,v){
	    inputs.push('<input type="hidden" name="'+k+'" value="'+v+'" />');
	});
	var form=$('<form method="post" id="postform" action="'+'http://xiao.yixun.com:8080/params'+'" accept-charset="utf8" target="ifr">'+inputs.join('')+'</form>');
	
	//need wait for frame be created
	ifr.onload = function() {
	    form.appendTo($(ifr.contentDocument.body));
	};
	ifr.postcallback2 = function(data){
	    console.log("get post call back from iframe");
	    console.log("get post return data = "+data);
	}
    })
    var timeoutID = setTimeout(function () {
	if(frameElement != null && typeof frameElement.postcallback2 == 'function') {
	    console.log("iframe post call callback");
	    if($("#postform") != null) {
		$.post("http://xiao.yixun.com:8080/params", $("#postform").serialize(), function(ret) {
		    frameElement.postcallback2(ret);
		})	
	    }
	}
    }, 50);
})
