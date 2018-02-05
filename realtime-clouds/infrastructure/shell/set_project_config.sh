#!/usr/bin/env bash

set -e

project_id="tw-data-engineering-demo"
# project_id="proud-guide-193323"

echo "setting gcloud cli core/project property to: ${project_id}"
gcloud config set project ${project_id}
