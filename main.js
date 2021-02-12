document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  let currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  currentIssue.description = `<s>${ currentIssue.description }</s>`
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  location.reload();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
  location.reload();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';


  for (let i = 0; i < issues.filter(issue => issue.status == "Closed").length; i++) {
    let element = i + 1;
    document.getElementById('closed-issues').innerHTML = element;
  }

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];
    document.getElementById("count-issue").innerHTML = i + 1;
    issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${ id } </h6>
                              <p><span class="label label-info"> ${ status } </span></p>
                              <h3> ${ description } </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${ severity }</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${ assignedTo }</p>
                              <button onclick="closeIssue(${ id })" class="btn btn-warning">Close</button>
                              <button onclick="deleteIssue(${ id })" class="btn btn-danger">Delete</button>
                              </div>`;
  }
}
