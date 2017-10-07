TEMP_FOLDER=/tmp/guitar-ace-resources
S3_BUCKET_NAME=alexa-guitar-ace

# Deploy resources to S3
if [ $1 = "--skip-resources" ]; then
  echo "Skipping resouces"
else
  rm -rf $TEMP_FOLDER
  mkdir $TEMP_FOLDER

  for FILE in ./resources/*.mp3;
    do ffmpeg -y -i ${FILE} -ar 16000 -ab 48k -codec:a libmp3lame -ac 1 ${TEMP_FOLDER}/$(basename $FILE); done

  cp ./resources/*.png ${TEMP_FOLDER}

  aws s3api create-bucket --bucket ${S3_BUCKET_NAME} --region us-east-1
  aws s3 sync ${TEMP_FOLDER} s3://${S3_BUCKET_NAME}/ --acl public-read
fi

# Deploy Alexa Skill and Lamda function handler
ask deploy