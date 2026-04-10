#!/bin/bash

# Whisper Transcription Script
# Conference recordings — ZOOM0041 through ZOOM0049
# Using the "large" model for best accuracy on distant/ambient audio

# Navigate to the folder containing the audio files
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "=========================================="
echo "  Whisper Conference Transcription Script"
echo "=========================================="
echo "Folder: $SCRIPT_DIR"
echo "Model:  large"
echo "Files:  $(ls ZOOM00*.MP3 2>/dev/null | wc -l | tr -d ' ') MP3 files found"
echo "=========================================="
echo ""

# List of audio files to transcribe
FILES=(
  "ZOOM0041.MP3"
  "ZOOM0042.MP3"
  "ZOOM0043.MP3"
  "ZOOM0044.MP3"
  "ZOOM0045.MP3"
  "ZOOM0046.MP3"
  "ZOOM0047.MP3"
  "ZOOM0048.MP3"
  "ZOOM0049.MP3"
)

TOTAL=${#FILES[@]}
COUNT=0

for FILE in "${FILES[@]}"; do
  COUNT=$((COUNT + 1))

  if [ ! -f "$FILE" ]; then
    echo "[$COUNT/$TOTAL] SKIPPING: $FILE (file not found)"
    continue
  fi

  echo "[$COUNT/$TOTAL] Transcribing: $FILE ..."
  echo "------------------------------------------"

  whisper "$FILE" \
    --model large \
    --language en \
    --output_format txt \
    --output_dir "$SCRIPT_DIR"

  if [ $? -eq 0 ]; then
    echo "✓ Done: ${FILE%.MP3}.txt"
  else
    echo "✗ Error transcribing $FILE"
  fi

  echo ""
done

echo "=========================================="
echo "  All done! Transcripts saved to:"
echo "  $SCRIPT_DIR"
echo "=========================================="
