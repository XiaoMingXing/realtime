import time

import googleapiclient.discovery


class Handlers:
    def __init__(self):
        pass

    def get_mongo_url(self, **args):
        return {"mongo_url": "mongodb://{}:27017/local".format(args["public_ip"])}

    def get_kafka_url(self, **args):
        return {
            "kafka_broker_url": "{}:9092".format(args["public_ip"]),
            "kafka_sink_topic": "sink-topic",
            "kafka_source_topic": "topic-test2"
        }

    def get_kafka_connector_url(self, **args):
        return {
            "kafka_rest_url": "http://{}:8082".format(args["public_ip"])
        }

    def get_app_service_url(self, **args):
        return {
            "app_service_url": "http://{}:8089".format(args["public_ip"])
        }


class ComputeClient:
    def __init__(self, options):
        self.project = options["project"]
        self.region = options["region"]
        self.zone = options["zone"]
        self.config = {}
        pass

    def get_client(self):
        return googleapiclient.discovery.build('compute', 'v1')

    def wait_for_operation(self, operation, instance_name):
        print('Waiting for {} to finish...'.format(instance_name))
        while True:
            result = self.get_client().zoneOperations().get(
                project=self.project,
                zone=self.zone,
                operation=operation).execute()

            if result['status'] == 'DONE':
                print("{} create done.".format(instance_name))
                if 'error' in result:
                    raise Exception(result['error'])
                return result
            time.sleep(1)

    def wait_for_operations(self, operation_instance):
        if operation_instance is None:
            return
        for operation in operation_instance.keys():
            self.wait_for_operation(operation, operation_instance.get(operation))

    def create_instance(self, config):
        try:
            self.get_instance(config.get("name"))
        except:
            res = self.get_client().instances().insert(
                project=self.project,
                zone=self.zone,
                body=config).execute()
            return {
                res["name"]: config["name"]
            }

    def provision_app_vm(self):
        instance_name = "app-instance"
        ami_name = "realtime-app-ami-v2"
        config = self.get_ami_instance_config(instance_name, ami_name)
        return self.create_instance(config)

    def provision_connector_vm(self):
        instance_name = "kafka-connector-instance"
        ami_name = "realtime-connectors-v2"
        config = self.get_ami_instance_config(instance_name, ami_name)
        return self.create_instance(config)

    def provision_mongo_vm(self):
        instance_name = "mongo-instance"
        container_name = "mongo"
        config = self.get_container_config(instance_name, container_name)
        return self.create_instance(config)

    def provision_kafka_vm(self):
        instance_name = "kafka-instance"
        ami_name = "realtime-kafka"
        config = self.get_ami_instance_config(instance_name, ami_name)
        return self.create_instance(config)

    def describe_instance_ip(self, res):
        return

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

    def get_ami_instance_config(self, instance_name, ami_name):
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
                "items": [self.get_ssh_key()]
            },

            "tags": {
                "items": [
                    "http-server"
                ]
            }
        }

    def list_instances(self):
        result = self.get_client().instances().list(project=self.project, zone=self.zone).execute()
        return result.get('items', None)

    def get_instance(self, instance_name):
        return self.get_client().instances().get(
            project=self.project,
            zone=self.zone,
            instance=instance_name).execute()

    def delete_instance(self, instance_name):
        print("[VM] deleting instance {}".format(instance_name))
        return self.get_client().instances().delete(
            project=self.project,
            zone=self.zone,
            instance=instance_name).execute()

    def delete_instances(self, instance_names):
        for instance_name in instance_names:
            self.delete_instance(instance_name)

    def provision_vms(self):
        operation_instance = self.provision_mongo_vm()
        operation_instance = merge_two_dicts(operation_instance, self.provision_kafka_vm())
        operation_instance = merge_two_dicts(operation_instance, self.provision_app_vm())
        operation_instance = merge_two_dicts(operation_instance, self.provision_connector_vm())
        self.wait_for_operations(operation_instance)
        return operation_instance

    def get_config_urls(self):
        request_json = {"project": self.project, "region": self.region, "zone": self.zone}
        _handlers = Handlers()
        _config = {
            "app-instance": _handlers.get_app_service_url,
            "mongo-instance": _handlers.get_mongo_url,
            "kafka-instance": _handlers.get_kafka_url,
            "kafka-connector-instance": _handlers.get_kafka_connector_url
        }
        instances = self.list_instances()
        instances = [instance for instance in instances if instance["status"] == "RUNNING"]
        if instances is None:
            return instances
        json = format_json(request_json, instances)
        return merge_two_dicts(json, format_url(_config, instances))

    def get_config_scripts(self):
        return {
            'app-instance': 'sudo -u root -H sh -c \"cd ~/projects/realtime/realtime-automation; ./start_app.sh\"',
            'kafka-connector-instance': 'sudo -u root -H sh -c \"cd ~/projects/realtime/realtime-automation; ./start_kafka_related.sh\"',
            'kafka-instance': 'nohup ~/kafka/bin/kafka-server-start.sh ~/kafka/config/server.properties > ~/kafka/kafka.log 2>&1 &'
        }

    def vms_exist(self):
        instances = self.list_instances()
        instances = [instance for instance in instances if instance["status"] == "RUNNING"]
        return len(instances) > 0


def format_json(request_json, items):
    if items is None or len(items) is 0:
        return
    servers = []
    for item in items:
        public_ip = item["networkInterfaces"][0]["accessConfigs"][0]["natIP"]
        private_ip = item["networkInterfaces"][0]["networkIP"]
        name = item["name"]
        server = {
            "public_ip": public_ip,
            "private_ip": private_ip,
            "name": name
        }
        servers.append(server)
    request_json["servers"] = servers
    return request_json


def merge_two_dicts(dict1, dict2):
    if dict1 is not None and dict2 is not None:
        res = dict1.copy()  # start with x's keys and values
        res.update(dict2)  # modifies res with y's keys and values & returns None
        return res


def format_url(handlers, items):
    if items is None or len(items) is 0:
        return
    res = {}
    for item in items:
        public_ip = item["networkInterfaces"][0]["accessConfigs"][0]["natIP"]
        private_ip = item["networkInterfaces"][0]["networkIP"]
        handler = handlers.get(item.get("name", ""), None)
        if not handler is None:
            config = handler(public_ip=public_ip, private_ip=private_ip)
            res = merge_two_dicts(res, config)
    return res


if __name__ == '__main__':
    project = "tw-data-engineering-demo"
    region = "asia-southeast1"
    zone = "asia-southeast1-b"
    request_json = {"project": project, "region": region, "zone": zone}

    compute_client = ComputeClient(request_json)
    # compute_client.provision_vms()

    handlers = Handlers()
    config = {
        "mongo-instance": handlers.get_mongo_url,
        "kafka-instance": handlers.get_kafka_url,
        "app-instance": handlers.get_app_service_url,
        "kafka-connector-instance": handlers.get_kafka_connector_url
    }

    res = format_url(config, compute_client.list_instances())
    print(res)
