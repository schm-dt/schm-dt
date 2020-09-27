# S3/CloudFront Secure Static Website

Given an Route 53 Zone and domain name, creates an s3 bucket, certificate and cloudfront distribution for a static website.

```hcl
module "frontend" {
  providers = {
    aws = aws
  }

  domain_zone_id = data.aws_route53_zone.domain.id
  site_domain    = "domain.com"

  tags = {
    Environment = "production"
  }
}
```
