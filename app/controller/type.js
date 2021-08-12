'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
  async list() {
    const { ctx, app } = this;
    try {
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      const user_id = decode.id;
      const list = await ctx.service.type.list(user_id);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          list,
        },
      };
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }

  }
}

module.exports = TypeController;
