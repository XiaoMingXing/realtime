#!/usr/bin/env bash

set -e

project_id="tw-data-engineering-demo"

echo "setting gcloud cli core/project property to: ${project_id}"
gcloud config set project ${project_id}
