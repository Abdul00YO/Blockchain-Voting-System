from flask import Flask, request, jsonify, render_template
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# Database config - update with your credentials
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'oracle123',
    'database': 'blockchain'
}

def get_db_connection():
    try:
        conn = mysql.connector.connect(**db_config)
        return conn
    except Error as e:
        print("Error connecting to MySQL:", e)
        return None

# Serve the home page
@app.route('/')
def index():
    return render_template('index.html')

# ----- VOTES TABLE API -----
@app.route("/result")
def result_page():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="oracle123",
        database="blockchain"
    )
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM voters;")
    votes = cursor.fetchall()
    cursor.close()
    conn.close()
    
    return render_template("results.html", votes=votes)

@app.route('/about')
def about():
    return render_template('about.html')

@app.route("/api/vote", methods=["POST"])
def vote():
    data = request.get_json()
    name = data.get("name")
    age = data.get("age")
    vote = data.get("vote")

    if not name or not age or not vote:
        return jsonify({"error": "Missing fields"}), 400

    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO voters (name, age, vote) VALUES (%s, %s, %s)", (name, age, vote))
        conn.commit()
        return jsonify({"message": "Vote recorded successfully"}), 200
    except Exception as e:
        print("Error inserting vote:", e)
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()




# ----- TRANSACTIONS TABLE API -----




# Serve the results page
@app.route('/results')
def results():
    return render_template('results.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
