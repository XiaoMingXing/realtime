from flask import Flask

app = Flask(__name__)


@app.route('/provision_cluster')
def provision_cluster():
    return "success"


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=9090, debug=True)
