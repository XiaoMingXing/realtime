# Create dataproc cluster
# Note: Terraform gives an "Resource not supported" error for this
resource "google_dataproc_cluster" "simplecluster" {
  name   = "simplecluster"
  region = "asia-southeast1"

  cluster_config {
    worker_config {
      num_instances = 5
      machine_type  = "n1-standard-1"

      disk_config {
        boot_disk_size_gb = 10
        num_local_ssds    = 1
      }
    }

    initialization_action {
      script = "gs://dataproc-initialization-actions/datalab/datalab.sh"
    }
  }
}

