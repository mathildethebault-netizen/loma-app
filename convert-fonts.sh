set -e

SRC="fonts-src"
DST="public/fonts"

mkdir -p "$DST"

echo "🔧 Conversion .ttf -> .woff (sans woff2)"
for f in "$SRC"/*.ttf "$SRC"/*.otf; do
  [ -e "$f" ] || continue
  base=$(basename "$f")
  name="${base%.*}"
  echo "  - $base"
  npx ttf2woff "$f" "$DST/$name.woff" > /dev/null
done

echo "✅ Fichiers générés dans $DST"