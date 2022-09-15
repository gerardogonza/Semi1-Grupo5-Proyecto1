from flask import Flask, render_template, request
from flask_lt import run_with_lt
import boto3
from boto3.dynamodb.conditions import Key, Attr
import encrypt

app = Flask(__name__)
run_with_lt(app)

dynamodb = boto3.resource('dynamodb',
                        aws_access_key_id='AKIAS73YTZZY6ENQATXM',
                        aws_secret_access_key='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',
                        region_name='us-east-1')

@app.route('/')
def hello():
    return 'Hello World'

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
        
        return 'User Registered'

@app.route('/login', methods=['GET'])
def login():
    if request.method == 'GET':   
        username = request.json['username']
        password = request.json['password']

        table = dynamodb.Table('users')
        response = table.query(
            KeyConditionExpression = Key('username').eq(username)
        )
        items = response['Items']
        name = items[0]['name']
        email= items[0]['email']
        encryptedpassword = items[0]['password']

        decryptedpassword = encrypt.decrypt(encryptedpassword)

        if str(password) == str(decryptedpassword):
            return 'Name: '+name+' Email: '+email + ' Password: '+decryptedpassword
        return 'User Doesnt Exist'

@app.route('/addfile', methods=['POST'])
def addfile():
    if request.method == 'POST':
        owner = request.json['owner']
        name = request.json['name']
        type= request.json['type']
        s3_path= 'ruta_prueba'

        table = dynamodb.Table('files')

        response = table.query(
            KeyConditionExpression = Key('owner').eq(owner)
        )

        id = len(response['Items'])+1

        table.put_item(
                Item = {
                    'owner': owner,
                    'id': id,
                    'name': name,
                    'type': type,
                    's3_path': s3_path
                }
        )
        
        return 'File Uploaded'

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
        
        return 'File Edited'

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
        
        return 'File Deleted'

if __name__ == '__main__':
    app.run()