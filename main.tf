/*
 * For the frontend, terraform does not actually deploy the site or the content.
 * Its primary purpose is creating (or updating) an s3 bucket with a role, updating it,
 * and telling s3 that this is meant to be a website, and defining an entry point (index.html)
 */

provider "aws" {
  region = "us-east-1"
}

variable "bucket_name" {
  // Named this initially because I intended to get a properly hosted https domain,
  // but issues with SSL certification were eating up too much time
  default = "www.josephs3d.com"
}

resource "aws_s3_bucket" "www" {
  bucket = "${var.bucket_name}"
  // define policy
  policy = <<POLICY
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"AddPerm",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::${var.bucket_name}/*"]
    }
  ]
}
POLICY

  // Tell S3 that this is a website
  website {
    // Tell S3 the entry point for the website
    index_document = "index.html"
  }
}