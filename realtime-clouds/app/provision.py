import json

from flask import Flask, request
from flask_cors import CORS
from gcloud.dataproc_client import DataprocClient
from gcloud.storage_client import StorageClient

app = Flask(__name__)
CORS(app)


@app.route('/provision_cluster', methods=['POST'])
def provision_cluster():
    req_data = request.get_json()
    dataproc_client = DataprocClient(req_data)
    res = dataproc_client.provision_and_submit(req_data["cluster_name"], req_data["bucket_name"])
    return json.dumps(res)


@app.route('/delete_cluster', methods=['POST'])
def delete_cluster():
    req_data = request.get_json()
    dataproc_client = DataprocClient(req_data)
    res = dataproc_client.delete_cluster(req_data["cluster_name"])
    return json.dumps(res)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=9090, debug=True)
