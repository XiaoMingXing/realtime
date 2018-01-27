# ThoughtWorks Data Engineering Demo

### App

#####

### Infrastructure

#### Terraform

- create credentials [here](https://console.cloud.google.com/apis/credentials?project=tw-data-engineering-demo&organizationId=730381449093) -> select 'Service Account Key' -> enter details, select JSON and download it to `./infrastructure/secrets/gcp_credentials.json`
- Enable Google Cloud Resource Manager API by visiting: https://console.developers.google.com/apis/api/cloudresourcemanager.googleapis.com/overview?project=tw-data-engineering-demo
- Run `cd infrastructure/terraform && terraform apply`

#### Shell 

`cd infrastructure/shell` before running the shell scripts

- To delete Dataproc cluster: `./delete_dataproc_cluster.sh <name of cluster>`
- To create Dataproc cluster: `./create_dataproc_cluster.sh <name of cluster>`
- To open Datalab notebook on the cluster: `./open_data_lab.sh`
