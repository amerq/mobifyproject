#!/usr/bin/env bash
# Start test server on build folder

http-server --ssl --cors --p=8443 \
	--key dev-server/localhost.pem \
	--cert dev-server/localhost.pem \
	build
