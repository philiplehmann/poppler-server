# poppler node express wrapper

## Run Image
```
docker run -p 5000:5000 --name poppler-server philiplehmann/poppler-server:latest
```

## Convert file
```
curl -X POST \
  -H 'content-type: application/x-www-form-urlencoded' \
  --data-binary "@path/to/my/document.docx" \
  'http://localhost:5000/pdf-to-text'
```

## Ports
 - HTTP 5000
