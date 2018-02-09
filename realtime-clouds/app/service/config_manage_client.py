import requests


class ConfigManagementClient:
    def __init__(self):
        self.config_manage_url = "http://35.197.153.3:9000"
        pass

    def get_remote_config(self, customer):
        res = requests.get("{}/config/{}".format(self.config_manage_url, customer))
        return res.json()

    def save(self, record):
        response = requests.post("{}/config/save".format(self.config_manage_url), json=record)
        if response.status_code == 200:
            print(response.json())
