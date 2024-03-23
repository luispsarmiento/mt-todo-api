# mt-todo-api

```bash
docker build --target dev -t dev-mt-todo-api .
```

```bash
docker container run --rm --name dev_mt-todoapi- -p 3000:3000 -v ${PWD}/:/usr/src/app/src dev-mt-todo-api
```