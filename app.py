import google.generativeai as genai 
import os 
from flask_cors import CORS 
from flask import Flask, request, jsonify 
from dotenv import load_dotenv

load_dotenv('.env.local')

app = Flask(__name__)
CORS(app)

api_key = os.getenv('NEXT_PUBLIC_GEMINI_API_KEY')

genai.configure(api_key=api_key)

model = genai.GenerativeModel("models/gemini-1.5-flash")

@app.route("/count-tokens", methods=['POST'])
def count_tokens():
    data = request.get_json()
    prompt = data.get("prompt", "")

    if not prompt: 
        return jsonify({ "error": "Prompt is missing" }), 400
    
    try:
        response = genai.count_tokens([prompt])
        token_count = response['token_count']
        return jsonify({ "token_count": token_count })
    except Exception as e:
        return jsonify({ "error", str(e) }), 500
    
if __name__ == "__main__":
    app.run(debug=True)