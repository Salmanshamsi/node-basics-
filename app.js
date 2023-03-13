const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(process.cwd(),"file.txt")
const servar = http.createServer((req,res)=>{

        if(req.url === "/")
        {
            res.write("hello 2 world");
            res.end();
        }
        else if(req.url === "/form")
        {
            res.setHeader("Content-Type","text/html")
            res.write("<form action='/submit' method='POST'><input name='data'/><input name='data2'/><button>Submit</button></form>");
            res.end();
        }
        else if(req.url === "/submit")
        {
            let data = "";
            req.on("data",(chunk)=>data+=chunk);
            req.on("end",()=>{
                fs.readFile(filePath,"utf8",(_,fileData)=>{
                    const newData = fileData + "\n" + data
                    fs.writeFile(filePath,newData,()=>{
                        res.setHeader("Content-Type","text/html")
                        res.write("<h1>your from has been submitted</h1>");
                        res.end();
                    });
                })
            });
        }
        else
        {
            res.write("404-not-found!");
            res.end();
        }

})