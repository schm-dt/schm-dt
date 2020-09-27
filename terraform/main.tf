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
  region     = "us-east-1"
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY
  version    = "2.68"
}

data "aws_route53_zone" "domain" {
  name = var.domain_zone_name
}

module "frontend" {
  source = "./modules/s3-cloudfront-static-site"

  providers = {
    aws = aws
  }

  domain_zone_id = data.aws_route53_zone.domain.id
  site_domain    = var.site_domain

  tags = {
    Environment = var.env
  }
}
