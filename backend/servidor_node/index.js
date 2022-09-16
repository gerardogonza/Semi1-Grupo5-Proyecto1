const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = 8000;
const cors = require('cors');
const encrypt = require('./encrypt')
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
    let respuesta = {respuesta: "true"};

    password = encrypt.encrypt(password)


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

app.post('/login', (req, res)=>{
    let username = req.body.username;
    let password1 = req.body.password;
    let listado = []


    let params = {
        TableName: 'users',
        KeyConditionExpression: '#username_s = :s',
        ExpressionAttributeValues: {
            ':s': username
          },
        ExpressionAttributeNames: {'#username_s': 'username'}
    };       

    dynamoClient.query(params, function(err, data) {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            //console.log('----------------------- Entro ----------------------- ')
            //console.log(data.Items)
            data.Items.forEach(function(i){
                listado.push(i.password)
            })
        }
     

        let buscaUsuario = listado.map(function(password) {
            
            var descrypted = encrypt.decrypt(password) 
            if (password1 == descrypted){
                res.send(data.Items)
            }else{ 
                let respuesta = []
                res.send(respuesta)
                return console.log("User does not exist")
            } 
 
        });
    });
    
})



app.get('/loginViejo', (req, res)=>{
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
            var descrypted = encrypt.decrypt(data.Item.password) 
            if (password == descrypted)
                console.log(data.Item);
            else return console.log("User does not exist")
    });

    res.send(respuesta)
})



app.post('/addfile', (req, res)=>{
    let owner = req.body.owner
    let name = req.body.name
    let type = req.body.type
    let s3_path = req.body.s3_path
    let respuesta = {respuesta: "true"};

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
            respuesta = {respuesta: "false"};
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
            console.log("File uploaded")
        }
    });

    res.send(respuesta)
})



app.post('/editfile', (req, res)=>{
    let owner = req.body.owner
    let name = req.body.name
    let new_name = req.body.new_name
    let type = req.body.type
    let respuesta = {respuesta: "true"};

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
            respuesta = {respuesta: "false"};
        } else {
            let params1 = {
                TableName: 'files',
                Key: {'owner': owner, 'id':data.Items[0].id},
                UpdateExpression: 'SET #name = :n, #type = :t',
                ExpressionAttributeNames: {'#name' : 'name', '#type' : 'type'},
                ExpressionAttributeValues: {
                    ':n' : new_name,
                    ':t' : type,
                  }
            };
        
            dynamoClient.update(params1).promise();
            console.log("Success")
        }
    });

    res.send(respuesta)
})



app.delete('/deletefile', (req, res)=>{
    let owner = req.body.owner
    let name = req.body.name
    let respuesta = {respuesta: "true"};

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
            respuesta = {respuesta: "false"};
        } else {
            let params1 = {
                TableName: 'files',
                Key: {'owner': owner, 'id':data.Items[0].id}
            };
        
            dynamoClient.delete(params1).promise();
            console.log("File deleted")
        }
    });

    res.send(respuesta)
})



app.post('/home', (req, res)=>{
    let owner = req.body.owner
    let type = req.body.type
    let miUrl = ''
    let respuesta = {respuesta: "true"};

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
            miUrl = data.Item.url
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
            respuesta = {respuesta: "false"};
            res.send(respuesta)
        } else {
            let objeto = {files: data.Items, foto: miUrl}
            console.log(objeto)
            res.send(objeto)
        }
    });

    //res.send(respuesta)
})



app.post('/addfriend', (req, res)=>{
    let emisary = req.body.emisary
    let reciever = req.body.reciever
    let respuesta = {respuesta: "true"};

    console.log('emisary: ',emisary)
    console.log('reciever: ',reciever)

    let params = {
        TableName: 'friendship',
        Item: {
          'emisary' : emisary,
          'reciever' : reciever
        }
    };
    
  
    dynamoClient.put(params).promise();
    console.log('Friend added')


    res.send(respuesta)
})

 
/*
app.get('/friendsfiles', (req, res)=>{
    let emisary = req.body.emisary
    let type = 'public'
    let respuesta = {respuesta: "true"};
    let listado = []


    let params = {
        TableName: 'friendship',
        KeyConditionExpression: '#emisary_s = :s',
        ExpressionAttributeValues: {
            ':s': emisary
          },
        ExpressionAttributeNames: {'#emisary_s': 'emisary'}
    };

    dynamoClient.query(params, function(err, data) {
        if (err) {
            console.log(err);
            respuesta = {respuesta: "false"};
        } else {
            console.log('----------------------- Entro ----------------------- ')
            //console.log(data.Items)
            data.Items.forEach(function(i){
                listado.push(i.reciever)
            })
            console.log('Listado: ',listado)
        }

        let recieverAmigo = listado.map(function(owner) {
            console.log('----------------------- Entro 2 ----------------------- ')
            console.log('Amigo: ',owner)
            
            let params2 = {
                TableName: 'files',
                KeyConditionExpression: '#owner_s = :s',
                ExpressionAttributeValues: {
                    ':s': owner,
                    ':f': type
                },
                FilterExpression: '#type = :f',
                ExpressionAttributeNames: {'#owner_s': 'owner', '#type': 'type'}
            };

            dynamoClient.query(params2, function(err2, data2) {
                if (err2) {
                    console.log(err2);
                    respuesta = {respuesta: "false"};
                } else {
                    console.log('############## Sus archivos ############## ')
                    console.log(data2.Items)
                } 
            });

        });
    });



    
    res.send(respuesta)
})
*/