#!/bin/bash
# run with `. activate.sh`
PWD=`pwd`

run () {
    celery -A setup worker --loglevel=info
}

run
