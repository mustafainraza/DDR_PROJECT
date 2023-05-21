const express = require("express");
const router = express.Router();
const client = require("../connection/connection");
router.use(express.json());
const auth = require("../middleware/auth");

router.get("/popularprojectdetails", async (req, res) => {
  try {
    let result = await client.query(
      `select A.*,(DATE_PART('day', campaign_end_time - CURRENT_TIMESTAMP) * 24 + DATE_PART('hour', campaign_end_time - CURRENT_TIMESTAMP)) as hours ,count(B.investor_id) as backers,C.campaigner_name from campaign A left join invests B on A.campaign_id = B.campaign_id inner join campaigner C on A.campaigner_id=C.campaigner_id where  A.campaign_end_time > CURRENT_TIMESTAMP and A.campaign_status=true group by A.campaign_id,C.campaigner_name having (A.campaign_earning>=A.campaign_goal OR count(B.investor_id)>20 ) order by A.campaign_earning desc`
    );
    if (result.rows.length == 0) {
      result = await client.query(
        `select A.*,(DATE_PART('day', campaign_end_time - CURRENT_TIMESTAMP) * 24 + DATE_PART('hour', campaign_end_time - CURRENT_TIMESTAMP)) as hours ,count(B.investor_id) as backers,C.campaigner_name from campaign A left join invests B on A.campaign_id = B.campaign_id inner join campaigner C on A.campaigner_id=C.campaigner_id where  A.campaign_end_time > CURRENT_TIMESTAMP and A.campaign_status=true group by A.campaign_id,C.campaigner_name order by A.campaign_earning desc limit 5`
      );
    }
    res.send(result.rows);
  } catch (err) {
    console.error("Error retrieving data from PostgreSQL database", err);
    res.status(500).send("Error retrieving data from PostgreSQL database");
  }
});

router.get("/newprojectdetails", auth, async (req, res) => {
  try {
    let result = await client.query(
      `select A.*,(DATE_PART('day', campaign_end_time - CURRENT_TIMESTAMP) * 24 + DATE_PART('hour', campaign_end_time - CURRENT_TIMESTAMP)) as hours ,count(B.investor_id) as backers,C.campaigner_name from campaign A left join invests B on A.campaign_id = B.campaign_id inner join campaigner C on A.campaigner_id=C.campaigner_id where (DATE_PART('day', campaign_end_time - CURRENT_TIMESTAMP) * 24 + DATE_PART('hour', campaign_end_time - CURRENT_TIMESTAMP))>=240 and  A.campaign_end_time > CURRENT_TIMESTAMP and A.campaign_status=true group by A.campaign_id,C.campaigner_name order by A.campaign_end_time desc`
    );
    res.send(result.rows);
  } catch (err) {
    console.error("Error retrieving data from PostgreSQL database", err);
    res.status(500).send("Error retrieving data from PostgreSQL database");
  }
});

router.get("/endingsoonprojectdetails", auth, async (req, res) => {
  try {
    let result = await client.query(
      `select A.*,(DATE_PART('day', campaign_end_time - CURRENT_TIMESTAMP) * 24 + DATE_PART('hour', campaign_end_time - CURRENT_TIMESTAMP)) as hours ,count(B.investor_id) as backers,C.campaigner_name from campaign A left join invests B on A.campaign_id = B.campaign_id inner join campaigner C on A.campaigner_id=C.campaigner_id where (DATE_PART('day', campaign_end_time - CURRENT_TIMESTAMP) * 24 + DATE_PART('hour', campaign_end_time - CURRENT_TIMESTAMP))<240 and  A.campaign_end_time > CURRENT_TIMESTAMP and A.campaign_status=true group by A.campaign_id,C.campaigner_name order by A.campaign_end_time asc`
    );
    res.send(result.rows);
  } catch (err) {
    console.error("Error retrieving data from PostgreSQL database", err);
    res.status(500).send("Error retrieving data from PostgreSQL database");
  }
});

router.get("/hel", async (req, res) => {
  res.status(200).send("ppp");
  client.end;
});

