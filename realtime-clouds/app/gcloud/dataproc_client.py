import googleapiclient.discovery
import time


class DataprocClient:
    def __init__(self, options):
        self.project = options.get("project", "tw-data-engineering-demo")
        self.region = options.get("region", "asia-southeast1")
        self.zone = options.get("zone", "asia-southeast1-b")
        self.master_num = options.get("master_num", 1)
        self.worker_num = options.get("worker_num", 2)
        self.filename = options.get("filename", "processing.py")

    def get_client(self):
        """Builds a client to the dataproc API."""
        dataproc = googleapiclient.discovery.build('dataproc', 'v1')
        return dataproc

    def list_clusters(self):
        result = self.get_client().projects().regions().clusters().list(
            projectId=self.project,
            region=self.region).execute()
        return result

    def create_cluster(self, cluster_name):
        print('Creating cluster...')
        cluster_data = {
            'projectId': self.project,
            'clusterName': cluster_name,
            "config": {
                "configBucket": "",
                "gceClusterConfig": {
                    "subnetworkUri": "default",
                    "zoneUri": self.zone
                },
                "masterConfig": {
                    "numInstances": self.master_num,
                    "machineTypeUri": "n1-standard-2",
                    "diskConfig": {
                        "bootDiskSizeGb": 500,
                        "numLocalSsds": 0
                    }
                },
                "workerConfig": {
                    "numInstances": self.worker_num,
                    "machineTypeUri": "n1-standard-1",
                    "diskConfig": {
                        "bootDiskSizeGb": 500,
                        "numLocalSsds": 0
                    }
                }
            }
        }
        result = self.get_client().projects().regions().clusters().create(
            projectId=self.project,
            region=self.region,
            body=cluster_data).execute()
        return result

    def submit_pyspark_job(self, cluster_name, bucket_name):
        """Submits the Pyspark job to the cluster, assuming `filename` has
        already been uploaded to `bucket_name`"""
        job_details = {
            'projectId': self.project,
            "job": {
                "placement": {
                    "clusterName": cluster_name
                },
                "pysparkJob": {
                    "mainPythonFileUri": "gs://{}/{}".format(bucket_name, self.filename),
                    "jarFileUris": [
                        "gs://realtime-bucket/mongo-spark-connector_2.11-2.2.1.jar",
                        "gs://realtime-bucket/mongo-java-driver-3.6.1.jar",
                        "gs://realtime-bucket/bson-3.6.1.jar"
                    ]
                }
            }
        }
        result = self.get_client().projects().regions().jobs().submit(
            projectId=self.project,
            region=self.region,
            body=job_details).execute()
        return result

    def delete_cluster(self, cluster_name):
        print('Tearing down cluster')
        result = self.get_client().projects().regions().clusters().delete(
            projectId=self.project,
            region=self.region,
            clusterName=cluster_name).execute()
        return result

    def provision_and_submit(self, cluster_name, bucket_name):
        res = self.list_clusters()
        cluster_exist = False
        for name in res:
            clusters = res[name]
            existing_cluster_name = clusters[0]["clusterName"]
            if existing_cluster_name == cluster_name:
                cluster_exist = True
                break
        if not cluster_exist:
            res = self.create_cluster(cluster_name=cluster_name)
            self.wait_for_operation_version_2(res["name"])

        res = self.submit_pyspark_job(cluster_name, bucket_name)
        print("Job id:  ", res)

    def wait_for_operation(self, operation):
        print('Waiting for operation to finish...')
        while True:
            operations = self.get_client().projects().regions().operations()
            result = operations.get(
                name=operation).execute()

            if result.get("metadata").get('status').get('state') == 'RUNNING':
                print("done.")
                if 'error' in result:
                    raise Exception(result['error'])
                return result
            time.sleep(1)

    def wait_for_operation_version_2(self, operation):
        dataproc = googleapiclient.discovery.build('dataproc', 'v1')

        print('Waiting for operation to finish...')
        while True:
            result = dataproc.zoneOperations().get(
                project=self.project,
                zone=self.zone,
                operation=operation).execute()

            if result['status'] == 'DONE':
                print("done.")
                if 'error' in result:
                    raise Exception(result['error'])
                return result
            time.sleep(1)
