# Registry

> This is a testing fake registry

## Add missing package 

```sh
pkg=has-flag bash -c 'curl -L https://unpkg.com/$pkg/package.json --create-dirs -o test/fixtures/registry/$pkg/package.json' 
``` 
