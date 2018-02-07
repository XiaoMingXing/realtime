import json

from flask import Flask
from flask_cors import CORS

from realtime.gcloud_pipeline_config import AutoRealtimeGCloud

app = Flask(__name__)
CORS(app)


@app.route('/config/<string:env>', methods=['GET'])
def get_config(env):
    res = AutoRealtimeGCloud("mongodb://localhost").get_config(env)
    return json.dumps(res)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=9999, debug=True)
