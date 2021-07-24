cd CodeGenerator
python3 generator.py > ../public_html/data.js;
python3 colorgenerator.py > ../public_html/colors.css;
cd ..
cat ./public_html/data.js ./public_html/code.js > ./public_html/total.js;
browserify ./public_html/total.js -o ./public_html/bundle.js;
rm ./public_html/total.js