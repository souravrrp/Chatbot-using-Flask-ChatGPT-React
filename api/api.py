import datetime as dt
import time
from flask import Flask, request, jsonify
import json
import openai

def open_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as infile:
        return infile.read()

openai.api_key = open_file('openaiapikey.txt')
# openai.api_key = "YOUR_API_KEY"

app = Flask(__name__)

@app.route('/')
def chatbot_page():
    return open('templates/chatbot.html').read()

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.get_json()['message']
    response = chatbot_response(user_message)
    return jsonify({'response': response})


def chatbot_response(user_message):
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=user_message,
        max_tokens=1024,
        n = 1,
        temperature=0.5
    )
    return response['choices'][0]['text']

if __name__ == '__main__':
    app.run()

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get('text')
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"{user_input}",
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )
    return response["choices"][0]["text"]


@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/date', methods=['GET'])
def index():
    now = dt.datetime.now()
    return jsonify({'now': now})