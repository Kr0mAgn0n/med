#!/bin/bash

rm -r build/
mkdir build/

cp -R src/* build/

for i in `ls build/fm_javascript/*js`
do
  java -jar yuicompressor-2.4.7.jar -o $i $i
done

for i in `ls build/fm_style/*css`
do
  java -jar yuicompressor-2.4.7.jar -o $i $i
done