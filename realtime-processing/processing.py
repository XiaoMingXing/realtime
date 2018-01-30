from pyspark.sql import SparkSession
from pyspark.sql.types import StructType, StructField, DateType, DoubleType, LongType


def process():
    spark = SparkSession.builder \
        .appName("realtime processing") \
        .config("spark.jars.packages",
                "org.mongodb:mongo-java-driver:3.6.1,org.mongodb:bson:3.6.1,org.mongodb.spark:mongo-spark-connector_2.11:2.2.1") \
        .config("spark.mongodb.output.uri", "mongodb://35.187.230.101") \
        .config("spark.mongodb.output.database", "realtime") \
        .config("spark.mongodb.output.collection", "processing") \
        .getOrCreate()
    # .config("spark.jars","jars/gcs-connector-latest-hadoop2.jar") \
    spark._jsc.hadoopConfiguration().set('google.cloud.auth.service.account.enable', 'true')
    # spark._jsc.hadoopConfiguration().set('google.cloud.auth.service.account.json.keyfile',
    #                                      'credentials/tw-data-engineering-demo-3cdf33282c45.json')
    spark._jsc.hadoopConfiguration().set('fs.gs.impl', 'com.google.cloud.hadoop.fs.gcs.GoogleHadoopFileSystem')
    spark._jsc.hadoopConfiguration().set('fs.AbstractFileSystem.gs.impl',
                                         'com.google.cloud.hadoop.fs.gcs.GoogleHadoopFileSystem')
    spark._jsc.hadoopConfiguration().set('fs.gs.project.id', 'tw-data-engineering-demo')
    spark._jsc.hadoopConfiguration().set('fs.gs.working.dir', '/')

    schema = StructType([
        StructField("Date", DateType()),
        StructField("Open", DoubleType()),
        StructField("High", DoubleType()),
        StructField("Low", DoubleType()),
        StructField("Close", DoubleType()),
        StructField("Adj Close", DoubleType()),
        StructField("Volume", LongType()),
    ])

    df = spark.read.option("header", "true") \
        .option("inferSchema", "true") \
        .csv("gs://demo-stock-prices/BTC-USD_2013-01-28_2018-01-28.csv", schema=schema)

    df.select("Date", "Volume").write.format("com.mongodb.spark.sql.DefaultSource").mode("append").save()


if __name__ == '__main__':
    process()
