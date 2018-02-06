import pymongo


class AutoRealtimeGCloud:
    def __init__(self, url):
        connection = pymongo.MongoClient(url)
        db = connection["local"]
        self.collection = db["config"]

    def find_records(self, customer):
        return self.collection.find({"_id": customer})

    def get_config(self, env):
        record = self.find_records("customer1")
        return record[0]


if __name__ == '__main__':
    config = AutoRealtimeGCloud("mongodb://localhost").get_config("local")
    print(config)
