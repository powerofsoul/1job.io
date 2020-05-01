#!/bin/bash

AWS_S3_REGION="us-east-1"
PRODUCTION_BRANCH="master"

NODE_ENV=''
CLOUDFRONT_DIST_ID=''

if [[ $CIRCLE_BRANCH == $PRODUCTION_BRANCH ]]; then
  NODE_ENV="production"
  CLOUDFRONT_DIST_ID=$CLOUDFRONT_DIST_ID_PRODUCTION
  npm run build:prod
else
  echo "Not deploying"
  exit
fi

S3_BUCKET="jobs-remotely-$NODE_ENV"
echo "Deploying to the $S3_BUCKET bucket"

aws s3 sync public/ "s3://$S3_BUCKET" --acl public-read --delete

aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DIST_ID \
  --paths /*