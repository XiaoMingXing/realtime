# Configure the Google Cloud provider
provider "google" {
  credentials = "${file("../secrets/gcp_credentials.json")}"
  project     = "tw-data-engineering-demo"
  region      = "asia-southeast1"
}

# Add team members to project
resource "google_project_iam_policy" "tw-data-engineering-demo" {
  project     = "tw-data-engineering-demo"
  policy_data = "${data.google_iam_policy.admin.policy_data}"
}

data "google_iam_policy" "admin" {
  binding {
    role = "roles/editor"

    members = [
      "user:mxxiao@thoughtworks.com"
    ]
  }
}

