#!/bin/bash
check_last_error() {
    if [ "$1" != "0" ]; then
        echo $2
        popd
        exit 127
    fi
}

AWS_S3_REGION="us-east-1"
PRODUCTION_BRANCH="master"

NODE_ENV=''
CLOUDFRONT_DIST_ID=''
EB_APP="1job-env"

if [[ $CIRCLE_BRANCH == $PRODUCTION_BRANCH ]]; then
  NODE_ENV="production"
  CLOUDFRONT_DIST_ID=$CLOUDFRONT_DIST_ID_PRODUCTION
else
  echo "Not deploying"
  exit
fi

npm i && npm run build:front

S3_BUCKET="1job.io"
echo "Deploying to the $S3_BUCKET bucket"

aws s3 sync public/ "s3://$S3_BUCKET" --acl public-read --delete --exclude "uploads/*"

aws cloudfront create-invalidation \
  --distribution-id $CLOUDFRONT_DIST_ID \
  --paths /\*

mkdir -p ~/.aws
echo '[profile eb-cli]' > ~/.aws/config
echo "aws_access_key_id = $AWS_ACCESS_KEY_ID" >> ~/.aws/config
echo "aws_secret_access_key = $AWS_SECRET_ACCESS_KEY" >> ~/.aws/config
eb status
check_last_error $? "Something went wrong authenticating to elastic beanstalk"

EB_ENV="$EB_APP"
echo "Deploying to $EB_ENV"
eb deploy $EB_ENV -v
check_last_error $? "Something went wrong deploying to elastic beanstalk"

exit 0