output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.app_frontend_distribution.id
}

output "cloudfront_distribution_arn" {
  value = aws_cloudfront_distribution.app_frontend_distribution.arn
}

output "bucket_id" {
  value = aws_s3_bucket.app_frontend_bucket.id
}

output "bucket_arn" {
  value = aws_s3_bucket.app_frontend_bucket.arn
}
