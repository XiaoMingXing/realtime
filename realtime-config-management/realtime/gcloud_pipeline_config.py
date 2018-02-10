import pymongo


class AutoRealtimeGCloud:
    def __init__(self, url):
        connection = pymongo.MongoClient(url)
        db = connection["local"]
        self.collection = db["config"]

    def find_records(self, customer):
        return self.collection.find({"_id": customer})

    def get_config(self, customer_id):
        record = self.collection.find_one({"_id": customer_id})
        return record

    def delete_config(self, customer_id):
        res = self.collection.delete_one({"_id": customer_id})
        return res


if __name__ == '__main__':
    config = AutoRealtimeGCloud("mongodb://localhost").get_config("local")
    print(config)
