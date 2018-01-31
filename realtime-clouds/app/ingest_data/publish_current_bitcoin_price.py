import requests, datetime
from bs4 import BeautifulSoup
from google.cloud import pubsub_v1

def get_stock_price():
  url = 'https://sg.finance.yahoo.com/quote/BTC-USD/'
  page = requests.get(url)

  soup = BeautifulSoup(page.text, 'html.parser')

  current_stock_price_tag = soup.find(class_="Trsdu(0.3s) Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(b)")

  try:
    current_stock_price = current_stock_price_tag.text
    print('current_stock_price: {}'.format(current_stock_price))
    return current_stock_price
  except Error:
    raise Error('Bitcoin stock price not available')
  
def publish_messages(project, topic_name):
    """Publishes multiple messages to a Pub/Sub topic."""
    publisher = pubsub_v1.PublisherClient()
    topic_path = publisher.topic_path(project, topic_name)

    current_stock_price = get_stock_price()
    time_now = str(datetime.datetime.utcnow())
    
    data = u'bitcoin-price at {}: {}'.format(time_now, current_stock_price)
    # Data must be a bytestring
    data = data.encode('utf-8')
    publisher.publish(topic_path, data=data)

    print('Published message: {}'.format(data))

publish_messages('tw-data-engineering-demo', 'bitcoin-stock-price')
