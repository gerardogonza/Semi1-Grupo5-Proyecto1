from flask import Flask, render_template, request
from flask_lt import run_with_lt
import boto3
from boto3.dynamodb.conditions import Key, Attr
from flask_cors import CORS
import encrypt

app = Flask(__name__)
CORS(app)
run_with_lt(app)

dynamodb = boto3.resource('dynamodb',
                        aws_access_key_id='AKIAS73YTZZY6ENQATXM',
                        aws_secret_access_key='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',
                        region_name='us-east-1')

@app.route('/')
def hello():
    return 'Hello World'

@app.post('/home')
def home():
    if request.method == 'POST':
        owner = request.json['owner']
        type = request.json['type']
        
        table1 =dynamodb.Table('files')

        response1 = table1.query(
            KeyConditionExpression = Key('owner').eq(owner)
        )

        items = response1['Items']

        files = []

        for archivo in items:
            if archivo['type'] == type:
                files.append(archivo)

        table2 = dynamodb.Table('users')


        response2 = table2.query(
            KeyConditionExpression = Key('username').eq(owner)
        )

        user = response2['Items']

        url = user[0]['url']

        objeto = {
                    "files" :files,
                    "foto": url
        }

        return objeto
       

@app.route('/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        username = request.json['username']
        name = request.json['name']
        password = request.json['password']
        email= request.json['email']
        url = request.json["url"] 

        password = encrypt.encrypt(password)

        table = dynamodb.Table('users')

        table.put_item(
                Item = {
                    'username': username,
                    'name': name,
                    'password': password,
                    'email':    email,
                    'url':      url
                }
        )
        
        return {"respuesta": True}

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':   
        username = request.json['username']
        password = request.json['password']

        table = dynamodb.Table('users')
        response = table.query(
            KeyConditionExpression = Key('username').eq(username)
        )
        items = response['Items']
        encryptedpassword = items[0]['password']

        decryptedpassword = encrypt.decrypt(encryptedpassword)

        if str(password) == str(decryptedpassword):
            return items
        return []

@app.route('/addfile', methods=['POST'])
def addfile():
    if request.method == 'POST':
        owner = request.json['owner']
        name = request.json['name']
        type= request.json['type']
        s3_path= request.json['s3_path']

        table = dynamodb.Table('files')

        response = table.query(
            KeyConditionExpression = Key('owner').eq(owner)
        )

        items =response['Items']
        if len(items) == 0:
            id = 1
        else:
            id = items[-1]['id'] + 1

        table.put_item(
                Item = {
                    'owner': owner,
                    'id': id,
                    'name': name,
                    'type': type,
                    's3_path': s3_path
                }
        )
        
        return {"respuesta": True}

@app.route('/editfile', methods=['POST'])
def editfile():
    if request.method == 'POST':
        owner = request.json['owner']
        name = request.json['name']
        new_name = request.json['new_name']
        type= request.json['type']

        table = dynamodb.Table('files')

        response = table.query(
            KeyConditionExpression = Key('owner').eq(owner)
        )

        id = 0

        for item in response['Items']:
            if(item['name'] == name):
                id = item['id']

        if(id == 0):
            return 'File Doesnt Exist'
       
        table.update_item(Key={
                            'owner': owner,
                            'id': id},
                        AttributeUpdates={
                           'name':{
                                'Value': new_name
                            },
                            'type':{
                               'Value': type
                           }})
        
        return {"respuesta": True}

@app.route('/deletefile', methods=['DELETE'])
def deletefile():
    if request.method == 'DELETE':
        owner = request.json['owner']
        name = request.json['name']

        table = dynamodb.Table('files')

        response = table.query(
            KeyConditionExpression = Key('owner').eq(owner)
        )

        id = 0

        for item in response['Items']:
            if(item['name'] == name):
                id = item['id']

        if(id == 0):
            return 'File Doesnt Exist'
    
        table.delete_item(Key={
                            'owner': owner,
                            'id': id})
        
        return {"respuesta": True}

@app.route('/addfriend', methods=['POST'])
def addfriend():
    if request.method == 'POST':
        emisary = request.json['emisary']
        reciever = request.json['reciever']

        table = dynamodb.Table('friendship') 

        table.put_item(
                Item = {
                    'emisary': emisary,
                    'reciever': reciever
                }
        )
        
        return {"respuesta": True}

    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)