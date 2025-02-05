class Issue{
  constructor(row, rowIndex){
    this.type = row[SHEET.issue.column.type - 1]; 
    this.day = dayjs.dayjs(row[SHEET.issue.column.day - 1]);
    this.repositryPath = row[SHEET.issue.column.repositryPath -1];
    this.title = row[SHEET.issue.column.title - 1];
    this.assign = row[SHEET.issue.column.assign - 1];
    this.body = row[SHEET.issue.column.body - 1];
    this.rowIndex = rowIndex + SHEET.issue.row.data;
  }

  isTarget(){
    return dayjs.dayjs().isSame(this.day, 'day');
  }

  createIssue(){
    const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('token');

    const option = {
      'method': 'post',
      'payload': JSON.stringify({
        'title': `${this.title}_${dayjs.dayjs().format('YYYY/MM')}`,
        'body': this.body,
        'assignees': [this.assign],
      }),
      'headers': {
        'Authorization': `Basic ${Utilities.base64Encode(ACCESS_TOKEN)}`,
        'Accept': 'application/vnd.github.symmetra-preview+json',
        'Content-Type': 'application/json',
      },
    };

    const res = UrlFetchApp.fetch(`https://api.github.com/repos/${this.repositryPath}/issues`, option);
    Logger.log(res);
  }

  setSheetNextDay(){
    Shomin.setText(
      SHEET.issue,
      this.rowIndex,
      SHEET.issue.column.day,
      this.day.add(1, this.type).format('YYYY/MM/DD')
    );
  }
}