/**
 * @author Brandon Wong
 */

var path = require('path');
var fs = require('fs');


class Log{
	
	static getTimeStamp(){
		let d = new Date();
		let stamp = d.toLocaleDateString() + " " + d.toLocaleTimeString();
		return stamp.replace(/:| /g, "_");
	}

	static logToFile(log_item){
		fs.appendFile(this.LOG_FILE, log_item + '\n', function(err){
			if (err) console.log(err);
		});
	}

	static log(str, type){
		let log_item = "[" + this.getTimeStamp() + "] << " + type + " >> : " + str;
		this.logToFile(log_item);
		console.log(log_item);
	}

	static info(str){
		this.log(str, "INFO");		
	}
	
	static warn(str){
		this.log(str, "WARN");
	}
	
	static fail(str){
		this.log(str, "FAIL");
	}

}
Log.LOG_FILE = path.join(__dirname, "../log.txt");

module.exports = Log