router.get("/projectdetails", auth, async (req, res) => {
  try {
    let result = await client.query(
      `select A.*,(DATE_PART('day', campaign_end_time - CURRENT_TIMESTAMP) * 24 + DATE_PART('hour', campaign_end_time - CURRENT_TIMESTAMP)) as hours ,count(B.investor_id) as backers,C.campaigner_name from campaign A left join invests B on A.campaign_id = B.campaign_id inner join campaigner C on A.campaigner_id=C.campaigner_id where  A.campaign_end_time > CURRENT_TIMESTAMP and A.campaign_status=true group by A.campaign_id,C.campaigner_name  order by A.campaign_earning desc`
    );
    res.send(result.rows);
  } catch (err) {
    console.error("Error retrieving data from PostgreSQL database", err);
    res.status(500).send("Error retrieving data from PostgreSQL database");
  }
});

router.get("/comments/:id", auth, (req, res) => {
  const cid = req.params.id;

  client.query(
    `SELECT C.comment_msg,C.comment_date,I.investor_name,I.investor_image FROM comments C 
    LEFT JOIN investor I ON C.investor_id=I.investor_id 
    where C.campaign_id=$1 order by C.comment_date asc`,
    [cid],
    (error, result) => {
      if (!error) {
        res.status(200).send(result.rows);
        console.log("data fetched successfully");
      } else {
        res.status(400).send(error.stack);
        console.log("not updated");
      }
    }
  );
});

router.post("/comment", auth, async (req, res) => {
  try {
    const { msg, cid, investor_id } = req.body;
    // const msg = "sssssssssss";
    // const cid = 5;
    // const investor_id = 3;
    console.log(cid);
    let date = new Date();
    let da =
      date.getFullYear() +
      "-" +
      Number(date.getMonth() + 1) +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    await client.query(
      `INSERT INTO comments(comment_msg,campaign_id,investor_id,comment_date) VALUES ('${msg}',${cid},${investor_id},'${da}')`,
      (error, result) => {
        if (!error) {
          res.status(200).send("ok");
          console.log("Edit successfully");
        } else {
          res.status(400).send(error.stack);
          console.log("not updated");
        }
      }
    );
  } catch (err) {
    console.error("Error retrieving data from PostgreSQL database", err);
    res.status(500).send("Error retrieving data from PostgreSQL database");
  }
});

router.post("/profit_investment", auth, async (req, res) => {
  try {
    console.log(req.body);
    const { profit_amount, cid, investor_id } = req.body;

    let temp = await client.query(
      `select campaign_profit_id from campaign_profit where campaign_id=${cid}`
    );

    let cpid = temp.rows[0].campaign_profit_id;
    let result = await client.query(
      `INSERT INTO investor_profit(investor_amount,investor_id,campaign_profit_id) VALUES ('${profit_amount}',${investor_id},${cpid})`
    );
    if (result.rowCount > 0) {
      console.log("successfullly inserted in investor_profit");
    }
    let result2 = await client.query(
      `INSERT INTO invests(campaign_id,investor_id,invest_amount) VALUES (${cid},${investor_id},${profit_amount})`
    );
    if (result2.rowCount > 0) {
      console.log("successfullly inserted in invests table");
    }
    let update = await client.query(
      `update campaign set campaign_earning = campaign_earning + ${profit_amount} where campaign_id= ${cid}`
    );
    if (update.rowCount > 0) {
      console.log("successfullly updated campaign_earning in campaign table");
    }
    res.send("Payment Successfully done for the campaign");
  } catch (err) {
    console.error("Error retrieving data from PostgreSQL database", err);
    res.status(500).send("Error retrieving data from PostgreSQL database");
  }
});

router.get("/profit/:id", auth, (req, res) => {
  const cid = req.params.id;

  client.query(
    `select campaign_profit_percentage from campaign_profit where campaign_id=${cid}`,
    (error, result) => {
      if (!error) {
        res.status(200).json(result.rows[0]);
        console.log("data fetched successfully");
      } else {
        res.status(400).send(error.stack);
        console.log("not updated");
      }
    }
  );
});

