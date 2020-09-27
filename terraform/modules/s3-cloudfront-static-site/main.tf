terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 2.68"
    }
  }
}

resource "aws_s3_bucket_policy" "s3_frontend_bucket_policy" {
  bucket = aws_s3_bucket.app_frontend_bucket.id
  policy = data.aws_iam_policy_document.frontend_bucket_policy.json
}

data "aws_iam_policy_document" "frontend_bucket_policy" {
  statement {
    actions = [
      "s3:GetObject",
    ]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = [
      aws_s3_bucket.app_frontend_bucket.arn,
      "${aws_s3_bucket.app_frontend_bucket.arn}/*",
    ]
  }
}

resource "aws_acm_certificate" "cert" {
  provider          = aws
  domain_name       = var.site_domain
  validation_method = "DNS"

  subject_alternative_names = ["*.${var.site_domain}"]

  lifecycle {
    create_before_destroy = true
  }

  tags = var.tags
}

resource "aws_route53_record" "cert_validation" {
  name            = aws_acm_certificate.cert.domain_validation_options.0.resource_record_name
  type            = aws_acm_certificate.cert.domain_validation_options.0.resource_record_type
  zone_id         = var.domain_zone_id
  records         = [aws_acm_certificate.cert.domain_validation_options.0.resource_record_value]
  allow_overwrite = true
  ttl             = 60
  depends_on      = [aws_acm_certificate.cert]
}

resource "aws_acm_certificate_validation" "cert" {
  provider                = aws
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
}

resource "aws_route53_record" "www_user_frontend" {
  zone_id = var.domain_zone_id
  name    = var.site_domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.app_frontend_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.app_frontend_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_s3_bucket" "app_frontend_bucket" {
  bucket = var.site_domain
  acl    = "public-read"

  versioning {
    enabled = true
  }

  tags = var.tags
}

resource "aws_cloudfront_distribution" "app_frontend_distribution" {
  origin {
    domain_name = aws_s3_bucket.app_frontend_bucket.bucket_regional_domain_name
    origin_id   = "S3-${var.site_domain}"
  }

  aliases = [var.site_domain]

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["HEAD", "GET"]
    target_origin_id       = "S3-${var.site_domain}"
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      cookies {
        forward = "all"
      }

      query_string = true
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.cert.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }

  tags = var.tags
}
