import pymongo


class MongoClient:
    def __init__(self, url):
        connection = pymongo.MongoClient(url)
        db = connection["local"]
        self.collection = db["config"]

    def save_records(self, records):
        for record in records:
            self.save_record(record)

    def save_record(self, record):
        self.collection.update({'_id': record['_id']}, record, True)


if __name__ == '__main__':
    mongo_client = MongoClient("mongodb://localhost")

    record = {
        "_id": "2",
        "client_id": "customer",
        "envs": [
            {
                "ip": "192.0.0.1",
                "name": "kafka"
            },
            {
                "ip": "192.0.0.2",
                "name": "mongo"
            }
        ]
    }
    mongo_client.save_record(record=record)
