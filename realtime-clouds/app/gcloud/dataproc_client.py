

def get_client():
    """Builds a client to the dataproc API."""
    dataproc = googleapiclient.discovery.build('dataproc', 'v1')
    return dataproc
