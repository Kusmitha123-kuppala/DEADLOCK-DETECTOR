from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from detector import detect_deadlock

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        allocation = data.get("allocation")
        request_matrix = data.get("request")

        if allocation is None or request_matrix is None:
            return jsonify({"error": "Missing allocation or request matrix"}), 400

        result = detect_deadlock(allocation, request_matrix)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)