'use strict';

const fs = require('fs')
const moment = require('moment')
const mkdirp = require('mkdirp')
const path = require('path')

const Controller = require('egg').Controller;

class UploadController extends Controller {
    async upload(){
        const { ctx } = this

        // 获取文件
        const file = ctx.request.files[0]

        // 存放资源的路径
        let uploadDir = ''

        try {
            // 读文件
            let f = fs.readFileSync(file.filepath);
            // 获取当前日期
            let day = moment(new Date()).format('YYMMDD')
            // 创建图片保存路径
            let dir = path.join(this.config.uploadDir, day)
            let date = Date.now();
            await mkdirp(dir)
            // 返回图片保存的路径
            uploadDir = path.join(dir, date + path.extname(file.filename));
            // 写入文件
            fs.writeFileSync(uploadDir, f)
        } catch (err) {
            console.log(err)
        } finally {
            ctx.cleanupRequestFiles();
        }

        ctx.body = {
            code: 200,
            msg: '上传成功',
            data: uploadDir.replace(/app/g, '')
        }
    }
    
}

module.exports = UploadController;