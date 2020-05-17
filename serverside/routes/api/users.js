const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const router = express.Router();
const User = require("../../models/User.js");
const mailerAuth = require("../../config/mail_config");
var saltRounds = bcrypt.genSaltSync(10);

//Create new user
router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;
  if (email && password && confirm_password && password === confirm_password) {
    if (password.length < 8) {
      return res
        .status(400)
        .send({ response: "Password does not fulfill the requirements" });
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({});
        }
        try {
          const existingUser = await User.query()
            .select()
            .where({ email: email })
            .limit(1);

          if (existingUser[0]) {
            return res.status(404).send({ response: "User already exists" });
          } else {
            const newUser = await User.query().insert({
              first_name: first_name,
              last_name: last_name,
              email,
              password: hashedPassword,
            });

            return res.status(200).send({ email: newUser.email });
          }
        } catch (error) {
          return res
            .status(500)
            .send({ response: "Something went wrong with the database" });
        }
      });
    }
  } else if (password !== repeatPassword) {
    return res
      .status(404)
      .send({ response: "Password and repeat password are not the same" });
  } else {
    return res.status(404).send({ response: "Missing fields" });
  }
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    const users = await User.query().select().where({ email: email }).limit(1);
    const user = users[0];

    if (!user) {
      return res.status(404).send({ response: "Wrong email or password" });
    }

    bcrypt.compare(password, user.password, (error, isSame) => {
      if (error) {
        return res.status(500).send({});
      }
      if (!isSame) {
        return res.status(404).send({});
      } else {
        req.session.user = { email: user.email, id: user.id };
        return res
          .status(200)
          .send({ email: user.email, session: req.session.user });
      }
    });
  } else {
    return res.status(404).send({ response: "Missing email or password" });
  }
});

//Logout
router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({ response: "Unable to logout" });
    }
    res.json({ message: "Successfuly logged out" });
  });
});

//Get Logged user info
router.get("/getloggeduser", async (req, res) => {
  if (req.session.user) {
    const user = await User.query()
      .select("id", "first_name", "last_name", "email")
      .findById(req.session.user.id);
    res.json(user);
  } else {
    res.status(404).send({ response: "Not logged in" });
  }
});

//check if user is logged in
router.get("/isloggedin", async (req, res) => {
  if (req.session.user) {
    res.json({ logged: true });
  } else {
    res.status(404).send({ response: "Not logged in" });
  }
});

//forgot password request
router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  const user = await User.query().findOne({ email: email });
  console.log(user);
  if (user) {
    let recovery_link = crypto.randomBytes(16).toString("hex");
    console.log(user.id);
    await User.query()
      .patch({
        recovery_link,
        recovery_link_status: true,
      })
      .findById(user.id);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: mailerAuth.user,
        pass: mailerAuth.password,
      },
    });
    const mailOptions = {
      from: mailerAuth.user,
      to: email,
      subject: "Password reset",
      html: `<a href="http://localhost:3000/passwordreset?id=${user.id}&link=${recovery_link}">Click here to change your password.</a>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(502).send({
          response: "email not sent",
          error: error.message,
        });
      } else {
        return res.status(200).send({ response: "email sent" });
      }
    });
  } else {
    return res.status(404).send({});
  }
});

router.post("/passwordreset", async (req, res) => {
  const { id, recoveryLink, newPassword, confirmNewPassword } = req.body;
  if (id && recoveryLink && newPassword && confirmNewPassword) {
    if (newPassword == confirmNewPassword) {
      const user = await User.query().findById(id);
      if (user) {
        if (recoveryLink == user.recovery_link && user.recovery_link_status) {
          bcrypt.hash(
            newPassword,
            saltRounds,
            async (error, hashedPassword) => {
              if (error) {
                return res.status(500).send({});
              }

              await user.$query().patch({
                password: hashedPassword,
                recovery_link_status: false,
              });
              res.status(200).send({ response: "Password changed" });
            }
          );
        } else {
          return res.status(403).send({});
        }
      } else {
        return res.status(404).send({});
      }
    } else {
      return res.status(400).send({ response: "Passwords do not match" });
    }
  } else {
    return res.status(400).send({ response: "Missing fields" });
  }
});

//delete user
router.delete("/delete", async (req, res) => {
  if (req.session.user) {
    const deleteUser = await User.query().deleteById(req.session.user.id);
    if (deleteUser) {
      req.status(200).send({ response: "deleted user succcess" });
    } else {
      req.status(404).send({ response: "couldnt delele user" });
    }
  } else {
    res.status(403).send({ response: "Not logged in" });
  }
});

// Export to api.js
module.exports = router;