router.post("/donation_investment", auth, async (req, res) => {
  try {
    const { donation_amount, cid, investor_id } = req.body;

    let result = await client.query(
      `INSERT INTO investor_donation(investor_donation_amount,investor_id,campaign_id) VALUES ('${donation_amount}',${investor_id},${cid})`
    );
    if (result.rows.length > 0) {
      console.log("successfullly inserted in investor_Donation");
    }
    let result2 = await client.query(
      `INSERT INTO invests(campaign_id,investor_id,invest_amount) VALUES (${cid},${investor_id},${donation_amount})`
    );
    if (result2.rows.length > 0) {
      console.log("successfullly inserted in invests table");
    }
    let update = await client.query(
      `update campaign set campaign_earning = campaign_earning + ${donation_amount} where campaign_id= ${cid}`
    );
    if (update.rowCount > 0) {
      console.log("successfullly updated campaign_earning in campaign table");
    }
    res.send("Payment Successfully done for the campaign");
  } catch (err) {
    console.error("Error retrieving data from PostgreSQL database", err);
    res.status(500).send("Error retrieving data from PostgreSQL database");
  }
});

router.post("/equity_investment", auth, async (req, res) => {
  try {
    const { investor_id, C_equity_id, cid } = req.body;

    let temp = await client.query(
      `select campaign_equity_amount from campaign_equity where campaign_equity_id=${C_equity_id}`
    );
    let equityamount = temp.rows[0].campaign_equity_amount;

    let result = await client.query(
      `INSERT INTO investor_equity(investor_id,campaign_equity_id) VALUES (${investor_id},${C_equity_id})`
    );
    if (result.rowCount > 0) {
      console.log("successfullly inserted in investor_equity");
    }
    let result2 = await client.query(
      `INSERT INTO invests(campaign_id,investor_id,invest_amount) VALUES (${cid},${investor_id},${equityamount})`
    );
    if (result2.rowCount > 0) {
      console.log("successfullly inserted in invests table");
    }
    let update = await client.query(
      `update campaign set campaign_earning = campaign_earning + ${equityamount} where campaign_id= ${cid}`
    );
    if (update.rowCount > 0) {
      console.log("successfullly updated campaign_earning in campaign table");
    }
    res.send("Payment Successfully done for the campaign");
  } catch (err) {
    console.error("Error retrieving data from PostgreSQL database", err);
    res.status(500).send("Error retrieving data from PostgreSQL database");
  }
});

router.post("/reward_investment", auth, async (req, res) => {
  try {
    const { investor_id, C_reward_id, cid } = req.body;

    let temp = await client.query(
      `select campaign_reward_amount from campaign_reward where campaign_reward_id=${C_reward_id}`
    );
    let rewardamount = temp.rows[0].campaign_reward_amount;

    let result = await client.query(
      `INSERT INTO investor_reward(investor_id,campaign_reward_id) VALUES (${investor_id},${C_reward_id})`
    );
    if (result.rowCount > 0) {
      console.log("successfullly inserted in investor_reward");
    }
    let result2 = await client.query(
      `INSERT INTO invests(campaign_id,investor_id,invest_amount) VALUES (${cid},${investor_id},${rewardamount})`
    );
    if (result2.rowCount > 0) {
      console.log("successfullly inserted in invests table");
    }
    let update = await client.query(
      `update campaign set campaign_earning = campaign_earning + ${rewardamount} where campaign_id= ${cid}`
    );
    if (update.rowCount > 0) {
      console.log("successfullly updated campaign_earning in campaign table");
    }
    res.send("Payment Successfully done for the campaign");
  } catch (err) {
    console.error("Error retrieving data from PostgreSQL database", err);
    res.status(500).send("Error retrieving data from PostgreSQL database");
  }
});

router.get("/reward_details", async (req, res) => {
  const { campaign_id } = req.headers;
  console.log(campaign_id);
  try {
    let result = await client.query(
      `Select campaign_reward_id,campaign_reward_name,campaign_reward_amount,campaign_reward_description from campaign_reward where campaign_id=${campaign_id}`
    );
    res.send(result.rows);
  } catch (err) {
    console.error("Error retrieving data from PostgreSQL database", err);
    res.status(500).send("Error retrieving data from PostgreSQL database");
  }
});

router.get("/equity_details", async (req, res) => {
  const { campaign_id } = req.headers;
  try {
    let result = await client.query(
      `Select campaign_equity_id,campaign_equity_description,campaign_equity_percentage,campaign_equity_amount from campaign_equity where campaign_id=${campaign_id}`
    );
    res.send(result.rows);
  } catch (err) {
    console.error("Error retrieving data from PostgreSQL database", err);
    res.status(500).send("Error retrieving data from PostgreSQL database");
  }
});

module.exports = router;
