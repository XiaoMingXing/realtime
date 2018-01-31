#!/usr/bin/env bash

set -e 

if [[ $1 == '' ]]; then
  echo "ERROR: Usage ./create_topic.sh <topic_name>"
  exit 1
fi

gcloud pubsub topics create $1