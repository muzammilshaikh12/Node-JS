const http = require('http')
const fs = require('fs');
const { readFile } = require('fs/promises');
const server =  http.createServer((req , res)=> {
    if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My Page</title><head>");
    let message_array = fs.readFileSync('./message.txt',{encoding:'utf-8',flag:'r'})
    for(let i=0;i<message_array.length;i++) {
        res.write(message_array[i])
    }
    res.write(`<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form><body>`);
    return  res.end()
     }
     if(req.url === '/message' && req.method === 'POST') {
        const body=[];
        req.on('data',(chunk) => {
            body.push(chunk)
            // console.log(chunk)
        });

        req.on('end',() => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]
            fs.writeFileSync('message.txt',message )
            console.log(fs.readFileSync('./message.txt',{encoding:'utf-8',flag:'r'}))
         })
        
        res.statusCode=302
        res.setHeader=('Location','/')
        return res.end()
     }
})



server.listen(3000)
