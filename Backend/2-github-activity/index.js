#!/usr/bin/env node

const args = process.argv.slice(2);

async function fetchUser(user) {
  try {
    const response = await fetch(`https://api.github.com/users/${user}/events`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`User "${user}" not found.`);
      } else {
        throw new Error(
          `GitHub API error: ${response.status} ${response.statusText}`
        );
      }
    }

    const data = await response.json();
    let events = {};

    data.forEach((event) => {
      const repo = event.repo?.name || "Unknown Repository";
      events[repo] = events[repo] || {};

      if (event.type === "PushEvent") {
        events[repo].commits = (events[repo].commits || 0) + 1;
      } else if (event.type === "PullRequestEvent") {
        events[repo].pullRequests = (events[repo].pullRequests || 0) + 1;
      } else if (event.type === "IssuesEvent") {
        events[repo].issues = (events[repo].issues || 0) + 1;
      } else if (event.type === "IssueCommentEvent") {
        events[repo].issueComments = (events[repo].issueComments || 0) + 1;
      } else if (event.type === "CreateEvent") {
        events[repo].creates = (events[repo].creates || 0) + 1;
      } else if (event.type === "ForkEvent") {
        events[repo].forks = (events[repo].forks || 0) + 1;
      } else if (event.type === "WatchEvent") {
        events[repo].watches = (events[repo].watches || 0) + 1;
      }
    });

    Object.entries(events).forEach(([repo, stat]) => {
      if (stat.commits) {
        console.log(
          `- Pushed ${stat.commits} commit${
            stat.commits > 1 ? "s" : ""
          } to ${repo}`
        );
      }
      if (stat.pullRequests) {
        console.log(
          `- Opened ${stat.pullRequests} pull request${
            stat.pullRequests > 1 ? "s" : ""
          } on ${repo}`
        );
      }
      if (stat.issues) {
        console.log(
          `- Opened ${stat.issues} issue${
            stat.issues > 1 ? "s" : ""
          } on ${repo}`
        );
      }
      if (stat.issueComments) {
        console.log(
          `- Commented on ${stat.issueComments} issue${
            stat.issueComments > 1 ? "s" : ""
          } in ${repo}`
        );
      }
      if (stat.creates) {
        console.log(
          `- Created ${stat.creates} resource${
            stat.creates > 1 ? "s" : ""
          } in ${repo}`
        );
      }
      if (stat.forks) {
        console.log(
          `- Forked ${repo} ${stat.forks} time${stat.forks > 1 ? "s" : ""}`
        );
      }
      if (stat.watches) {
        console.log(`- Starred ${repo}}`);
      }
    });
  } catch (error) {
    console.log("An Error Occured:", error);
  }
}

fetchUser(args[0]);
