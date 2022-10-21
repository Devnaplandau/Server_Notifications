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

//  noti on app android - ios - web -  use firebase hobbitsocial
app.post("/flutter", async (req, res) => {
  const novu = new Novu("cc31476446244ecf397a5f5c4d59f4df");
  try {
    const { tokenUser } = req.body;
    const subscriberId = "4JBaDK_nvnAS";
    await novu.subscribers.identify(subscriberId, {
      firstName: "push",
      lastName: "app-android",
    });

    await novu.subscribers.setCredentials(
      subscriberId,
      PushProviderIdEnum.FCM,
      {
        deviceTokens: [`${tokenUser}`],
      }
    );
    novu.trigger("push-app-android", {
      to: {
        subscriberId: "4JBaDK_nvnAS",
      },
      payload: {
        title: "Khuyến mãi Gem !",
        content: "Bạn sẽ nhận được 50% giá trị khi mua Gem vào hôm nay !",
      },
    });
    res.status(200).json("complete !");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//  done novu selfhost local in docker - use firebase hobbitsocial
app.post("/flutter-selfhost", async (req, res) => {
  const config = {
    backendUrl: "http://localhost:3000",
  };
  const novu = new Novu("8c3f5611bc4ec9bbae672e6bc67a9281", config);
  try {
    const { tokenDevice } = req.body;
    console.log(tokenDevice);
    const subscriberId = "eh19HHmssaAu";
    await novu.subscribers.identify(subscriberId, {
      firstName: "an",
      lastName: "app",
    });

    await novu.subscribers.setCredentials(
      subscriberId,
      PushProviderIdEnum.FCM,
      {
        deviceTokens: [`${tokenDevice}`],
      }
    );
    novu.trigger("push-app-android", {
      to: {
        subscriberId: "eh19HHmssaAu",
      },
      payload: {
        title: "This is title !",
        content: "You can get some gift for day !",
      },
    });

    res.status(200).json("complete !");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.data);
  }
});

app.post("/huntgem-notification", async (req, res) => {
  const novu = new Novu("cc31476446244ecf397a5f5c4d59f4df");
  try {
    const { template, email, tokenWebUser } = req.body;
    console.log(tokenDevice);
    const subscriberId = "4JBaDK_nvnAS";
    await novu.subscribers.identify(subscriberId, {
      firstName: "website",
      lastName: "Huntgem",
    });

    await novu.subscribers.setCredentials(
      subscriberId,
      PushProviderIdEnum.FCM,
      {
        deviceTokens: [`${tokenWebUser}`],
      }
    );
    novu.trigger("demo-huntgem", {
      to: {
        subscriberId: "4JBaDK_nvnAS",
        email: email,
      },
      payload: {
        template: template,
        email: email,
      },
    });

    res.status(200).json("complete !");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.data);
  }
});

app.listen(port, () => {
  console.log(`This project is start in port ${port}`);
});
