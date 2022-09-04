from flask import Flask, render_template, request
import boto3
from boto3.dynamodb.conditions import Key, Attr

app = Flask(__name__)

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
        username = request.form['username']
        name = request.form['name']
        password = request.form['password']
        email= request.form['email']
        url = request.form["url"] 

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
        username = request.form['username']
        password = request.form['password']

        table = dynamodb.Table('users')
        response = table.query(
            KeyConditionExpression = Key('username').eq(username)
        )
        items = response['Items']
        name = items[0]['name']
        email= items[0]['email']

        if password == items[0]['password']:
            return 'Name: '+name+' Email: '+email
        return 'User Doesnt Exist'

@app.route('/addfile', methods=['POST'])
def addfile():
    if request.method == 'POST':
        owner = request.form['owner']
        name = request.form['name']
        type= request.form['type']
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
        owner = request.form['owner']
        name = request.form['name']
        new_name = request.form['new_name']
        type= request.form['type']

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
        owner = request.form['owner']
        name = request.form['name']

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