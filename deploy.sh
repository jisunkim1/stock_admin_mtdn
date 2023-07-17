#!/bin/zsh

echo 'deploy www download'
ssh -i ~/.ssh/aws-front.pem ubuntu@3.38.186.137 ". ~/.nvm/nvm.sh && cd /srv/dropkitchen-front-www-download && bash ./run-deploy.sh"
