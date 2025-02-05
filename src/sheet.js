const SHEET = {
  issue: {
    name: 'issue',
    row: {
      data: 2,
    },
    column: {
      type: 1,
      day: 2,
      repositryPath: 3,
      title: 4,
      assign: 5,
      body: 6,
    },
  },
};

function getIssueList(){
  return Shomin.getSheetData(SHEET.issue).map((row, rowIndex) => new Issue(row, rowIndex));
}