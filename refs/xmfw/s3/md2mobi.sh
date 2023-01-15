echo $1
pandoc $1 --toc --number-section --lua-filter ~/git-repos/hdv/bin/count-para.lua  -o $1.epub
/Applications/calibre.app/Contents/MacOS/ebook-convert $1.epub $1.mobi