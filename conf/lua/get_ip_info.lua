http=require("socket.http")
result=http.request("http://ip.taobao.com/service/getIpInfo.php?ip=123.189.1.100")
print(result)
