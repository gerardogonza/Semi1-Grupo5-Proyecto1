const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-east-1',
    accessKeyId: 'AKIAS73YTZZY6ENQATXM',
    secretAccessKey: '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'
})

const dynamoClient = new AWS.DynamoDB.DocumentClient()

app.listen(port, ()=>{
    console.log("servidor encendido");
})


app.get('/', (req, res)=>{
    res.send({data:"info enviada"})
})

app.post('/signup', (req, res)=>{
    let username = req.body.username;
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    let url = req.body.url;
    let respuesta = true;


    let params = {
        TableName: 'users',
        Item: {
          'username' : username,
          'name' : name,
          'password' : password,
          'email' : email,
          'url' : url
        }
    };
    
  
    dynamoClient.put(params).promise();


    res.send(respuesta);
})




app.get('/login', (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let respuesta = true

    //console.log('username: ',username)
    //console.log('password: ',password)

    let params = {
        TableName: 'users',
        Key: {
            'username': username
        }
    };

    dynamoClient.get(params, function(err, data) {
        if (err) 
            console.log(err);
        else 
            if (password == data.Item.password)
                console.log(data.Item);
            else return console.log("User does not exist")
    });

    res.send(respuesta)
})



app.post('/addfile', (req, res)=>{
    let owner = req.body.owner
    let name = req.body.name
    let type = req.body.type
    let s3_path = 'ruta_prueba'
    let respuesta

    //console.log('owner: ',owner)
    //console.log('name: ',name)
    //console.log('type: ',type)
    //console.log('s3_path: ',s3_path)

    let params = {
        TableName: 'files',
        KeyConditionExpression: '#owner_s = :s and id > :e',
        ExpressionAttributeValues: {
            ':s': owner,
            ':e': 0
          },
        ExpressionAttributeNames: {'#owner_s': 'owner'}
    };

    //Gerardo Hueco

    dynamoClient.query(params, function(err, data) {
        if (err) {
            console.log(err);
            respuesta = false
        } else {
            var id;
            if(data.Items.length != 0) {
                var ultimo = data.Items[data.Items.length - 1];
                id = ultimo.id+1;
            } else {
                id = 1;
            }
            console.log(id);
            let params1 = {
                TableName: 'files',
                Item: {
                  'owner' : owner,
                  'id' : id,
                  'name' : name,
                  'type' : type,
                  's3_path' : s3_path
                }
            };
            
          
            dynamoClient.put(params1).promise();
            respuesta = true
            console.log("File uploaded")
        }
    });

    res.send(respuesta)
})



app.post('/editfile', (req, res)=>{
    let owner = req.body.owner
    let name = req.body.name
    let new_name = req.body.new_name
    let new_type = req.body.new_type
    let respuesta

    //console.log('owner: ',owner)
    //console.log('name: ',name)
    //console.log('new_name: ',new_name)
    //console.log('type: ',new_type)

    let params = {
        TableName: 'files',
        KeyConditionExpression: '#owner_s = :s and id > :e',
        ExpressionAttributeValues: {
            ':s': owner,
            ':e': 0,
            ':f': name
          },
        FilterExpression: '#name = :f',
        ExpressionAttributeNames: {'#owner_s': 'owner', "#name": 'name'}
    };

    //Gerardo Hueco

    dynamoClient.query(params, function(err, data) {
        if (err) {
            console.log(err);
            respuesta = false
        } else {
            let params1 = {
                TableName: 'files',
                Key: {'owner': owner, 'id':data.Items[0].id},
                UpdateExpression: 'SET #name = :n, #type = :t',
                ExpressionAttributeNames: {'#name' : 'name', '#type' : 'type'},
                ExpressionAttributeValues: {
                    ':n' : new_name,
                    ':t' : new_type,
                  }
            };
        
            dynamoClient.update(params1).promise();
            respuesta = true
            console.log("Success")
        }
    });

    res.send(respuesta)
})



app.delete('/deletefile', (req, res)=>{
    let owner = req.body.owner
    let name = req.body.name
    let respuesta

    //console.log('owner: ',owner)
    //console.log('name: ',name)

    

    let params = {
        TableName: 'files',
        KeyConditionExpression: '#owner_s = :s and id > :e',
        ExpressionAttributeValues: {
            ':s': owner,
            ':e': 0,
            ':f': name
          },
        FilterExpression: '#name = :f',
        ExpressionAttributeNames: {'#owner_s': 'owner', "#name": 'name'}
    };

 

    dynamoClient.query(params, function(err, data) {
        if (err) {
            console.log(err);
            respuesta = false
        } else {
            let params1 = {
                TableName: 'files',
                Key: {'owner': owner, 'id':data.Items[0].id}
            };
        
            dynamoClient.delete(params1).promise();
            respuesta = true
            console.log("File deleted")
        }
    });

    res.send(respuesta)
})

app.post('/home', (req, res)=>{
    let owner = req.body.owner
    let type = req.body.type
    let respuesta = true

    let params = {
        TableName: 'users',
        Key: {
            'username': owner
        }
    };

    dynamoClient.get(params, function(err, data) {
        if (err) 
            console.log(err);
        else 
            console.log(data.Item.url)
    });

    let params2 = {
        TableName: 'files',
        KeyConditionExpression: '#owner_s = :s and id > :e',
        ExpressionAttributeValues: {
            ':s': owner,
            ':e': 0,
            ':f': type
          },
        FilterExpression: '#type = :f',
        ExpressionAttributeNames: {'#owner_s': 'owner', '#type': 'type'}
    };

    dynamoClient.query(params2, function(err, data) {
        if (err) {
            console.log(err);
            respuesta = false
        } else {
            console.log(data.Items)
        }
    });

    res.send(respuesta)
})
