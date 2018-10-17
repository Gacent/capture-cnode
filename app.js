var express = require("express");
var cheerio = require('cheerio');
var superagent = require('superagent');
var fs = require("fs");

var app = express();

app.get("/", function(req, res) {
	//	superagent.get("https://cnodejs.org/").end(function(err, sres) {
	//		if(err) {
	//			return res.send("出错")
	//		}
	//		var $ = cheerio.load(sres.text);
	//		var items = [];
	//		$("#topic_list .topic_title").each(function(idx, element) {
	//			items.push({
	//				title: $(element).attr("title"),
	//				href: $(element).attr("href")
	//			})
	//		})
	//		var obj={
	//			items:items
	//		}
	//		fs.writeFile("./data.json",JSON.stringify(obj),function(err){
	//			if(err){
	//				return res.send("出错")
	//			}
	//			res.send("保存成功")
	//		})
	//	});
	
	//promise写法
	var items = [];
	getWang("https://cnodejs.org/").then(function(data) {
		var $ = cheerio.load(data);
		$("#topic_list .topic_title").each(function(idx, element) {
			items.push({
				title: $(element).attr("title"),
				href: $(element).attr("href")
			})
		})
		var obj = {
			items: items
		}
		fs.writeFile("./data.json", JSON.stringify(obj), function(err) {
			if(err) {
				return res.send("出错")
			}
			res.send("保存成功")
		})
	})

	function getWang(url) {
		return new Promise(function(resolve, reject) {
			superagent.get(url).end(function(err, sres) {
				if(err) {
					reject(err)
				}
				resolve(sres.text)
			})
		})
	}

})

app.listen(3000, function() {
	console.log("listening")
})