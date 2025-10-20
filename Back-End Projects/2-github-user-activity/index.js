#!/usr/bin/env node
const args = process.argv.slice(2);

if (!args[0]) {
  console.error("Usage: node index.js <github-username>");
  process.exit(1);
}

async function getUserEvents(username) {
  const response = await fetch(
    `https://api.github.com/users/${username}/events`
  );
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

getUserEvents(args[0])
  .then((events) => {
    const uniqueRepos = new Map();
    events.forEach((event) => {
      switch (event.type) {
        case "PushEvent":
          {
            const repoName = event.repo.name;
            const key = `${repoName} (Commit)`;
            uniqueRepos.set(key, (uniqueRepos.get(key) || 0) + 1);
          }
          break;
        case "PullRequestEvent":
          {
            const repoName = event.repo.name;
            const action = event.payload.action;
            const key = `${repoName} (PR ${action})`;
            uniqueRepos.set(key, (uniqueRepos.get(key) || 0) + 1);
          }
          break;
        case "IssuesEvent":
          {
            const repoName = event.repo.name;
            const action = event.payload.action;
            const key = `${repoName} (Issue ${action})`;
            uniqueRepos.set(key, (uniqueRepos.get(key) || 0) + 1);
          }
          break;
        case "IssueCommentEvent":
          {
            const repoName = event.repo.name;
            const key = `${repoName} (Issue Comment)`;
            uniqueRepos.set(key, (uniqueRepos.get(key) || 0) + 1);
          }
          break;
        case "CreateEvent":
          {
            const repoName = event.repo.name;
            const refType = event.payload.ref_type;
            const key = `${repoName} (Created ${refType})`;
            uniqueRepos.set(key, (uniqueRepos.get(key) || 0) + 1);
          }
          break;
        case "ForkEvent":
          {
            const repoName = event.repo.name;
            const key = `${repoName} (Forked)`;
            uniqueRepos.set(key, (uniqueRepos.get(key) || 0) + 1);
          }
          break;
        case "WatchEvent":
          {
            const repoName = event.repo.name;
            const key = `${repoName} (Starred)`;
            uniqueRepos.set(key, (uniqueRepos.get(key) || 0) + 1);
          }
          break;
        case "DeleteEvent":
          {
            const repoName = event.repo.name;
            const refType = event.payload.ref_type;
            const key = `${repoName} (Deleted ${refType})`;
            uniqueRepos.set(key, (uniqueRepos.get(key) || 0) + 1);
          }
          break;
        case "ReleaseEvent":
          {
            const repoName = event.repo.name;
            const action = event.payload.action;
            const key = `${repoName} (Release ${action})`;
            uniqueRepos.set(key, (uniqueRepos.get(key) || 0) + 1);
          }
          break;
        case "PullRequestReviewCommentEvent":
          {
            const repoName = event.repo.name;
            const key = `${repoName} (PR Review Comment)`;
            uniqueRepos.set(key, (uniqueRepos.get(key) || 0) + 1);
          }
          break;
      }
    });

    console.log("\nRecent GitHub Activity:");
    console.log("-----------------------");
    uniqueRepos.forEach((count, repo) => {
      console.log(`• ${repo}: ${count} event${count === 1 ? "" : "s"}`);
    });
    console.log("-----------------------");
  })
  .catch((err) => console.error(err.message));
