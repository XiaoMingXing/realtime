import json

import requests


class ConfigManagementClient:
    def __init__(self):
        self.config_manage_url = "http://35.187.244.144:9000"
        pass

    def get_remote_config(self, customer):
        res = requests.get("{}/config/{}".format(self.config_manage_url, customer))
        return res.json()

    def save(self, record):
        response = requests.post("{}/config/save".format(self.config_manage_url), json=json.dumps(record))
        if response.status_code != 200:
            raise Exception("save configuration error", response)

    def get_customer_links(self, customer):
        record = self.get_remote_config(customer)
        return self.construct_links(record)

    def construct_links(self, record):
        if record is None:
            return
        servers = record["servers"]
        result = {}
        for server in servers:
            server_name = server.get("name")
            if server_name.startswith("app"):
                result["business_system"] = "http://{}:8088".format(server.get("public_ip"))
                result["dashboard"] = "http://{}:3001".format(server.get("public_ip"))

            if server_name.startswith("kafka") and not server_name.startswith("connector"):
                result["kafka_broker"] = "{}:9092".format(server.get("public_ip"))

        return result

    def delete_remote_config(self, customer_id):
        res = requests.delete("{}/config/{}".format(self.config_manage_url, customer_id))
        return res
