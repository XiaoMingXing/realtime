from flask import Flask
from gcloud.dataproc_client import DataprocClient
from gcloud.storage_client import StorageClient

app = Flask(__name__)


@app.route('/provision_cluster')
def provision_cluster():
    project = "tw-data-engineering-demo"
    region = "asia-southeast1"
    zone = "asia-southeast1-b"
    bucket_name = "realtime-bucket"
    cluster_name = "new-cluster"

    dataproc_client = DataprocClient({
        "project": project,
        "region": region,
        "zone": zone,
        "master_num": 1,
        "worker_num": 2,
        "filename": "processing.py"
    })

    dataproc_client.provision_and_submit(cluster_name, bucket_name)
    return "success"


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=9090, debug=True)
