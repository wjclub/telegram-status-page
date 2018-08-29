Telegram Status Page
====================

Status page for telegram

Checks the health of the following telegram services:
- Telegram DCs
- Telegram Bot API
- Telegraph
- Telescope
- Telegram Translation
- Telegram Instantview Editor

## Status
- Work in progress, but basic functionality is implemented.
- A test version can be found here: https://telegramstatuspage-ksnyahwwsr.now.sh

## API
- `/api/v1/all` - returns whole status
- `/api/v1/dcs` - returns all DC's status
- `/api/v1/services` - returns the state of other telegram services

## Notes

A ping should look like this:
```
{
  ok: boolean,
  ping: double,
  ipv4: string,
  date: unix-ms-timestamp
}
```

functionalitiy checks should look like this:
```
[
  {
    title: string,
    ok: boolean,
    response_time: double,
    error: string,
    date: unix-ms-timestamp
  },
  ...
]
```

Each check subject should provide the following API:
```
// (TCP) Ping the subject
async subject.ping()

// Perform all functionality tests available for this subject.
async subject.test()
```