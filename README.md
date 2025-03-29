# 🌆 Lighthouse Eindhoven

Repository containing a JSON dump of the apartment listing for the [Lighthouse Eindhoven](https://www.lighthousetower.nl/), combined
with a basic [Deno Fresh](https://fresh.deno.dev/) application for displaying the unit listing data on a single page.

## 👀 Features

- Hourly updated JSON dump available at [toshy.github.io/lighthouse-ehv/units.json](https://toshy.github.io/lighthouse-ehv/units.json).
- [Releases](https://github.com/ToshY/lighthouse-ehv/releases) are created on an hourly basis, at cron schedule `0 * * * *` (actual workflow execution time may be [delayed](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#schedule)).
  - The release contains an updated [JSON dump](./data/units.json) of the apartment listing from the [Lighthouse API endpoint](https://api.presendoo.app/api/public/projects/51/units).
- Basic [Deno Fresh](https://fresh.deno.dev/) application for displaying every available unit in a single page.

## 🧰 Getting Started

### ‼️ Prerequisites

* [Docker/Compose](https://docs.docker.com/engine/install/)
* [Task](https://taskfile.dev/installation/) (optional)

### 🛠️ Usage

Run the application.

```shell
task up
```

The above command will perform the following actions:
1. Download the data from the API endpoint and write it to [`data/units.json`](./data/units.json).
2. Start the Fresh server on [`http://localhost:8002`](http://localhost:8002).

> [!TIP]
> If you've cloned the repository, you can use `task frontend-up` directly to start the Fresh server.

## ❕ License

This repository comes with a [BSD 3-Clause License](./LICENSE).
