import json

import requests


class ConfigManagementClient:
    def __init__(self):
        self.config_manage_url = "http://35.197.153.3:9000"
        pass

    def get_remote_config(self, customer):
        res = requests.get("{}/config/{}".format(self.config_manage_url, customer))
        return res.json()

    def save(self, record):
        response = requests.post("{}/config/save".format(self.config_manage_url), json=json.dumps(record))
        if response.status_code == 200:
            return self.get_links(response.json())

    def get_links(self, record):
        servers = record["servers"]
        result = {}
        for server in servers:
            if server.get("name").startsWith("app"):
                result["business_system"] = "{}:8088".format(server.get("public_ip"))
                result["dashboard"] = "{}:3001".format(server.get("public_ip"))

            if server.get("name").startsWith("kafka"):
                result["kafka_broker"] = "{}:9092".format(server.get("public_ip"))

        return result
