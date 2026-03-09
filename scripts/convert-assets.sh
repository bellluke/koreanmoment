#!/bin/bash
# Convert poem assets from source data to web-ready formats
# PNG → WebP (images), WAV → MP3 (audio)

SOURCE_DIR="/Users/zag/work/projects/toys/video-koreanmoment/data/poems"
TARGET_DIR="/Users/zag/work/projects/toys/koreanmoment/public/poems"

echo "=== Korean Moment Asset Conversion ==="
echo "Source: $SOURCE_DIR"
echo "Target: $TARGET_DIR"
echo ""

for poem_dir in "$SOURCE_DIR"/*/; do
  id=$(basename "$poem_dir")
  echo "--- Processing poem $id ---"

  # Create target directories
  mkdir -p "$TARGET_DIR/$id/images"
  mkdir -p "$TARGET_DIR/$id/audio"

  # Convert images PNG → WebP
  if [ -d "$poem_dir/images" ]; then
    for img in "$poem_dir"/images/*.png; do
      [ -f "$img" ] || continue
      filename=$(basename "${img%.png}.webp")
      target="$TARGET_DIR/$id/images/$filename"
      if [ ! -f "$target" ]; then
        cwebp -q 85 "$img" -o "$target" 2>/dev/null
        echo "  Image: $filename"
      else
        echo "  Skip (exists): $filename"
      fi
    done
  fi

  # Convert thumbnail PNG → WebP
  if [ -f "$poem_dir/thumbnail.png" ]; then
    target="$TARGET_DIR/$id/thumbnail.webp"
    if [ ! -f "$target" ]; then
      cwebp -q 85 "$poem_dir/thumbnail.png" -o "$target" 2>/dev/null
      echo "  Thumbnail: thumbnail.webp"
    else
      echo "  Skip (exists): thumbnail.webp"
    fi
  fi

  # Convert audio WAV → MP3
  if [ -f "$poem_dir/audio/mixed.wav" ]; then
    target="$TARGET_DIR/$id/audio/mixed.mp3"
    if [ ! -f "$target" ]; then
      ffmpeg -y -i "$poem_dir/audio/mixed.wav" -codec:a libmp3lame -b:a 192k "$target" 2>/dev/null
      echo "  Audio: mixed.mp3"
    else
      echo "  Skip (exists): mixed.mp3"
    fi
  fi

  echo ""
done

echo "=== Conversion Complete ==="
echo ""
echo "Verifying file counts:"
echo "  WebP images: $(find "$TARGET_DIR" -name '*.webp' | wc -l | tr -d ' ')"
echo "  MP3 files:   $(find "$TARGET_DIR" -name '*.mp3' | wc -l | tr -d ' ')"
