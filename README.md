# mt-todo-api

```bash
docker build --target dev -t mt-todo-api:dev .
```

```bash
docker container run --rm --name dev_mt-todoapi -p 3000:3000 -v ${PWD}/:/usr/src/app mt-todo-api:dev
```