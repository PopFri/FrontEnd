#!/bin/bash
set -e

echo "[entrypoint] Starting Matomo..."

# 백그라운드로 Apache 시작
docker-entrypoint.sh apache2-foreground &

# 복사 대상 파일 이름 (Matomo가 만든 JS)
SOURCE_FILE="/var/www/html/container_XigVTZYK.js"
DEST_DIR="/var/www/html/js-export"

# 파일 복사
if [ -f "$SOURCE_FILE" ]; then
  echo "[entrypoint] Copying $SOURCE_FILE to $DEST_DIR..."
  mkdir -p "$DEST_DIR"
  cp "$SOURCE_FILE" "$DEST_DIR/"
  echo "[entrypoint] File copied."
else
  echo "[entrypoint] ERROR: File $SOURCE_FILE not found!"
fi

# 프로세스 대기
wait
