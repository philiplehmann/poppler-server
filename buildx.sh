set -x

docker buildx create --platform linux/arm64,linux/amd64,linux/ppc64le,linux/s390x --name poppler-server-builder --use
docker buildx build --push --no-cache --platform=linux/arm64,linux/amd64 --tag=philiplehmann/poppler-server:v0.0.1 .

docker buildx imagetools create philiplehmann/poppler-server:v0.0.1 --tag philiplehmann/poppler-server:latest