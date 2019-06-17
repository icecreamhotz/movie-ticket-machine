const User = require("../../schema/user");
const Reserve = require("../../schema/reserve");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "best_dota@hotmail.com", // your email
    pass: "this is a secret" // your email password
  }
});

const reserveNow = async data => {
  const reserve = new Reserve(data);
  return reserve.save();
};

const getAllReserve = async _id => {
  const reserve = await Reserve.findOne({ _id: _id })
    .populate("email")
    .populate("movie");
  return reserve;
};

module.exports = {
  reserveMovieById: async args => {
    try {
      const reserve = await Reserve.findOne({ _id: args._id })
        .populate("email")
        .populate("movie");
      return reserve;
    } catch (err) {
      throw new Error(err);
    }
  },
  reserveMovie: async args => {
    return await User.findOne({ email: args.email })
      .then(async value => {
        let reserve = {
          price_total: args.price_total,
          money: args.money,
          change_total: args.change_total,
          people_total: args.people_total,
          createdAt: args.createdAt,
          movie: args.movie
        };
        if (args.email !== "") {
          const user = new User({
            email: args.email
          });
          await user.save();
          reserve = { ...reserve, email: args.email };
        }
        if (value) {
          reserve = { ...reserve, email: value._id };
          const reservePromise = await reserveNow(reserve);
          return reservePromise;
        }
        const reservePromise = await reserveNow(reserve);
        return reservePromise;
      })
      .then(async value => {
        const reserve = await getAllReserve(value._id);
        if (reserve.email) {
          let mailOptions = {
            from: "best_dota@hotmail.com",
            to: reserve.email.email,
            subject: "Thinknet Cinema Email System.",
            html: `<div class="cardWrap" style="width: 27em;margin: 3em auto;color: #fff;font-family: sans-serif;">
              <h3 style="color:black">Thank you for support us, You dont need to exchange ticket in front of cinema. Let pick the picture and take it to employees and walk into the cinema</h3>
            <div class="card cardLeft" style="background: orange;height: 12em;float: left;position: relative;padding: 1em;margin-top: 100px;border-top-left-radius: 8px;border-bottom-left-radius: 8px;width: 16em;">
              <h1 style="font-size: 1.1em;margin-top: 0;color:#fff;">Think net <span style="font-weight: normal;color:#fff;">Cinema</span></h1>
              <div class="title" style="text-transform: uppercase;font-weight: normal;margin: 2em 0 0 0;">
                <h2 style="font-size: .9em;color: #525252;margin: 0;text-overflow: ellipsis;white-space: nowrap;display: block;overflow: hidden;">${
                  reserve.movie.name
                }</h2>
                <span style="font-size: .7em;color: #a2aeae;">movie</span>
              </div>
              <div class="name" style="text-transform: uppercase;font-weight: normal;margin: .7em 0 0 0;">
                <h2 style="font-size: .9em;color: #525252;margin: 0;text-overflow: ellipsis;white-space: nowrap;display: block;overflow: hidden;">${
                  reserve.email.email
                }</h2>
                <span style="font-size: .7em;color: #a2aeae;">email</span>
              </div>
              <div class="seat" style="text-transform: uppercase;font-weight: normal;margin: .7em 0 0 0;float: left;">
                <h2 style="font-size: .9em;color: #525252;margin: 0;">${
                  reserve.people_total
                }</h2>
                <span style="font-size: .7em;color: #a2aeae;">seat</span>
              </div>
              <div class="time" style="text-transform: uppercase;font-weight: normal;margin: .7em 0 0 1em;float: left;">
                <h2 style="font-size: .9em;color: #525252;margin: 0;">${
                  reserve.price_total
                }</h2>
                <span style="font-size: .7em;color: #a2aeae;">price</span>
              </div>
            </div>
            <div class="card cardRight" style="background:orange;height: 12em;float: left;position: relative;padding: 1em;margin-top: 100px;width: 6.5em;border-left: .18em dashed #fff;border-top-right-radius: 8px;border-bottom-right-radius: 8px;">
              <div class="eye" style="position: relative;width: 2em;height: 1.5em;background: #fff;margin: 0 auto;border-radius: 1em/0.6em;z-index: 1;"></div>
              <div class="number" style="text-align: center;text-transform: uppercase;">
                <h3 style="color: #e84c3d;margin: .9em 0 0 0;font-size: 2.5em;">${
                  reserve.people_total
                }</h3>
                <span style="display: block;color: #a2aeae;">seat</span>
              </div>
              <div class="barcode" style="width: 100% ;margin-top: 43px;font-size:18px">||||||||| | || ||||</div>
            </div>
          </div>`
          };
          await transporter.sendMail(mailOptions);
        }
        return reserve;
      })
      .catch(err => {
        throw new Error(err);
      });
  }
};
