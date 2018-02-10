import json

from flask import Flask, request
from flask_cors import CORS

from client.mongo_client import MongoClient
from realtime.gcloud_pipeline_config import AutoRealtimeGCloud

app = Flask(__name__)
CORS(app)

mongo_url = "mongodb://35.187.230.101:27017"


@app.route('/config/<string:env>', methods=['GET'])
def get_config(env):
    return AutoRealtimeGCloud("%s" % mongo_url).get_config(env)


@app.route('/config/save', methods=['POST'])
def save_config():
    req_data = json.loads(request.get_json())
    mongo_client = MongoClient(mongo_url)
    if req_data is not None:
        return mongo_client.save_record(req_data)
    return "request error"


@app.route('/config/test', methods=['GET'])
def test():
    return "test success"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000, debug=True)
