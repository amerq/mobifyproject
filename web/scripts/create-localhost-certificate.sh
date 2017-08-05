#!/bin/bash
# Generate a key/cert for local development on `localhost` and `127.0.0.1`
MYPATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
DEFAULT_OUTPUT=$MYPATH/../dev-server/localhost.pem
OUTPUT=${1-$DEFAULT_OUTPUT}
COMMON_NAME='Mobify Local Development Server'

openssl req \
    -x509 \
    -nodes \
    -newkey rsa:2048 \
    -keyout $OUTPUT \
    -out $OUTPUT \
    -days 3650 \
    -sha256 \
    -config <(cat <<EOF
[ req ]
prompt = no
distinguished_name = subject
x509_extensions    = x509_ext

[ subject ]
commonName = $COMMON_NAME

[ x509_ext ]
subjectAltName = @alternate_names

[ alternate_names ]
DNS.1 = localhost
IP.1 = 127.0.0.1
EOF
)

SECONDARY_OUTPUT=$MYPATH/../dev-server/localhost.p7b

openssl crl2pkcs7 \
    -nocrl \
    -certfile $DEFAULT_OUTPUT \
    -out $SECONDARY_OUTPUT