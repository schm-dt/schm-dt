variable "domain_zone_id" {
  description = "The domain zone to register DNS records in."
  type        = string
}

variable "site_domain" {
  description = "The domain name for the website."
  type        = string
}

variable "tags" {
  description = "Tags to assign to resources"
  type        = map(any)
}
