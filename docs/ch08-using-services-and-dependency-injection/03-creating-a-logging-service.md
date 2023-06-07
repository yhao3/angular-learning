# 03. Creating a Logging Service

## Creating a `logging.service.ts` File

```shell
cd src/app/
```

```shell
vi logging.service.ts
```

## Implementing the Logging Service

- [`logging.service.ts`](../../services-app/src/app/logging.service.ts)

```ts
export class LoggingService {
  logStatusChange(status: string) {
    console.log('A server status changed, new status: ' + status);
  }
}
```