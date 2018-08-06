const functions = require('firebase-functions');
const watson = require('watson-developer-cloud');
const cors = require('cors')({ origin: true });

const workspace = '36fb7a83-1955-43b8-b77d-dcae85db9430';
const assistant = new watson.AssistantV1({
  username: 'a4968634-1b3d-41b9-a715-e46300e4a4a4',
  password: '47tJ8bkXesGV',
  version: '2018-07-10',
});

exports.sendMessage = functions.https.onRequest((req, res) => cors(req, res, () => {
  const { context, text } = req.body;
  return assistant.message({
    context,
    workspace_id: workspace,
    input: { text },
  }, (err, watsonRes) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }
    if (watsonRes.intents.length > 0) {
      console.log(watsonRes.intents[0]);
    }
    if (watsonRes.output.text.length > 0) {
      console.log(watsonRes.output.text[0]);
    }
    return res.send(JSON.stringify(watsonRes));
  });
}));