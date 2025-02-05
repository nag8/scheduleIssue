function main() {
  getIssueList().forEach(issue => {
    if(!issue.isTarget()) return;
    
    issue.createIssue();
    issue.setSheetNextDay();
  });
}
