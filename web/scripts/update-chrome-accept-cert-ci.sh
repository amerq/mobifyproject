# This script has two steps:
# 1) Install the latest stable version of Chrome: https://circleci.com/docs/build-image-trusty/#google-chrome
# 2) Add a self-signed SSL Certificate to allow working with Mobify Preview

# The installation steps are grouped together to prevent two instances of apt-get running at the same time

# Install the latest stable version of Chrome.
# https://circleci.com/docs/build-image-trusty/#google-chrome

echo 'Install Chrome'
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
sudo apt-get update
sudo apt-get --fix-broken --only-upgrade install google-chrome-stable
google-chrome --version

echo 'Accept Cert'
sudo apt-get install libnss3-tools
 # Initialize database of certificates
mkdir -p $HOME/.pki/nssdb
# Pass in a password
certutil -d $HOME/.pki/nssdb -N --empty-password
# Add self-signed SSL certificate
certutil -d sql:$HOME/.pki/nssdb -A -t "P,," -n dev-server/localhost.pem -i dev-server/localhost.pem