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

    def create_instance(self, config):
        # Configure the machine
        res = self.get_client().instances().insert(
            project=self.project,
            zone=self.zone,
            body=config).execute()
        return self.wait_for_operation(res["name"])

    def provision_app_vm(self):
        instance_name = "app-insatnce"
        ami_name = "realtime-app-ami-v2"
        startup_script = open(
            os.path.join(
                os.path.dirname(__file__), 'startup-script.sh'), 'r').read()
        config = self.get_ami_instance_config(instance_name, ami_name, startup_script)
        res = self.create_instance(config)
        print(res)

    def provision_connector_vm(self):
        instance_name = "kafka-connector-instance"
        ami_name = "realtime-connectors"
        startup_script = 'sudo -u mxxiao -H sh -c "cd ~/projects/realtime/realtime-automation; git pull; ./start_kafka_related.sh"'
        config = self.get_ami_instance_config(instance_name, ami_name, startup_script)
        res = self.create_instance(config)
        print(res)

    def provision_mongo_vm(self):
        instance_name = "mongo-instance"
        container_name = "mongo"
        config = self.get_container_config(instance_name, container_name)
        res = self.create_instance(config)
        print(res)

    def provision_kafka_vm(self):
        instance_name = "kafka-instance"
        container_name = "spotify/kafka"
        config = self.get_container_config(instance_name, container_name)
        res = self.create_instance(config)
        print(res)

    def get_machine_type(self):
        return "projects/{}/zones/{}/machineTypes/n1-standard-1".format(self.project, self.zone)

    @staticmethod
    def get_service_accounts():
        return [
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
        ]

    def get_networks_interfaces(self):
        return [
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
        ]

    @staticmethod
    def get_ssh_key():
        return {
            "key": "ssh-keys",
            "value": "mxxiao:ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDz+9Ji9MoHB41ZE3aCx+7aRZ8a6EFm3DqYV4QNKnkEXjixL6UoDQTY0WnNC9giFqJvGhoyFYF9Jr3P6IsCleaM8cbkMC4hVqxFqqmp4UM+TyhCVhLgdCzk9Lk9vbhHDXCYGbZJJqr2/MWP+qI6lRVu6Tp8iHbRYyQKKziWehpbNyDGILKpOSk3JM/OJZE6B7O0T/raT7zqjqUgEj8N7WUWFsaKJqUxtsPWfsD+3XHHvoBG3eEQCGhy3eBmafHVurMTEHZL4oxRqZyWnKo7TWmhuxqK7LVkPUVWbujqe9SXSR5lTQwRrX5/PTETRN7Hej0m3upbAvvtw2hUgjsJznBz mxxiao@CNmxxiao.local"
        }

    def get_container_disk(self, instance_name):
        return [
            {
                "type": "PERSISTENT",
                "boot": True,
                "mode": "READ_WRITE",
                "autoDelete": True,
                "deviceName": instance_name,
                "initializeParams": {
                    "sourceImage": "projects/cos-cloud/global/images/cos-stable-64-10176-62-0",
                    "diskType": "projects/{}/zones/{}/diskTypes/pd-standard".format(self.project, self.zone),
                    "diskSizeGb": "10"
                }
            }
        ]

    def get_container_config(self, instance_name, container_name):
        return {
            "name": instance_name,
            "machineType": self.get_machine_type(),
            "metadata": {
                "items": [
                    {
                        "key": "gce-container-declaration",
                        "value": "spec:\n  containers:\n    - name: mongo\n      image: {}\n      securityContext:\n        privileged: true\n      stdin: false\n      tty: false\n  restartPolicy: Always\n".format(
                            container_name)
                    }
                ]
            },
            "disks": self.get_container_disk(instance_name),
            "networkInterfaces": self.get_networks_interfaces(),
            "labels": {
                "container-vm": "cos-stable-64-10176-62-0"
            },
            "serviceAccounts": self.get_service_accounts()
        }

    def get_ami_instance_config(self, instance_name, ami_name, startup_script):
        return {
            'name': instance_name,

            'machineType': self.get_machine_type(),

            # Specify the boot disk and the image to use as a source.
            'disks': [
                {
                    'boot': True,
                    'autoDelete': True,
                    "deviceName": instance_name,
                    'initializeParams': {
                        "sourceImage": ("projects/{}/global/images/{}".format(self.project, ami_name)),
                        "diskType": "projects/{}/zones/{}/diskTypes/pd-standard".format(self.project, self.zone),
                        "diskSizeGb": "10"
                    }
                }
            ],

            # Specify a network interface with NAT to access the public
            # internet.
            "networkInterfaces": self.get_networks_interfaces(),

            # Allow the instance to access cloud storage and logging.
            "serviceAccounts": self.get_service_accounts(),

            # Metadata is readable from the instance and allows you to
            # pass configuration from deployment scripts to instances.
            "metadata": {
                "items": [{
                    # Startup script is automatically executed by the
                    # instance upon startup.
                    'key': 'startup-script',
                    'value': startup_script
                }, self.get_ssh_key()]
            },

            "tags": {
                "items": [
                    "http-server"
                ]
            }
        }

    def list_instances(self):
        result = self.get_client().instances().list(project=project, zone=zone).execute()
        return result['items']


if __name__ == '__main__':
    project = "tw-data-engineering-demo"
    region = "asia-southeast1"
    zone = "asia-southeast1-b"
    compute_client = ComputeClient({
        "project": project,
        "region": region,
        "zone": zone
    })
    items = compute_client.list_instances()
    #items[0]["networkInterfaces"][0]["accessConfigs"][0]["natIP"]
    print(items)
