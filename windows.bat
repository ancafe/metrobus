@echo off
cd public_html
del dataRelative.js
del colors.css
del total.js
del bundle.js
cd ..
cd CodeGenerator
python generator.py > ../public_html/dataRelative.js
python colorgenerator.py > ../public_html/colors.css
cd ..
type public_html\dataRelative.js >> public_html\total.js
type public_html\code.js >> public_html\total.js
browserify public_html\total.js -o public_html\bundle.js
del public_html\total.js