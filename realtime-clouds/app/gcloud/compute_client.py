import os
import time

import googleapiclient.discovery


class ComputeClient:
    def __init__(self, options):
        self.project = options["project"]
        self.region = options["region"]
        self.zone = options["zone"]
        pass

    def get_client(self):
        return googleapiclient.discovery.build('compute', 'v1')

    def wait_for_operation(self, operation):
        print('Waiting for operation to finish...')
        while True:
            result = self.get_client().zoneOperations().get(
                project=self.project,
                zone=self.zone,
                operation=operation).execute()

            if result['status'] == 'DONE':
                print("done.")
                if 'error' in result:
                    raise Exception(result['error'])
                return result
            time.sleep(1)

    def create_instance(self, instance_name, ami_name):
        compute = self.get_client()
        # Configure the machine
        machine_type = "projects/{}/zones/{}/machineTypes/n1-standard-1".format(self.project, self.zone)

        startup_script = open(
            os.path.join(
                os.path.dirname(__file__), 'startup-script.sh'), 'r').read()
        config = {
            'name': instance_name,

            'machineType': machine_type,

            # Specify the boot disk and the image to use as a source.
            'disks': [
                {
                    'boot': True,
                    'autoDelete': True,
                    "deviceName": "instance-app",
                    'initializeParams': {
                        "sourceImage": ("projects/{}/global/images/{}".format(self.project, ami_name)),
                        "diskType": "projects/{}/zones/{}/diskTypes/pd-standard".format(self.project, self.zone),
                        "diskSizeGb": "10"
                    }
                }
            ],

            # Specify a network interface with NAT to access the public
            # internet.
            "networkInterfaces": [
                {
                    "subnetwork": "projects/{}/regions/{}/subnetworks/default".format(self.project, self.region),
                    "accessConfigs": [
                        {
                            "name": "External NAT",
                            "type": "ONE_TO_ONE_NAT"
                        }
                    ],
                    "aliasIpRanges": []
                }
            ],

            # Allow the instance to access cloud storage and logging.
            "serviceAccounts": [
                {
                    "email": "default",
                    "scopes": [
                        "https://www.googleapis.com/auth/devstorage.read_only",
                        "https://www.googleapis.com/auth/logging.write",
                        "https://www.googleapis.com/auth/monitoring.write",
                        "https://www.googleapis.com/auth/servicecontrol",
                        "https://www.googleapis.com/auth/service.management.readonly",
                        "https://www.googleapis.com/auth/trace.append"
                    ]
                }
            ],

            # Metadata is readable from the instance and allows you to
            # pass configuration from deployment scripts to instances.
            'metadata': {
                'items': [{
                    'key': 'startup-script',
                    'value': ''.join(['#!/bin/bash\n',
                                      'cd /home/mxxiao/projects/realtime/realtime-automation\n',
                                      'git pull',
                                      './start_app.sh\n'])
                }]
            },

            "tags": {
                "items": [
                    "http-server"
                ]
            }
        }

        return compute.instances().insert(
            project=self.project,
            zone=self.zone,
            body=config).execute()

    def provision_vm(self, instance_name, ami_name):
        res = self.create_instance(instance_name=instance_name, ami_name=ami_name)
        self.wait_for_operation(res["name"])


if __name__ == '__main__':
    project = "tw-data-engineering-demo"
    region = "asia-southeast1"
    zone = "asia-southeast1-b"
    ami_name = "realtime-app-ami"
    compute_client = ComputeClient({
        "project": project,
        "region": region,
        "zone": zone
    })
    compute_client.provision_vm("instance-app", ami_name)
