#!/bin/bash

rm -r build/
mkdir build/

cp -R src/* build/

for i in `ls build/fm_javascript/*js`
do

 cat $i >> app.js
 rm $i

done

mv app.js build/fm_javascript/

java -jar yuicompressor-2.4.7.jar -o build/fm_javascript/app.js build/fm_javascript/app.js

for i in `ls build/fm_style/*css`
do
  cat $i >> app.css
  rm $i
done

mv app.css build/fm_style/

java -jar yuicompressor-2.4.7.jar -o build/fm_style/app.css build/fm_style/app.css
