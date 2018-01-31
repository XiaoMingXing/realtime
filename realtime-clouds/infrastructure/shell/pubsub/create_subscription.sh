#!/usr/bin/env bash

set -e 

if [[ $1 == '' ]]; then
  echo "ERROR: Usage ./create_subscription.sh <subscription_name> <topic_name> "
  exit 1
fi


gcloud pubsub subscriptions create $1 --topic $2