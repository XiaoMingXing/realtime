from .dataproc_client import DataprocClient


def setup_pipeline():
    # authentication setup
    # provision and setup VM
    # provision and setup Pub/Sub
    # provision and setup Storage
    # provision and setup Dataproc
    # check status of pipeline

    pass


if __name__ == '__main__':
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
    res = dataproc_client.provision_and_submit(cluster_name, bucket_name)
