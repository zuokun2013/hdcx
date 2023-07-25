echo "convert all .md files to .epub format under current folder"
echo $PWD
BASEDIR=$(dirname "$0")

for d in `ls *.md`; do
 echo $d
 #pandoc $(PWD)/$d --toc --number-section --lua-filter $BASEDIR/count-para.lua --reference-doc=$(dirname $0)/template.docx -t docx -o $(PWD)/$d.docx
 pandoc $(PWD)/$d --lua-filter $BASEDIR/count-para.lua --reference-doc=$(dirname $0)/template.docx -t docx -o $(PWD)/$d.docx
done


# /Applications/calibre.app/Contents/MacOS/ebook-convert $1.epub $1.mobi%  