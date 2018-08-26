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

Each subject's check look like this:
```
{
  ping: {
    ok: boolean,
    ping: double,
    date: unix-ms-timestamp
  },
  functionality: [
    {
      title: string,
      ok: boolean,
      response_time: double,
      error: string,
      date: unix-ms-timestamp
    },
    ...
  ]
}
```

Each check subject should provide the following API:
```
// (TCP) Ping the subject
async subject.ping()

// Perform all functionality tests available for this subject.
async subject.test()
```
