from flask import Flask, render_template, request
import key_config as keys
import boto3

app = Flask(__name__)

dynamodb = boto3.resource('dynamodb',
                        aws_access_key_id=keys.ACCESS_KEY_ID,
                        aws_secret_access_key=keys.ACCESS_SECRET_KEY,
                        aws_session_token=keys.AWS_SESSION_TOKEN)

@app.route('/', methods=['GET', 'POST'])
def landing_page():
    error = none
    if request.method == 'POST':
        if valid_login(request.form['username'],
                        request.form['password']):
            return "<p>Hello, World!<p>"
    else:
        error = 'Invalid username/password'
    return 'enviar a metodo de error(error=error)'

def valid_login(user, password):
    # método para verificar que el usuario y constraseña sean los correctos
    table = dynamodb.Table('users')
    response = table.query(
        KeyConditionExpresion=Key('username').eq(user)
    )
    items = response['Items']
    name = items[0]['name']
    if password == items[0]['password']:
        return True
    return False

@app.route('/cargar_archivo', methods=['GET', 'POST'])
def load_file():
    if request.method == 'POST':
        f = request.files['url_file']
        f.save('/var/www/uploads/uploaded_file.txt')
