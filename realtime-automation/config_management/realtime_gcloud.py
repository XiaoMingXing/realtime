import pymongo


class AutoRealtimeGCloud:
    def __init__(self, url):
        connection = pymongo.MongoClient(url)
        db = connection["local"]
        self.collection = db["config"]

    def find_records(self, customer):
        return self.collection.find({"_id": customer})


if __name__ == '__main__':
    auto_client = AutoRealtimeGCloud("mongodb://localhost")
    record = auto_client.find_records("customer1")
    print(record[0]["servers"])
