# Weekly leaderboard example with NodeJS / MongoDB

This project simulates a weekly leaderboard scenario for a game where players change money every second.

## Tech Stack

**Client:** Vue.js

**Server:** NodeJS(express) - Socket.io

**Database:** MongoDB - Redis(Pub/Sub/ Sorted set)


## Run Locally (automatic with docker compose)


```bash
  git clone https://github.com/metinagaoglu/NodeJS-leader-board
```

Go to the project directory

```bash
  cd NodeJS-leader-board
```

```bash
  docker-compose up
```

## Running Tests

To run tests, run the following command

```bash
  cd src/
  npm run test
```

## Architecture


![App Architecture](https://github.com/metinagaoglu/NodeJS-leader-board/blob/main/images/artitechure.png?raw=true)

## Commit-style

I've applied the commit style guideline of the teknasyon in the commits in this project.
[Teknasyon Git Commits Style Guidelines](https://github.com/Teknasyon-Teknoloji/git-commits-style)
