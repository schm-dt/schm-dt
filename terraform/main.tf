terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "schm-dt"

    workspaces {
      name = "schm-dt"
    }
  }
}

provider "aws" {
  region     = "ap-southeast-2"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  version    = "2.68"
}

provider "aws" {
  alias      = "east"
  region     = "us-east-1"
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
  version    = "2.68"
}

