# capture-cnode

use grammar of promise to capture cnode


## 说明
> 这是一个利用node做的简单的爬虫，爬取的是cnode社区的信息，利用了两种写法，一种是普通写法，一种是经过改造的promise写法，package.json是依赖的包，没上传node_modules很正常

### 方法一
```javascript
		superagent.get("https://cnodejs.org/").end(function(err, sres) {
			if(err) {
				return res.send("出错")
			}
			var $ = cheerio.load(sres.text);
			var items = [];
			$("#topic_list .topic_title").each(function(idx, element) {
				items.push({
					title: $(element).attr("title"),
					href: $(element).attr("href")
				})
			})
			var obj={
				items:items
			}
			fs.writeFile("./data.json",JSON.stringify(obj),function(err){
				if(err){
					return res.send("出错")
				}
				res.send("保存成功")
			})
		});
```

### 方法二
```javascript
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
```
**详情见app.js**
### End