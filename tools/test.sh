#!/bin/bash

export PATH="./node_modules/.bin:$PATH"

mkdir -p coverage

tap && npm run lint -- -f tap -o coverage/.lint-output

code=$?

cat coverage/.tap-output | tap-parser -t -f | tap-xunit > coverage/tap-results.xml
cat coverage/.lint-output | tap-parser -t -f | tap-xunit > coverage/lint-results.xml

exit $code
