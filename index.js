const { Novu, PushProviderIdEnum } = require("@novu/node");
const express = require("express");
const app = express();
let port = process.env.PORT || 5979;

var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("This is Api");
});

app.post("/mixed", async (req, res) => {
  const novu = new Novu("cc31476446244ecf397a5f5c4d59f4df");
  try {
    const { email, tokenUser, content, phone, firstName, lastName } = req.body;

    const subscriberId = "4JBaDK_nvnAS";
    await novu.subscribers.identify(subscriberId, {
      firstName: firstName,
      lastName: lastName,
    });

    await novu.subscribers.setCredentials(
      subscriberId,
      PushProviderIdEnum.FCM,
      {
        deviceTokens: [`${tokenUser}`],
      }
    );

    novu.trigger("notifi-push-inapp", {
      to: {
        subscriberId: "4JBaDK_nvnAS",
        email: email,
        phone: phone,
      },
      payload: {
        content: content,
      },
    });
    res.status(200).json("complete !");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`This project is start in port ${port}`);
});
