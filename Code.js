function onOpen() {
  FormApp.getUi()
    .createAddonMenu()
    .addItem("Set Email", "show_sidebar")
    .addToUi();
}

function show_sidebar() {
  const html = HtmlService.createTemplateFromFile("about")
    .evaluate()
    .setTitle("Set Email");

  FormApp.getUi().showSidebar(html);
}

function lastSubAs() {
  const form = FormApp.getActiveForm();
  const responses = form.getResponses();
  const lastIndex = responses.length - 1;
  const lastItemResponses = responses[lastIndex].getItemResponses();
  let body = "";
  for (let i = 0; i < lastItemResponses.length; i++) {
    body += "<h2>" + lastItemResponses[i].getItem().getTitle() + "</h2>";
    body += lastItemResponses[i].getResponse() + "<br><br>";
  }
  return body;
}

function onformsubmit() {
  const email = PropertiesService.getDocumentProperties().getProperty("email");

  //Subject Email
  const subject = "Testing";

  //Body Email

  try {
    const body = "f " + lastSubAs();
    GmailApp.sendEmail(email, subject, "", {
      htmlBody: body,
    });
  } catch (e) {}
  //Send Email
}

function emailInputd(email) {
  PropertiesService.getDocumentProperties().setProperty("email", email);
}
