#!/usr/bin/env bash

echo "Waiting for Chrome to finish installing"
baseline="59"
counter=0
while [ "$baseline" -gt "$(google-chrome --version | awk -F '.' '{print $1}' | awk '{print $3}')" ]; do 
    echo "still updating chrome..."
    if [ "$counter" -gt 10 ]; then
        cat logs/installChrome.log
        echo 'installing Chrome Failed.'
        exit 1
    else
        counter=$((counter+1))
        sleep 2
    fi
done
google-chrome --version
printf "Chrome installed\n"


if git rev-parse ; then
    # Get the current branch on CircleCI or local
    CURRENT_BRANCH=${CIRCLE_BRANCH:-$(git branch | grep "*" | awk '{ print $2 }')}
    if [ "$CURRENT_BRANCH" == "master" ]; then
        exit 0 
    else
        echo "Waiting for npm prod:build to complete"
        while [ ! -f build/loader.js ]; do
            if [[ "$counter" -gt 40 ]]; then
                cat logs/startTestServer.log
                echo 'Build Failed.'
                exit 1
            else
                counter=$((counter+1))
                sleep 2
            fi
        done 
        printf "npm prod:build is complete\n"  

        echo "Waiting for test server to become active"
        while ! nc -z localhost 8443; do 
        if [[ "$counter" -gt 50 ]]; then
                cat logs/startTestServer.log
                echo 'Starting Server Failed.'
                exit 1
            else
                counter=$((counter+1))
                sleep 2
            fi 
        done
        printf "8443 test server is now active\n"      
    fi
fi
